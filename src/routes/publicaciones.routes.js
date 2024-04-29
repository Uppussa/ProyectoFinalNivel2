import express from 'express'
import { createPublication, updatePublication, deletePublication } from '../controllers/publicaciones.controller.js'

const router = express.Router()

router.post('/publicaciones', createPublication)
router.put('/publicaciones/:id', updatePublication)
router.delete('/publicaciones/:id', deletePublication)

export default router
