// app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import PegawaiController from './controllers/PegawaiController.js';

const app = express();
const port = process.env.PORT || 3000;

// Menentukan __dirname pada ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS sebagai view engine dan tentukan direktori views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk parsing body (form data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ROUTES */

// Tampilkan daftar pegawai
app.get('/', async (req, res) => {
  try {
    const pegawais = await PegawaiController.listPegawai();
    res.render('pegawai/pegawai_list', { pegawais });
  } catch (error) {
    res.status(500).send('Error saat mengambil data pegawai.');
  }
});

// Tampilkan form tambah pegawai
app.get('/pegawai/new', (req, res) => {
  res.render('pegawai/pegawai_new');
});

// Proses tambah pegawai baru
app.post('/pegawai', async (req, res) => {
  try {
    await PegawaiController.addPegawai(req.body);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error saat menambahkan pegawai.');
  }
});

// Tampilkan detail pegawai
app.get('/pegawai/:id', async (req, res) => {
  try {
    const pegawai = await PegawaiController.showPegawai(req.params.id);
    res.render('pegawai_detail', { pegawai });
  } catch (error) {
    res.status(500).send('Error saat mengambil detail pegawai.');
  }
});

// Tampilkan form edit pegawai
app.get('/pegawai/:id/edit', async (req, res) => {
  try {
    const pegawai = await PegawaiController.showPegawai(req.params.id);
    res.render('pegawai_edit', { pegawai });
  } catch (error) {
    res.status(500).send('Error saat mengambil data untuk edit.');
  }
});

// Proses update pegawai
app.post('/pegawai/:id/edit', async (req, res) => {
  try {
    await PegawaiController.editPegawai(req.params.id, req.body);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error saat mengupdate pegawai.');
  }
});

// Proses hapus pegawai
app.post('/pegawai/:id/delete', async (req, res) => {
  try {
    await PegawaiController.removePegawai(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error saat menghapus pegawai.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
