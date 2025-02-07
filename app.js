// app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import PegawaiController from './controllers/PegawaiController.js';
import PasienController from './controllers/PasienController.js';
import ReservasiController from './controllers/ReservasiController.js';
import PoliController from './controllers/PoliController.js';
import DokterController from './controllers/DokterController.js';



const app = express();
const port = process.env.PORT || 3000;

// Menentukan __dirname pada ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set folder statis untuk file HTML
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk mengirimkan file HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html')); // Pastikan path sudah sesuai
});

// Set EJS sebagai view engine dan tentukan direktori views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk parsing body (form data) dan json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


/* ROUTES */

// === ROUTES UNTUK HALAMAN UTAMA ===

// Route utama: mengarah ke index.ejs
app.get('/', (req, res) => {
  res.render('index');  // Render index.ejs di folder views
});

// === ROUTES UNTUK PEGAWAI ===

// Tampilkan daftar pegawai
app.get('/pegawai', async (req, res) => {
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
    res.render('pegawai/pegawai_detail', { pegawai });
  } catch (error) {
    res.status(500).send('Error saat mengambil detail pegawai.');
  }
});

// Tampilkan form edit pegawai
app.get('/pegawai/:id/edit', async (req, res) => {
  try {
    const pegawai = await PegawaiController.showPegawai(req.params.id);
    res.render('pegawai/pegawai_edit', { pegawai });
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

// === ROUTES UNTUK PASIEN ===

// Tampilkan daftar pasien
app.get('/pasien', PasienController.index); // gunakan method 'index'

// Tampilkan form tambah pasien
app.get('/pasien/new', PasienController.newForm); // gunakan method 'newForm'

// Proses tambah pasien baru
app.post('/pasien', PasienController.create); // gunakan method 'create'

// Tampilkan detail pasien (opsional)
app.get('/pasien/:no_rm', PasienController.show); // tambahkan method 'show' di controller

// Tampilkan form edit pasien
app.get('/pasien/:no_rm/edit', PasienController.editForm); // gunakan method 'editForm'

// Proses update pasien
app.post('/pasien/:no_rm/edit', PasienController.update); // gunakan method 'update'

// Proses hapus pasien
app.post('/pasien/:no_rm/delete', PasienController.delete); // gunakan method 'delete'

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// === ROUTES UNTUK RESERVASI ===
app.get('/reservasi', ReservasiController.index);               // Tampilkan daftar reservasi
app.get('/reservasi/new', ReservasiController.newForm);           // Tampilkan form tambah reservasi
app.post('/reservasi', ReservasiController.create);               // Proses tambah reservasi
app.get('/reservasi/:id/edit', ReservasiController.editForm);      // Tampilkan form edit reservasi
app.post('/reservasi/:id/edit', ReservasiController.update);       // Proses update reservasi
app.post('/reservasi/:id/delete', ReservasiController.delete);     // Proses hapus reservasi

// === ROUTES UNTUK POLI ===
app.get('/poli', PoliController.index);
app.get('/poli/new', PoliController.newForm);
app.post('/poli', PoliController.create);
app.get('/poli/:id_poli', PoliController.show);
app.get('/poli/:id_poli/edit', PoliController.editForm);
app.post('/poli/:id_poli/edit', PoliController.update);
app.post('/poli/:id_poli/delete', PoliController.delete);


// === ROUTES UNTUK POLI ===

// Daftar dokter
app.get('/dokter', DokterController.index);

// Form tambah dokter
app.get('/dokter/new', DokterController.newForm);

// Proses tambah dokter
app.post('/dokter', DokterController.create);

// Form edit dokter
app.get('/dokter/:id_dokter/edit', DokterController.editForm);

// Proses update dokter
app.post('/dokter/:id_dokter/edit', DokterController.update);

// Proses hapus dokter
app.post('/dokter/:id_dokter/delete', DokterController.delete);

//detail
// Route untuk menampilkan detail dokter
app.get('/dokter/:id_dokter/detail', DokterController.show);

