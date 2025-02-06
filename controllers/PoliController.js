import Poli from '../models/Poli.js';
import Pegawai from '../models/Pegawai.js';

class PoliController {
  // Tampilkan daftar poli dengan nama pegawai
  static async index(req, res) {
    try {
      const results = await Poli.getAll(); // Sudah include nama_pegawai
      res.render('poli/index', { poli: results }); // Kirim data ke view
    } catch (err) {
      console.error("Error retrieving poli:", err);
      res.status(500).send("Error saat mengambil data poli.");
    }
  }

  // Tampilkan form tambah poli
  static async newForm(req, res) {
    try {
      const pegawais = await Pegawai.getAll(); // Ambil semua pegawai dari database
      res.render('poli/new', { pegawais }); // Kirim daftar pegawai ke view
    } catch (err) {
      console.error("Error retrieving pegawais:", err);
      res.status(500).send("Error saat mengambil data pegawai.");
    }
  }

  // Proses tambah poli
  static async create(req, res) {
    try {
      const { nama_poli, id_peg } = req.body;
      await Poli.create({ nama_poli, id_peg });
      res.redirect('/poli');
    } catch (err) {
      console.error("Error creating poli:", err);
      res.status(500).send("Error saat menambahkan poli.");
    }
  }

  // Tampilkan detail poli dengan nama pegawai
  static async show(req, res) {
    try {
      const id_poli = req.params.id_poli;
      const poli = await Poli.getById(id_poli); // Mengambil poli beserta dokter yang terkait

      if (!poli) {
        return res.status(404).send("Data tidak ditemukan");
      }

      res.render('poli/detail', { poli }); // Kirim data ke view
    } catch (err) {
      console.error("Error retrieving poli detail:", err);
      res.status(500).send("Error saat mengambil detail poli.");
    }
  }
  // Tampilkan form edit poli
  static async editForm(req, res) {
    try {
      const id_poli = req.params.id_poli;
      const poli = await Poli.getById(id_poli);
      const pegawais = await Pegawai.getAll();
      if (!poli) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.render('poli/edit', { poli, pegawais });
    } catch (err) {
      console.error("Error retrieving poli by ID:", err);
      res.status(500).send("Error saat mengambil data poli.");
    }
  }

  // Proses update data poli
static async update(req, res) {
    try {
      const id_poli = req.params.id_poli;
      const { nama_poli, id_peg } = req.body;
      if (!nama_poli || !id_peg) {
        return res.status(400).send("Nama Poli dan ID Pegawai harus diisi.");
      }
      // Cek apakah poli ada
      const poli = await Poli.getById(id_poli);
      if (!poli) {
        return res.status(404).send("Poli tidak ditemukan.");
      }
  
      await Poli.update(id_poli, { nama_poli, id_peg });
      res.redirect('/poli');
    } catch (err) {
      console.error("Error updating poli:", err);  // Log lebih detail
      res.status(500).send(`Error saat mengupdate poli: ${err.message}`);
    }
  }

  // Proses hapus poli
  static async delete(req, res) {
    try {
      const id_poli = req.params.id_poli;
      await Poli.delete(id_poli);
      res.redirect('/poli');
    } catch (err) {
      console.error("Error deleting poli:", err);
      res.status(500).send("Error saat menghapus poli.");
    }
  }
}

export default PoliController;
