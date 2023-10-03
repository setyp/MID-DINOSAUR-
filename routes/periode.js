const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All PeriodeGeologi
router.get('/periodegeologi', (req, res) => {
    connection.query('SELECT * FROM PeriodeGeologi JOIN SpesiesDinosaurus ON PeriodeGeologi.NamaSpesies = SpesiesDinosaurus.NamaSpesies', (err, rows) => {
      if (err) {
        // Handle errors and send response
      } else {
        return res.status(200).json({
          status: true,
          message: 'Data PeriodeGeologi',
          data: rows,
        });
      }
    });
  });
  
  // GET PeriodeGeologi by ID
  router.get('/periodegeologi/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('SELECT * FROM PeriodeGeologi JOIN SpesiesDinosaurus ON PeriodeGeologi.NamaSpesies = SpesiesDinosaurus.NamaSpesies WHERE ID = ?', [ID], (err, rows) => {
      if (err) {
        // Handle errors and send response
      }
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: 'Data PeriodeGeologi not found',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'Data PeriodeGeologi',
          data: rows[0],
        });
      }
    });
  });
  
  // POST PeriodeGeologi
  router.post('/periodegeologi', (req, res) => {
    const newPeriodeGeologi = req.body;
    connection.query('INSERT INTO PeriodeGeologi SET ?', newPeriodeGeologi, (err, result) => {
      if (err) {
        // Handle errors and send response
      } else {
        newPeriodeGeologi.ID = result.insertId;
        return res.status(201).json({
          status: true,
          message: 'Data PeriodeGeologi berhasil ditambahkan',
          data: newPeriodeGeologi,
        });
      }
    });
  });
  
  // PATCH PeriodeGeologi by ID
  router.patch('/periodegeologi/:ID', (req, res) => {
    const ID = req.params.ID;
    const updatedData = req.body;
    connection.query('UPDATE PeriodeGeologi SET ? WHERE ID = ?', [updatedData, ID], (err, result) => {
      if (err) {
        // Handle errors and send response
      } else if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: 'Data PeriodeGeologi not found',
        });
      } else {
        updatedData.ID = ID;
        return res.status(200).json({
          status: true,
          message: 'Data PeriodeGeologi berhasil diupdate',
          data: updatedData,
        });
      }
    });
  });
  
  // DELETE PeriodeGeologi by ID
  router.delete('/periodegeologi/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('DELETE FROM PeriodeGeologi WHERE ID = ?', [ID], (err, result) => {
      if (err) {
        // Handle errors and send response
      } else if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: 'Data PeriodeGeologi not found',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'Data PeriodeGeologi berhasil dihapus',
        });
      }
    });
  });
  
  // Similar routes for PenelitianTemuanTerbaru
  
module.exports = router;
