import express from 'express'
import { PORT } from './config/config.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import publicacionesRoutes from './routes/publicaciones.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'
import comentarioRoutes from './routes/comentario.routes.js'
import { swaggerDocs } from './config/swagger.js'

const app = express()
app.use(express.json())
app.use(usuariosRoutes)
app.use(publicacionesRoutes)
app.use(categoriasRoutes)
app.use(comentarioRoutes)
swaggerDocs(app)
// el PORT es 8000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
