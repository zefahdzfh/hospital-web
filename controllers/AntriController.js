import Antri from '../models/Antri.js';

class AntriController {
  // Tampilkan semua antrian
  static async index(req, res) {
    try {
      const antris = await Antri.getAll();
      res.render('antri/index', { antris });
    } catch (err) {
      console.error("Error mengambil data antri:", err);
      res.status(500).send("Terjadi kesalahan saat mengambil data antri.");
    }
  }

  // Tampilkan form tambah antrian
  static newForm(req, res) {
    try {
      res.render('antri/new');
    } catch (err) {
      console.error("Error menampilkan form antri:", err);
      res.status(500).send("Terjadi kesalahan saat menampilkan form.");
    }
  }

  // Proses tambah antrian
  static async create(req, res) {
    try {
      const { tanggal, hari, jam } = req.body;
      if (!tanggal || !hari || !jam) {
        return res.status(400).send("Data tidak lengkap.");
      }

      await Antri.create({ tanggal, hari, jam });
      res.redirect('/antri');
    } catch (err) {
      console.error("Error menambahkan antri:", err);
      res.status(500).send("Terjadi kesalahan saat menambahkan antrian.");
    }
  }

  // Tampilkan detail antrian berdasarkan nomor antrian
  static async show(req, res) {
    try {
      const { no_antrian } = req.params;
      const antri = await Antri.getByNo(no_antrian);
      
      if (!antri) {
        return res.status(404).send("Data antri tidak ditemukan.");
      }

      res.render('antri/detail', { antri });
    } catch (err) {
      console.error("Error mengambil data antri:", err);
      res.status(500).send("Terjadi kesalahan saat mengambil data antri.");
    }
  }

  // Proses update antrian
  static async update(req, res) {
    try {
      const { no_antrian } = req.params;
      const { tanggal, hari, jam } = req.body;

      if (!tanggal || !hari || !jam) {
        return res.status(400).send("Data tidak lengkap.");
      }

      await Antri.update(no_antrian, { tanggal, hari, jam });
      res.redirect('/antri');
    } catch (err) {
      console.error("Error mengupdate antri:", err);
      res.status(500).send("Terjadi kesalahan saat mengupdate antrian.");
    }
  }

  // Proses hapus antrian
  static async delete(req, res) {
    try {
      const { no_antrian } = req.params;
      await Antri.delete(no_antrian);
      res.redirect('/antri');
    } catch (err) {
      console.error("Error menghapus antri:", err);
      res.status(500).send("Terjadi kesalahan saat menghapus antrian.");
    }
  }
}

export default AntriController;
