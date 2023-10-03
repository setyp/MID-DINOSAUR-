const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All KlasifikasiDinosaurus
router.get('/klasifikasidinosaurus', (req, res) => {
    connection.query('SELECT * FROM KlasifikasiDinosaurus JOIN SpesiesDinosaurus ON KlasifikasiDinosaurus.NamaSpesies = SpesiesDinosaurus.NamaSpesies', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err,
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data:',
            data: rows,
        });
    });
});

// GET KlasifikasiDinosaurus by ID
router.get('/klasifikasidinosaurus/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('SELECT * FROM KlasifikasiDinosaurus JOIN SpesiesDinosaurus ON KlasifikasiDinosaurus.NamaSpesies = SpesiesDinosaurus.NamaSpesies WHERE ID = ?', [ID], (err, rows) => {
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
                message: 'Data Klasifikasi Dinosaurus not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data:',
            data: rows[0],
        });
    });
});

// POST KlasifikasiDinosaurus
router.post('/klasifikasidinosaurus', (req, res) => {
    const newKlasifikasiDinosaurus = req.body;
    connection.query('INSERT INTO KlasifikasiDinosaurus SET ?', newKlasifikasiDinosaurus, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err,
            });
        }
        newKlasifikasiDinosaurus.ID = result.insertId;
        return res.status(201).json({
            status: true,
            message: 'Data Klasifikasi Dinosaurus berhasil ditambahkan',
            data: newKlasifikasiDinosaurus,
        });
    });
});

// PATCH KlasifikasiDinosaurus by ID
router.patch('/klasifikasidinosaurus/:ID', (req, res) => {
    const ID = req.params.ID;
    const updatedData = req.body;
    connection.query('UPDATE KlasifikasiDinosaurus SET ? WHERE ID = ?', [updatedData, ID], (err, result) => {
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
                message: 'Data Klasifikasi Dinosaurus not found',
            });
        }
        updatedData.ID = ID;
        return res.status(200).json({
            status: true,
            message: 'Data Klasifikasi Dinosaurus berhasil diupdate',
            data: updatedData,
        });
    });
});

// DELETE KlasifikasiDinosaurus by ID
router.delete('/klasifikasidinosaurus/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('DELETE FROM KlasifikasiDinosaurus WHERE ID = ?', [ID], (err, result) => {
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
                message: 'Data Klasifikasi Dinosaurus not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Klasifikasi Dinosaurus berhasil dihapus',
        });
    });
});

// Similar routes for CiriciriFisikDinosaurus, PeriodeGeologi, FosilDitemukan, and PenelitianTemuanTerbaru

module.exports = router;
