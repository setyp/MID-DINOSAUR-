const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All FosilDitemukan
router.get('/fosilditemukan', (req, res) => {
    connection.query('SELECT * FROM FosilDitemukan JOIN SpesiesDinosaurus ON FosilDitemukan.NamaSpesies = SpesiesDinosaurus.NamaSpesies', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err,
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Fosil Ditemukan:',
            data: rows,
        });
    });
});

// GET FosilDitemukan by ID
router.get('/fosilditemukan/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('SELECT * FROM FosilDitemukan JOIN SpesiesDinosaurus ON FosilDitemukan.NamaSpesies = SpesiesDinosaurus.NamaSpesies WHERE ID = ?', [ID], (err, rows) => {
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
                message: 'Data Fosil Ditemukan not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Fosil Ditemukan:',
            data: rows[0],
        });
    });
});

// POST FosilDitemukan
router.post('/fosilditemukan', (req, res) => {
    const newFosilDitemukan = req.body;
    connection.query('INSERT INTO FosilDitemukan SET ?', newFosilDitemukan, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err,
            });
        }
        newFosilDitemukan.ID = result.insertId;
        return res.status(201).json({
            status: true,
            message: 'Data Fosil Ditemukan berhasil ditambahkan',
            data: newFosilDitemukan,
        });
    });
});

// PATCH FosilDitemukan by ID
router.patch('/fosilditemukan/:ID', (req, res) => {
    const ID = req.params.ID;
    const updatedData = req.body;
    connection.query('UPDATE FosilDitemukan SET ? WHERE ID = ?', [updatedData, ID], (err, result) => {
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
                message: 'Data Fosil Ditemukan not found',
            });
        }
        updatedData.ID = ID;
        return res.status(200).json({
            status: true,
            message: 'Data Fosil Ditemukan berhasil diupdate',
            data: updatedData,
        });
    });
});

// DELETE FosilDitemukan by ID
router.delete('/fosilditemukan/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('DELETE FROM FosilDitemukan WHERE ID = ?', [ID], (err, result) => {
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
                message: 'Data Fosil Ditemukan not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Fosil Ditemukan berhasil dihapus',
        });
    });
});

module.exports = router;
