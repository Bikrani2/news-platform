const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Route pour obtenir toutes les nouvelles
router.get('/', async (req, res) => {
    try {
        await newsController.getAllNews(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des nouvelles' });
    }
});

// Route pour obtenir une nouvelle spécifique par son ID
router.get('/:id', async (req, res) => {
    try {
        await newsController.getNewsById(req, res);
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la récupération de l'article avec ID ${req.params.id}` });
    }
});

// Route pour créer une nouvelle
router.post('/', async (req, res) => {
    try {
        await newsController.createNews(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'article' });
    }
});

module.exports = router;
