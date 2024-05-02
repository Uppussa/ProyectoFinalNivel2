import { Router } from 'express'
import { admin, newAccount, update, remove } from '../controllers/usuarios.controller.js'
import { permission } from '../permisos/permisos.js'

const router = Router()

router.get('/admin', permission, admin)
router.post('/newAccount', newAccount)
router.put('/update/:id', update)
router.delete('/delete/:id', remove)

export default router
