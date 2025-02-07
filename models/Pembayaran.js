import db from '../config/db.js';

class Pembayaran {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM pembayaran');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM pembayaran WHERE id_pembayaran = ?', [id]);
        return rows;
    }

    static async create(data) {
        const { no_antrian, tipe_pembayaran, nama_instansi } = data;
        const [result] = await db.execute(
            'INSERT INTO pembayaran (no_antrian, tipe_pembayaran, nama_instansi) VALUES (?, ?, ?)',
            [no_antrian, tipe_pembayaran, nama_instansi]
        );
        return result;
    }

    static async update(id, data) {
        const { no_antrian, tipe_pembayaran, nama_instansi } = data;
        const [result] = await db.execute(
            'UPDATE pembayaran SET no_antrian = ?, tipe_pembayaran = ?, nama_instansi = ? WHERE id_pembayaran = ?',
            [no_antrian, tipe_pembayaran, nama_instansi, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM pembayaran WHERE id_pembayaran = ?', [id]);
        return result;
    }
}

export default Pembayaran;
