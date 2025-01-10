async function fetchLatestNews() {
    try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Erreur réseau');

        const data = await response.json();
        if (data && data.posts) {
            displayNews(data.posts);
        } else {
            showError('Aucun article disponible');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles');
    }
}

// Fonction pour afficher les articles
function displayNews(news) {
    const container = document.getElementById('news-container');
    if (!container) return;

    container.innerHTML = ''; // Vider le conteneur avant d'ajouter des articles

    if (news.length === 0) {
        container.innerHTML = `<p class="text-center text-muted">Aucun article disponible pour le moment.</p>`;
        return;
    }

    news.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('col-md-4', 'mb-4', 'animate__animated', 'animate__fadeInUp');

        const title = article.title || 'Titre indisponible';
        const excerpt = article.excerpt || 'Aucun résumé disponible.';
        const imageUrl = article.imageUrl || 'https://via.placeholder.com/300x200?text=Image+indisponible';
        const articleUrl = `/api/news/${article.id}`;  // Redirection vers l'URL avec l'ID de l'article

        articleCard.innerHTML = `
            <div class="card shadow-sm h-100">
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${excerpt}</p>
                    <a href="${articleUrl}" class="btn btn-primary mt-auto">Lire plus</a>
                </div>
            </div>
        `;
        
        container.appendChild(articleCard);
    });
}

// Fonction pour afficher un message d'erreur
function showError(message) {
    const container = document.getElementById('news-container');
    container.innerHTML = `<div class="alert alert-danger text-center">${message}</div>`;
}

document.addEventListener('DOMContentLoaded', fetchLatestNews);
