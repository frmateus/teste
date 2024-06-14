import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()

const router = Router()

router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany()
    res.status(200).json(clientes)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, email, cidade, dataNasc } = req.body

  if (!nome || !email || !cidade || !dataNasc) {
    res.status(400).json({ "erro": "Informe nome, email, cidade e dataNasc" })
    return
  }

  try {
    const cliente = await prisma.cliente.create({
      data: { nome, email, cidade, dataNasc: new Date(dataNasc) }
    })
    res.status(201).json(cliente)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router