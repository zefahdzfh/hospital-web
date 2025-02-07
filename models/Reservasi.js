import pool from '../config/db.js';

class Reservasi {
  static async getAll() {
    const sql = `
      SELECT r.id_reservasi, r.no_rm, r.id_poli, r.id_dokter, r.no_antrian,
             p.nama_poli, d.nama_dokter
      FROM reservasi r
      LEFT JOIN poli p ON r.id_poli = p.id_poli
      LEFT JOIN dokter d ON r.id_dokter = d.id_dokter
    `;
    const [rows] = await pool.query(sql);
    return rows;
  }

  static async getById(id_reservasi) {
    const sql = `
      SELECT r.id_reservasi, r.no_rm, r.id_poli, r.id_dokter, r.no_antrian,
             p.nama_poli, d.nama_dokter
      FROM reservasi r
      LEFT JOIN poli p ON r.id_poli = p.id_poli
      LEFT JOIN dokter d ON r.id_dokter = d.id_dokter
      WHERE r.id_reservasi = ?
    `;
    const [rows] = await pool.query(sql, [id_reservasi]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async create(data) {
    const { no_rm, id_poli, id_dokter, no_antrian } = data;
    const [result] = await pool.query(
      "INSERT INTO reservasi (no_rm, id_poli, id_dokter, no_antrian) VALUES (?, ?, ?, ?)",
      [no_rm, id_poli, id_dokter, no_antrian]
    );
    return result;
  }

  static async update(id_reservasi, data) {
    const { no_rm, id_poli, id_dokter, no_antrian } = data;
    const [result] = await pool.query(
      "UPDATE reservasi SET no_rm = ?, id_poli = ?, id_dokter = ?, no_antrian = ? WHERE id_reservasi = ?",
      [no_rm, id_poli, id_dokter, no_antrian, id_reservasi]
    );
    return result;
  }

  static async delete(id_reservasi) {
    const [result] = await pool.query(
      "DELETE FROM reservasi WHERE id_reservasi = ?",
      [id_reservasi]
    );
    return result;
  }
}

export default Reservasi;
