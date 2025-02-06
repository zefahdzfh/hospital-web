// controllers/PasienController.js
import Pasien from '../models/Pasien.js';

class PasienController {
  // Tampilkan daftar pasien
  static async index(req, res) {
    try {
      const results = await Pasien.getAll();
      res.render('pasien/index', { pasien: results });
    } catch (err) {
      console.error("Error retrieving pasien:", err);
      res.status(500).send("Error saat mengambil data pasien.");
    }
  }

  // Tampilkan form tambah pasien
  static newForm(req, res) {
    res.render('pasien/new');
  }

  // Proses tambah pasien
  static async create(req, res) {
    try {
      await Pasien.create(req.body);
      res.redirect('/pasien');
    } catch (err) {
      console.error("Error creating pasien:", err);
      res.status(500).send("Error saat menambahkan pasien.");
    }
  }

  // Tampilkan detail pasien (tambahan)
  static async show(req, res) {
    try {
      const no_rm = req.params.no_rm;
      const results = await Pasien.getById(no_rm);
      if (results.length === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.render('pasien/detail', { pasien: results[0] });
    } catch (err) {
      console.error("Error retrieving pasien detail:", err);
      res.status(500).send("Error saat mengambil detail pasien.");
    }
  }

  // Tampilkan form edit pasien
  static async editForm(req, res) {
    try {
      const no_rm = req.params.no_rm;
      const results = await Pasien.getById(no_rm);
      if (results.length === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.render('pasien/edit', { pasien: results[0] });
    } catch (err) {
      console.error("Error retrieving pasien by ID:", err);
      res.status(500).send("Error saat mengambil data pasien.");
    }
  }

  // Proses update data pasien
  static async update(req, res) {
    try {
      const no_rm = req.params.no_rm;
      await Pasien.update(no_rm, req.body);
      res.redirect('/pasien');
    } catch (err) {
      console.error("Error updating pasien:", err);
      res.status(500).send("Error saat mengupdate pasien.");
    }
  }

  // Proses hapus pasien
  static async delete(req, res) {
    try {
      const no_rm = req.params.no_rm;
      await Pasien.delete(no_rm);
      res.redirect('/pasien');
    } catch (err) {
      console.error("Error deleting pasien:", err);
      res.status(500).send("Error saat menghapus pasien.");
    }
  }
}

export default PasienController;
