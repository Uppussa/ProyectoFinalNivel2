import { Router } from 'express'
import { indexCategory, createCategory, updateCategory, deleteCategory, getPublicationsByCategory } from '../controllers/categorias.controller.js'
import { permission } from '../permisos/permisos.js'

const router = Router()
// Ruta para ver las categorias hacer el llamado para tener acceso con eje: id: 1, es admin
router.get('/categorias', permission, indexCategory)
// Ruta para crear categorias hacer el llamado para tener acceso con eje: id: 1, es admin + nombre:
router.post('/categorias/create', permission, createCategory)
// Ruta para Actualizar las categorias, hacer el llamado id: 1, es admin + nombre:
router.put('/categorias/update/:id', permission, updateCategory)
// Ruta para Eliminar las categorias, hacer el llamado para tener acceso con id: 1, es admin
router.delete('/categorias/:id', permission, deleteCategory)
// Ruta para Eliminar las publicaciones por categorias
router.get('/publicaciones/categorias/:id', permission, getPublicationsByCategory)

export default router
