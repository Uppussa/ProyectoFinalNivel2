import { Router } from 'express'
import { indexCategory, crearCateg, actualizarCateg, eliminarCateg } from '../controllers/categorias.controller.js'
import { permission } from '../permisos/permisos.js'

const router = Router()
// Ruta para ver las categorias
router.get('/categorias', permission, indexCategory)
// Ruta para crear categorias
router.post('/categorias/create', crearCateg)
// Ruta para Actualizar las categorias
router.put('/categorias/update', actualizarCateg)
// Ruta para Eliminar las categorias.
router.delete('/categorias/delete', eliminarCateg)

export default router
