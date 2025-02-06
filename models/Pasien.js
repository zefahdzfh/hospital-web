// models/Pasien.js
import pool from '../config/db.js';

class Pasien {
  // Mengambil semua data pasien
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM pasien");
    return rows;
  }

  // Mengambil data pasien berdasarkan no_rm
  static async getById(no_rm) {
    const [rows] = await pool.query("SELECT * FROM pasien WHERE no_rm = ?", [no_rm]);
    return rows;
  }

  // Menambahkan data pasien baru
  static async create(data) {
    const { ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung } = data;
    const [result] = await pool.query(
      "INSERT INTO pasien (ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung]
    );
    return result;
  }

  // Memperbarui data pasien berdasarkan no_rm
  static async update(no_rm, data) {
    const { ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung } = data;
    const [result] = await pool.query(
      "UPDATE pasien SET ktp = ?, nama_pasien = ?, tgl_lahir = ?, alamat = ?, tinggi = ?, berat = ?, ibu_kandung = ? WHERE no_rm = ?",
      [ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung, no_rm]
    );
    return result;
  }

  // Menghapus data pasien berdasarkan no_rm
  static async delete(no_rm) {
    const [result] = await pool.query("DELETE FROM pasien WHERE no_rm = ?", [no_rm]);
    return result;
  }
}

export default Pasien;
