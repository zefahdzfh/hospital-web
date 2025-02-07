import pool from '../config/db.js';

class Antri {
  // Generate nomor antrian untuk hari ini
  static async generateNoAntrian(tanggal) {
    const sqlCount = `SELECT COUNT(*) AS count FROM antri WHERE tanggal = ?`;
    const [rows] = await pool.query(sqlCount, [tanggal]);
    const countToday = rows[0].count;
    const nextNumber = countToday + 1; // nomor urut hari ini

    // Format nomor urut ke 4 digit (misal: 0001, 0002, dst.)
    const formattedNumber = nextNumber.toString().padStart(4, '0');

    // Format nomor antrian (misal: 0001-20240207)
    const formattedDate = tanggal.replace(/-/g, ''); // Ubah YYYY-MM-DD jadi YYYYMMDD
    const noAntrian = `${formattedNumber}-${formattedDate}`;

    return noAntrian;
  }

  // Ambil semua data antrian (diurutkan berdasarkan tanggal & waktu)
  static async getAll() {
    const sql = `SELECT * FROM antri ORDER BY tanggal DESC, jam ASC`;
    const [rows] = await pool.query(sql);
    return rows;
  }

  // Ambil data antri berdasarkan no_antrian
  static async getByNo(no_antrian) {
    const sql = `SELECT * FROM antri WHERE no_antrian = ?`;
    const [rows] = await pool.query(sql, [no_antrian]);
    return rows[0];
  }

  // Tambah data antri baru (no_antrian auto generate)
  static async create(data) {
    const { tanggal, hari, jam } = data;
    
    if (!tanggal || !hari || !jam) {
      throw new Error("Data tidak lengkap (tanggal, hari, jam wajib diisi).");
    }

    const no_antrian = await this.generateNoAntrian(tanggal);

    const sql = `INSERT INTO antri (no_antrian, tanggal, hari, jam) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [no_antrian, tanggal, hari, jam]);

    return result;
  }

  // Update data antri
  static async update(no_antrian, data) {
    const { tanggal, hari, jam } = data;

    if (!tanggal || !hari || !jam) {
      throw new Error("Data tidak lengkap (tanggal, hari, jam wajib diisi).");
    }

    const sql = `UPDATE antri SET tanggal = ?, hari = ?, jam = ? WHERE no_antrian = ?`;
    const [result] = await pool.query(sql, [tanggal, hari, jam, no_antrian]);

    return result;
  }

  // Hapus data antri
  static async delete(no_antrian) {
    const sql = `DELETE FROM antri WHERE no_antrian = ?`;
    const [result] = await pool.query(sql, [no_antrian]);
    return result;
  }
}

export default Antri;
