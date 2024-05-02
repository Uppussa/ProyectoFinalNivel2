import { pool } from '../config/db.js'
import { permission } from '../permisos/permisos.js'

export const indexCategory = async (req, res) => {
  try {
    await permission(req, res, async () => {
      const [categorias] = await pool.query('SELECT * FROM categorias')
      res.json(categorias)
    })
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const createCategory = async (req, res) => {
  try {
    await permission(req, res, async () => {
      const { nombre } = req.body
      const query = 'INSERT INTO categorias (nombre) VALUES (?)'
      const [result] = await pool.query(query, [nombre])
      res.status(201).json({ id: result.insertId, nombre })
    })
  } catch (error) {
    console.error('Error al crear categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const updateCategory = async (req, res) => {
  try {
    await permission(req, res, async () => {
      const { id } = req.params
      const { nombre } = req.body
      const query = 'UPDATE categorias SET nombre = ? WHERE id = ?'
      await pool.query(query, [nombre, id])
      res.json({ message: 'Categoría actualizada correctamente' })
    })
  } catch (error) {
    console.error('Error al actualizar categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    await permission(req, res, async () => {
      const { id } = req.params
      const query = 'DELETE FROM categorias WHERE id = ?'
      await pool.query(query, [id])
      res.json({ message: 'Categoría eliminada correctamente' })
    })
  } catch (error) {
    console.error('Error al eliminar categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getPublicationsByCategory = async (req, res) => {
  try {
    // Aplica el middleware `permission` antes de ejecutar la lógica de la ruta
    await permission(req, res, async () => {
      // Extrae el ID de la categoría de los parámetros de la solicitud
      const { categoria_id: categoriaId } = req.params

      // Verifica si se proporcionó un ID de categoría válido
      if (!categoriaId || isNaN(categoriaId)) {
        return res.status(400).json({ message: 'ID de categoría no válido' })
      }

      // Consulta SQL para obtener las publicaciones asociadas a la categoría específica
      const [publicaciones] = await pool.query(`
        SELECT p.id, p.titulo, p.contenido, GROUP_CONCAT(c.nombre) AS categorias
        FROM publicaciones p
        LEFT JOIN publicaciones_categorias pc ON p.id = pc.publicacion_id
        LEFT JOIN categorias c ON pc.categoria_id = c.id
        WHERE c.id = ?
        GROUP BY p.id, p.titulo, p.contenido;
      `, [categoriaId])

      // Verificar si no se encontraron publicaciones para la categoría especificada
      if (publicaciones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron publicaciones para esta categoría' })
      }

      // Devuelve las publicaciones encontradas
      res.json(publicaciones)
    })
  } catch (error) {
    console.error('Error al obtener publicaciones por categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
