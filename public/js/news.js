async function fetchArticle() {
  const articleId = window.location.pathname.split('/').pop();

  try {
      const response = await fetch(`/api/news/${articleId}`);
      if (!response.ok) throw new Error('Erreur réseau');

      const article = await response.json();
      displayArticle(article);
  } catch (error) {
      document.getElementById('article-container').innerHTML = `
          <div class="alert alert-danger">Impossible de charger l'article</div>
      `;
  }
}

function displayArticle(article) {
  const container = document.getElementById('article-container');
  container.innerHTML = `
      <h1>${article.title}</h1>
      <img src="${article.imageUrl}" class="img-fluid">
      <p>${article.excerpt}</p>
  `;
}

document.addEventListener('DOMContentLoaded', fetchArticle);
