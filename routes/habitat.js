const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All HabitatDinosaurus
router.get('/habitatdinosaurus', (req, res) => {
    connection.query('SELECT * FROM HabitatDinosaurus JOIN SpesiesDinosaurus ON HabitatDinosaurus.NamaSpesies = SpesiesDinosaurus.NamaSpesies', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err,
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Habitat Dinosaurus:',
            data: rows,
        });
    });
});

// GET HabitatDinosaurus by ID
router.get('/habitatdinosaurus/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('SELECT * FROM HabitatDinosaurus JOIN SpesiesDinosaurus ON HabitatDinosaurus.NamaSpesies = SpesiesDinosaurus.NamaSpesies WHERE ID = ?', [ID], (err, rows) => {
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
                message: 'Data Habitat Dinosaurus not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Habitat Dinosaurus:',
            data: rows[0],
        });
    });
});

// POST HabitatDinosaurus
router.post('/habitatdinosaurus', (req, res) => {
    const newHabitatDinosaurus = req.body;
    connection.query('INSERT INTO HabitatDinosaurus SET ?', newHabitatDinosaurus, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err,
            });
        }
        newHabitatDinosaurus.ID = result.insertId;
        return res.status(201).json({
            status: true,
            message: 'Data Habitat Dinosaurus berhasil ditambahkan',
            data: newHabitatDinosaurus,
        });
    });
});

// PATCH HabitatDinosaurus by ID
router.patch('/habitatdinosaurus/:ID', (req, res) => {
    const ID = req.params.ID;
    const updatedData = req.body;
    connection.query('UPDATE HabitatDinosaurus SET ? WHERE ID = ?', [updatedData, ID], (err, result) => {
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
                message: 'Data Habitat Dinosaurus not found',
            });
        }
        updatedData.ID = ID;
        return res.status(200).json({
            status: true,
            message: 'Data Habitat Dinosaurus berhasil diupdate',
            data: updatedData,
        });
    });
});

// DELETE HabitatDinosaurus by ID
router.delete('/habitatdinosaurus/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('DELETE FROM HabitatDinosaurus WHERE ID = ?', [ID], (err, result) => {
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
                message: 'Data Habitat Dinosaurus not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Habitat Dinosaurus berhasil dihapus',
        });
    });
});

// Similar routes for KlasifikasiDinosaurus, CiriciriFisikDinosaurus, PeriodeGeologi, FosilDitemukan, and PenelitianTemuanTerbaru

module.exports = router;
