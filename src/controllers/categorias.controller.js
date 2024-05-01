import { pool } from '../config/db.js'

export const indexCategory = async (req, res) => {
  const [categorias] = await pool.query('SELECT * FROM categorias')
  res.json(categorias)
}

export const crearCateg = (req, res) => {
  res.send('Hola Jose')
}

export const actualizarCateg = (req, res) => {
  res.send('Hola Jose')
}

export const eliminarCateg = (req, res) => {

}
