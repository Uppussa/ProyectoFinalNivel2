import { pool } from '../config/db.js'

export const admin = async (req, res) => {
  try {
    const sql = 'SELECT * FROM usuarios'
    const [usuarios] = await pool.query(sql)
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno' })
  }
}

export const newAccount = async (req, res) => {
  try {
    const { nombre, email, contraseña: password, rol } = req.body

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }

    await pool.execute('INSERT INTO usuarios(nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)', [nombre, email, password, rol])
    res.status(201).json({ message: 'Usuario creado' })
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'No se reconoce al usuario' })
    const { nombre, email, contraseña: password } = req.body
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }
    await pool.execute('UPDATE usuarios SET nombre = ?, email = ?, contraseña = ? WHERE usuarios.id = ?', [nombre, email, password, id])
    res.status(201).json({ message: 'Usuario Actualizado' })
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    await pool.execute('DELETE FROM usuarios WHERE id = ?', [id])
    res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno' })
  }
}
