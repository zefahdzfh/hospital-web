// controllers/DokterController.js
import Dokter from '../models/Dokter.js';
import Pegawai from '../models/Pegawai.js';
import Poli from '../models/Poli.js';

class DokterController {
  // Tampilkan daftar dokter
  static async index(req, res) {
    try {
      const dokters = await Dokter.getAll();
      res.render('dokter/index', { dokters });
    } catch (err) {
      res.status(500).send('Error saat mengambil data dokter.');
    }
  }

  // Tampilkan form tambah dokter
  static async newForm(req, res) {
    try {
      const pegawais = await Pegawai.getAll();
      const polies = await Poli.getAll();
      res.render('dokter/new', { pegawais, polies });
    } catch (err) {
      res.status(500).send('Error saat mengambil data pegawai atau poli.');
    }
  }

  // Proses tambah dokter
  static async create(req, res) {
    try {
      const { id_pegawai, id_poli, nama_dokter, status_dokter } = req.body;
      await Dokter.create({ id_pegawai, id_poli, nama_dokter, status_dokter });
      res.redirect('/dokter');
    } catch (err) {
      res.status(500).send('Error saat menambahkan dokter.');
    }
  }

  // Tampilkan form edit dokter
  static async editForm(req, res) {
    try {
      const id_dokter = req.params.id_dokter;
      const dokter = await Dokter.getById(id_dokter);
      const pegawais = await Pegawai.getAll();
      const polies = await Poli.getAll();
      if (!dokter) {
        return res.status(404).send('Dokter tidak ditemukan.');
      }
      res.render('dokter/edit', { dokter, pegawais, polies });
    } catch (err) {
      res.status(500).send('Error saat mengambil data dokter.');
    }
  }

  // Proses update dokter
  static async update(req, res) {
    try {
      const id_dokter = req.params.id_dokter;
      const { id_pegawai, id_poli, nama_dokter, status_dokter } = req.body;
      await Dokter.update(id_dokter, { id_pegawai, id_poli, nama_dokter, status_dokter });
      res.redirect('/dokter');
    } catch (err) {
      res.status(500).send('Error saat mengupdate dokter.');
    }
  }

  // Proses hapus dokter
  static async delete(req, res) {
    try {
      const id_dokter = req.params.id_dokter;
      await Dokter.delete(id_dokter);
      res.redirect('/dokter');
    } catch (err) {
      res.status(500).send('Error saat menghapus dokter.');
    }
  }
}

export default DokterController;
