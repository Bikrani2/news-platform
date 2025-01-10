require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const newsRoutes = require('./routes/newsRoutes'); // Importer les routes

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware pour loguer chaque requête entrante
app.use((req, res, next) => {
    console.log(`Requête reçue: ${req.method} ${req.originalUrl}`);
    next(); // Passer la requête au middleware suivant
});

// Activer CORS pour les requêtes cross-origin
app.use(cors());

// Analyser les corps des requêtes en JSON
app.use(express.json());

// Servir les fichiers statiques (frontend)
// Chemin ajusté pour la structure de ton projet
app.use(express.static(path.join(__dirname, '..', 'public'))); // Si 'public' est au niveau supérieur de 'src'

// Routes API pour les articles
app.use('/api/news', newsRoutes);

// Middleware pour gérer les erreurs (404 - Route non trouvée)
app.use((req, res, next) => {
  console.log('Route non trouvée:', req.originalUrl); // Log si la route n'est pas trouvée
  const error = new Error('Route not found');
  error.status = 404;
  next(error); // Passer l'erreur au gestionnaire d'erreurs
});

// Middleware pour gérer toutes les erreurs (500 - Erreurs internes)
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.stack); // Afficher l'erreur dans la console
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: err.stack, // Afficher la stack si c'est une erreur serveur
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
