import { Router } from 'express'
import { crearComentario, updateComment, deleteComment, getCommentsForPost } from '../controllers/comentarios.controller.js'

const router = Router()
// para  crear el comentario en la publicacion  "usuario_id": 2, "publicacion_id": 4, "comentario": "que fue", "fecha_creacion": "2024-04-27 08:35:05"
router.post('/publicaciones/comentario', crearComentario)
// para actualizar es  "comentario": "", "fecha_creacion": "0000-00-00 00:00:00"
router.put('/comentario/:id', updateComment)
// para eleminar el comentario
router.delete('/comentario/:id', deleteComment)
// Los comentarios solo serán visibles a través de la publicación a la que pertenecen.
router.get('/publicaciones/:id/comentarios', getCommentsForPost)
export default router
