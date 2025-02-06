// models/Dokter.js
import db from '../config/db.js';

class Dokter {
  // Ambil semua dokter dengan status pegawai dan poli
  static async getAll() {
    const sql = `
      SELECT dokter.*, poli.nama_poli, pegawai.status_pegawai
      FROM dokter
      LEFT JOIN poli ON dokter.id_poli = poli.id_poli
      LEFT JOIN pegawai ON dokter.id_pegawai = pegawai.id_pegawai
    `;
    const [rows] = await db.query(sql);
    return rows;
  }

  // Ambil dokter berdasarkan ID dengan status pegawai dan poli
  // Ambil dokter berdasarkan ID dengan status pegawai dan poli
static async getById(id) {
  try {
    const sql = `
      SELECT dokter.*, poli.nama_poli, pegawai.status_pegawai
      FROM dokter
      LEFT JOIN poli ON dokter.id_poli = poli.id_poli
      LEFT JOIN pegawai ON dokter.id_pegawai = pegawai.id_pegawai
      WHERE dokter.id_dokter = ?
    `;
    const [rows] = await db.query(sql, [id]);
    if (rows.length === 0) {
      return null;  // Kembalikan null jika dokter tidak ditemukan
    }
    return rows[0];  // Mengembalikan hasil dokter pertama
  } catch (err) {
    console.error("Error saat mengambil data dokter:", err);
    throw err;  // Lempar error agar bisa ditangani di controller
  }
}


  // Tambah dokter baru
static async create(data) {
  const { id_pegawai, id_poli, nama_dokter, status_dokter } = data;
  if (!id_pegawai || !id_poli || !nama_dokter || !status_dokter) {
    throw new Error('Semua field harus diisi');
  }

  const sql = 'INSERT INTO dokter (id_pegawai, id_poli, nama_dokter, status_dokter) VALUES (?, ?, ?, ?)';
  const [result] = await db.query(sql, [id_pegawai, id_poli, nama_dokter, status_dokter]);
  return result;
}


  // Update data dokter
  static async update(id_dokter, data) {
    const { id_pegawai, id_poli, nama_dokter, status_dokter } = data;
    const sql = 'UPDATE dokter SET id_pegawai = ?, id_poli = ?, nama_dokter = ?, status_dokter = ? WHERE id_dokter = ?';
    const [result] = await db.query(sql, [id_pegawai, id_poli, nama_dokter, status_dokter, id_dokter]);
    return result;
  }

  // Hapus dokter
static async delete(id_dokter) {
  try {
    const dokter = await this.getById(id_dokter);  // Periksa apakah dokter ada
    if (!dokter) {
      throw new Error('Dokter tidak ditemukan');
    }

    const sql = 'DELETE FROM dokter WHERE id_dokter = ?';
    const [result] = await db.query(sql, [id_dokter]);
    return result;
  } catch (err) {
    console.error("Error saat menghapus dokter:", err);
    throw err;
  }
}

}

export default Dokter;
