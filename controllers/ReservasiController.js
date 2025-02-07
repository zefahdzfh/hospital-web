import Reservasi from '../models/Reservasi.js';
import Pasien from '../models/Pasien.js';
import Dokter from '../models/Dokter.js';
import Poli from '../models/Poli.js';
import Antri from '../models/Antri.js';

class ReservasiController {
  static async index(req, res) {
    try {
      const reservasis = await Reservasi.getAll();
      res.render('reservasi/index', { reservasis });
    } catch (err) {
      console.error(err);
      res.status(500).send("Gagal mengambil data reservasi.");
    }
  }

  static async newForm(req, res) {
    try {
      const pasienList = await Pasien.getAll();
      const poliList = await Poli.getAll();
      const dokterList = await Dokter.getAll();
      const antrianList = await Antri.getAll();
      res.render('reservasi/new', { pasienList, poliList, dokterList, antrianList });
    } catch (err) {
      console.error(err);
      res.status(500).send("Gagal mengambil data.");
    }
  }

  static async create(req, res) {
    try {
      await Reservasi.create(req.body);
      res.redirect('/reservasi');
    } catch (err) {
      console.error(err);
      res.status(500).send("Gagal menambahkan reservasi.");
    }
  }

  static async editForm(req, res) {
    try {
      const { id } = req.params;
      const reservasi = await Reservasi.getById(id);
      if (!reservasi) return res.status(404).send("Reservasi tidak ditemukan.");

      const pasienList = await Pasien.getAll();
      const poliList = await Poli.getAll();
      const dokterList = await Dokter.getAll();
      const antrianList = await Antri.getAll();

      res.render('reservasi/edit', { reservasi, pasienList, poliList, dokterList, antrianList });
    } catch (err) {
      console.error(err);
      res.status(500).send("Gagal mengambil data reservasi.");
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      await Reservasi.update(id, req.body);
      res.redirect('/reservasi');
    } catch (err) {
      console.error(err);
      res.status(500).send("Gagal memperbarui reservasi.");
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await Reservasi.delete(id);
      res.redirect('/reservasi');
    } catch (err) {
      console.error(err);
      res.status(500).send("Gagal menghapus reservasi.");
    }
  }
}

export default ReservasiController;
