const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All CiriciriFisikDinosaurus
router.get('/ciricirifisikdinosaurus', (req, res) => {
    connection.query('SELECT * FROM CiriciriFisikDinosaurus JOIN SpesiesDinosaurus ON CiriciriFisikDinosaurus.NamaSpesies = SpesiesDinosaurus.NamaSpesies', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err,
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Ciriciri Fisik Dinosaurus:',
            data: rows,
        });
    });
});

// GET CiriciriFisikDinosaurus by ID
router.get('/ciricirifisikdinosaurus/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('SELECT * FROM CiriciriFisikDinosaurus JOIN SpesiesDinosaurus ON CiriciriFisikDinosaurus.NamaSpesies = SpesiesDinosaurus.NamaSpesies WHERE ID = ?', [ID], (err, rows) => {
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
                message: 'Data Ciriciri Fisik Dinosaurus not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Ciriciri Fisik Dinosaurus:',
            data: rows[0],
        });
    });
});

// POST CiriciriFisikDinosaurus
router.post('/ciricirifisikdinosaurus', (req, res) => {
    const newCiriciriFisikDinosaurus = req.body;
    connection.query('INSERT INTO CiriciriFisikDinosaurus SET ?', newCiriciriFisikDinosaurus, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err,
            });
        }
        newCiriciriFisikDinosaurus.ID = result.insertId;
        return res.status(201).json({
            status: true,
            message: 'Data Ciriciri Fisik Dinosaurus berhasil ditambahkan',
            data: newCiriciriFisikDinosaurus,
        });
    });
});

// PATCH CiriciriFisikDinosaurus by ID
router.patch('/ciricirifisikdinosaurus/:ID', (req, res) => {
    const ID = req.params.ID;
    const updatedData = req.body;
    connection.query('UPDATE CiriciriFisikDinosaurus SET ? WHERE ID = ?', [updatedData, ID], (err, result) => {
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
                message: 'Data Ciriciri Fisik Dinosaurus not found',
            });
        }
        updatedData.ID = ID;
        return res.status(200).json({
            status: true,
            message: 'Data Ciriciri Fisik Dinosaurus berhasil diupdate',
            data: updatedData,
        });
    });
});

// DELETE CiriciriFisikDinosaurus by ID
router.delete('/ciricirifisikdinosaurus/:ID', (req, res) => {
    const ID = req.params.ID;
    connection.query('DELETE FROM CiriciriFisikDinosaurus WHERE ID = ?', [ID], (err, result) => {
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
                message: 'Data Ciriciri Fisik Dinosaurus not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Data Ciriciri Fisik Dinosaurus berhasil dihapus',
        });
    });
});

module.exports = router;
