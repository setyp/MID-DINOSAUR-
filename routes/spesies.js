const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All SpesiesDinosaurus
router.get('/spesiesdinosaurus', (req, res) => {
  connection.query('SELECT * FROM SpesiesDinosaurus', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: err,
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Data Spesies Dinosaurus:',
      data: rows,
    });
  });
});

// GET SpesiesDinosaurus by NamaSpesies
router.get('/spesiesdinosaurus/:NamaSpesies', (req, res) => {
  const NamaSpesies = req.params.NamaSpesies;
  connection.query('SELECT * FROM SpesiesDinosaurus WHERE NamaSpesies = ?', [NamaSpesies], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: err,
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Spesies Dinosaurus not found',
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Data Spesies Dinosaurus:',
      data: rows[0],
    });
  });
});

// POST SpesiesDinosaurus
router.post('/spesiesdinosaurus', (req, res) => {
  const newSpesiesDinosaurus = req.body;
  connection.query('INSERT INTO SpesiesDinosaurus SET ?', newSpesiesDinosaurus, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: err,
      });
    }
    newSpesiesDinosaurus.NamaSpesies = result.insertId;
    return res.status(201).json({
      status: true,
      message: 'Data Spesies Dinosaurus berhasil ditambahkan',
      data: newSpesiesDinosaurus,
    });
  });
});

// PATCH SpesiesDinosaurus by NamaSpesies
router.patch('/spesiesdinosaurus/:NamaSpesies', (req, res) => {
  const NamaSpesies = req.params.NamaSpesies;
  const updatedData = req.body;
  connection.query('UPDATE SpesiesDinosaurus SET ? WHERE NamaSpesies = ?', [updatedData, NamaSpesies], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: err,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Spesies Dinosaurus not found',
      });
    }
    updatedData.NamaSpesies = NamaSpesies;
    return res.status(200).json({
      status: true,
      message: 'Data Spesies Dinosaurus berhasil diupdate',
      data: updatedData,
    });
  });
});

// DELETE SpesiesDinosaurus by NamaSpesies
router.delete('/spesiesdinosaurus/:NamaSpesies', (req, res) => {
  const NamaSpesies = req.params.NamaSpesies;
  connection.query('DELETE FROM SpesiesDinosaurus WHERE NamaSpesies = ?', [NamaSpesies], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: err,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Spesies Dinosaurus not found',
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Data Spesies Dinosaurus berhasil dihapus',
    });
  });
});

// Similar routes for other tables (HabitatDinosaurus, KlasifikasiDinosaurus, etc.)

module.exports = router;
