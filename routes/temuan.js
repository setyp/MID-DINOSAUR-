const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All PenelitianTemuanTerbaru
router.get('/penelitiantemuanterbaru', (req, res) => {
    connection.query('SELECT * FROM PenelitianTemuanTerbaru JOIN SpesiesDinosaurus ON PenelitianTemuanTerbaru.NamaSpesies = SpesiesDinosaurus.NamaSpesies', (err, rows) => {
      if (err) {
        // Handle errors and send response
      } else {
        return res.status(200).json({
          status: true,
          message: 'Data PenelitianTemuanTerbaru',
          data: rows,
        });
      }
    });
  });
  
  // GET PenelitianTemuanTerbaru by ID
  router.get('/penelitiantemuanterbaru/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('SELECT * FROM PenelitianTemuanTerbaru JOIN SpesiesDinosaurus ON PenelitianTemuanTerbaru.NamaSpesies = SpesiesDinosaurus.NamaSpesies WHERE ID = ?', [ID], (err, rows) => {
      if (err) {
        // Handle errors and send response
      }
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: 'Data PenelitianTemuanTerbaru not found',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'Data PenelitianTemuanTerbaru',
          data: rows[0],
        });
      }
    });
  });
  
  // POST PenelitianTemuanTerbaru
  router.post('/penelitiantemuanterbaru', (req, res) => {
    const newPenelitianTemuanTerbaru = req.body;
    connection.query('INSERT INTO PenelitianTemuanTerbaru SET ?', newPenelitianTemuanTerbaru, (err, result) => {
      if (err) {
        // Handle errors and send response
      } else {
        newPenelitianTemuanTerbaru.ID = result.insertId;
        return res.status(201).json({
          status: true,
          message: 'Data PenelitianTemuanTerbaru berhasil ditambahkan',
          data: newPenelitianTemuanTerbaru,
        });
      }
    });
  });
  
  // PATCH PenelitianTemuanTerbaru by ID
  router.patch('/penelitiantemuanterbaru/:ID', (req, res) => {
    const ID = req.params.ID;
    const updatedData = req.body;
    connection.query('UPDATE PenelitianTemuanTerbaru SET ? WHERE ID = ?', [updatedData, ID], (err, result) => {
      if (err) {
        // Handle errors and send response
      } else if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: 'Data PenelitianTemuanTerbaru not found',
        });
      } else {
        updatedData.ID = ID;
        return res.status(200).json({
          status: true,
          message: 'Data PenelitianTemuanTerbaru berhasil diupdate',
          data: updatedData,
        });
      }
    });
  });
  
  // DELETE PenelitianTemuanTerbaru by ID
  router.delete('/penelitiantemuanterbaru/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('DELETE FROM PenelitianTemuanTerbaru WHERE ID = ?', [ID], (err, result) => {
      if (err) {
        // Handle errors and send response
      } else if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false,
          message: 'Data PenelitianTemuanTerbaru not found',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'Data PenelitianTemuanTerbaru berhasil dihapus',
        });
      }
    });
  });
  
module.exports = router;