import Pembayaran from '../models/Pembayaran.js';
import Antri from '../models/Antri.js';

class PembayaranController {
    static async index(req, res) {
        try {
            const results = await Pembayaran.getAll();
            res.render('pembayaran/index', { pembayaran: results });
        } catch (err) {
            console.error("Error retrieving pembayaran:", err);
            res.status(500).send("Error saat mengambil data pembayaran.");
        }
    }

    static async createForm(req, res) {
        try {
            const antriList = await Antri.getAll();
            res.render('pembayaran/new', { antriList });
        } catch (err) {
            console.error("Error retrieving antrian data:", err);
            res.status(500).send("Error saat mengambil data antrian.");
        }
    }

    static async create(req, res) {
        try {
            await Pembayaran.create(req.body);
            res.redirect('/pembayaran');
        } catch (err) {
            console.error("Error creating pembayaran:", err);
            res.status(500).send("Error saat menambahkan pembayaran.");
        }
    }

    static async editForm(req, res) {
        try {
            const id = req.params.id;
            const results = await Pembayaran.getById(id);
            if (results.length === 0) {
                return res.status(404).send("Data tidak ditemukan");
            }
            const antriList = await Antri.getAll();
            res.render('pembayaran/edit', { pembayaran: results[0], antriList });
        } catch (err) {
            console.error("Error retrieving pembayaran by ID:", err);
            res.status(500).send("Error saat mengambil data pembayaran.");
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            await Pembayaran.update(id, req.body);
            res.redirect('/pembayaran');
        } catch (err) {
            console.error("Error updating pembayaran:", err);
            res.status(500).send("Error saat mengupdate pembayaran.");
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await Pembayaran.delete(id);
            res.redirect('/pembayaran');
        } catch (err) {
            console.error("Error deleting pembayaran:", err);
            res.status(500).send("Error saat menghapus pembayaran.");
        }
    }
}

export default PembayaranController;
