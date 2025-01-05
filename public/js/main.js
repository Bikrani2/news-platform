// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
    try {
        const response = await fetch('/api/news');
        const data = await response.json();
        displayNews(data.posts);
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles');
    }
}

// TODO: Question 1 - Compléter la fonction displayNews
function displayNews(news) {
    // Sélectionner le conteneur dans lequel les articles seront affichés
    const container = document.getElementById('news-container');
    
    // Vider le conteneur avant d'ajouter de nouveaux articles
    container.innerHTML = '';

    // Pour chaque article dans la liste `news`
    news.forEach(article => {
        // Créer une carte Bootstrap pour chaque article
        const articleCard = document.createElement('div');
        articleCard.classList.add('col-md-4', 'mb-4'); // Utilisation des classes Bootstrap pour le layout responsive

        // Créer le contenu HTML de la carte
        articleCard.innerHTML = `
            <div class="card shadow-sm">
                <img src="${article.imageUrl}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.excerpt}</p>
                    <a href="/article/${article.id}" class="btn btn-primary">Lire plus</a>
                </div>
            </div>
        `;
        
        // Ajouter la carte dans le conteneur
        container.appendChild(articleCard);
    });
}


// TODO: Question 2 - Créer une fonction pour gérer les erreurs
function showError(message) {
    // Afficher un message d'erreur avec Bootstrap
}

// Initialisation
document.addEventListener('DOMContentLoaded', fetchLatestNews);

fetchLatestNews()