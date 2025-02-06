// models/Pegawai.js
import db from '../config/db.js';

class Pegawai {
  // Ambil semua data pegawai
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Pegawai');
    return rows;
  }

  // Ambil data pegawai berdasarkan ID
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM Pegawai WHERE id_pegawai = ?', [id]);
    return rows[0];
  }

  // Tambah pegawai baru
  static async create(data) {
    const { id_pegawai, nama_pegawai, status_pegawai, gaji } = data;
    const sql = 'INSERT INTO Pegawai (id_pegawai, nama_pegawai, status_pegawai, gaji) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [id_pegawai, nama_pegawai, status_pegawai, gaji]);
    return result;
  }

  // Update data pegawai
  static async update(id, data) {
    const { nama_pegawai, status_pegawai, gaji } = data;
    const sql = 'UPDATE Pegawai SET nama_pegawai = ?, status_pegawai = ?, gaji = ? WHERE id_pegawai = ?';
    const [result] = await db.query(sql, [nama_pegawai, status_pegawai, gaji, id]);
    return result;
  }

  // Hapus pegawai
  static async delete(id) {
    const sql = 'DELETE FROM Pegawai WHERE id_pegawai = ?';
    const [result] = await db.query(sql, [id]);
    return result;
  }
}

export default Pegawai;
