import express from 'express'
import { getPublicacion, filterCategory, filterTitle, createPublication, updatePublication, deletePublication } from '../controllers/publicaciones.controller.js'

const router = express.Router()
// obtener publicaciones
router.get('/publicaciones', getPublicacion)
// obtener filtrar  por categoria
router.get('/publicaciones/categorias/:categoriaId', filterCategory)
// obtener  filtrar por titulo
router.get('/publicaciones/title/:name', filterTitle)
// ruta para crear publicacion
router.post('/publicaciones', createPublication)
// ruta para actualizar publicacion
router.put('/publicaciones/:id', updatePublication)
// ruta para borror publicacion
router.delete('/publicaciones/:id', deletePublication)

export default router
