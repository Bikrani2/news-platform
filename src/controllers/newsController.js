const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/products';

const newsController = {
    async getAllNews(req, res) {
        try {
            const response = await axios.get(DUMMY_JSON_URL);
            if (response.data && response.data.products) {
                res.json({ posts: response.data.products });
            } else {
                res.status(404).json({ message: 'Aucune nouvelle trouvée' });
            }
        } catch (error) {
            console.error('Erreur dans getAllNews:', error);
            res.status(500).json({ message: 'Erreur serveur lors de la récupération des nouvelles' });
        }
    },

    async getNewsById(req, res) {
        try {
            const articleId = req.params.id;
            console.log(`Fetching article with ID: ${articleId}`);  // Log de l'ID pour vérifier
            const response = await axios.get(`${DUMMY_JSON_URL}/${articleId}`);
            if (response.data) {
                console.log(response.data);  // Log de la réponse pour voir les données
                res.json(response.data);
            } else {
                res.status(404).json({ message: `Article avec ID ${articleId} non trouvé` });
            }
        } catch (error) {
            console.error('Erreur dans getNewsById:', error);  // Log de l'erreur pour diagnostiquer le problème
            res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'article' });
        }
    },

    async createNews(req, res) {
        try {
            const { title, excerpt, imageUrl } = req.body;
            if (!title || !excerpt) {
                return res.status(400).json({ message: 'Titre et extrait sont requis' });
            }
            // Simuler l'ajout de l'article à la base de données
            console.log('Nouvel article créé:', { title, excerpt, imageUrl });
            res.status(201).json({ message: 'Article créé avec succès' });
        } catch (error) {
            console.error('Erreur dans createNews:', error);
            res.status(500).json({ message: 'Erreur serveur lors de la création de l\'article' });
        }
    }
};

module.exports = newsController;
