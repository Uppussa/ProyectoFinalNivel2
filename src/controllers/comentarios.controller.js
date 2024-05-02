import { pool } from '../config/db.js'

export const crearComentario = async (req, res) => {
  try {
    const { usuario_id: usuarioId, publicacion_id: publicacionId, comentario, fecha_creacion: fechaCreacion } = req.body

    if (!usuarioId || !publicacionId || !comentario || !fechaCreacion) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }

    await pool.execute('INSERT INTO comentarios(usuario_id, publicacion_id, comentario, fecha_creacion) VALUES (?, ?, ?, ?)', [usuarioId, publicacionId, comentario, fechaCreacion])
    res.status(201).json({ message: 'Comentario creado' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno', details: error.message })
  }
}
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params
    const { comentario, fecha_creacion: fechaCreacion } = req.body

    if (!id) return res.status(400).json({ message: 'No se reconoce la publicación' })
    if (!comentario || !fechaCreacion) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }

    await pool.execute('UPDATE comentarios SET comentario = ?, fecha_creacion = ? WHERE comentarios.id = ?', [comentario, fechaCreacion, id])
    res.status(200).json({ message: 'Comentario actualizado' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno', details: error.message })
  }
}
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    await pool.execute('DELETE FROM comentarios WHERE id = ?', [id])
    res.json({ message: 'comentario eliminada' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno' })
  }
}
export const getCommentsForPost = async (req, res) => {
  try {
    const { id } = req.params

    // Verificar si se proporcionó un ID de publicación válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'ID de publicación no válido' })
    }

    // Consulta SQL para obtener los comentarios asociados a la publicación específica
    const [comentarios] = await pool.query(
      'SELECT * FROM comentarios WHERE publicacion_id = ?',
      [id]
    )

    // Verificar si se encontraron comentarios para la publicación especificada
    if (comentarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron comentarios para esta publicación' })
    }

    res.json(comentarios)
  } catch (error) {
    console.error('Error al obtener comentarios para la publicación:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
