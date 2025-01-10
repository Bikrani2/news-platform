document.getElementById('create-article-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const excerpt = document.getElementById('excerpt').value;
  const imageUrl = document.getElementById('imageUrl').value;

  if (!title || !excerpt) {
      alert('Le titre et l\'extrait sont obligatoires');
      return;
  }

  try {
      const response = await fetch('/api/news', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, excerpt, imageUrl })
      });

      if (!response.ok) throw new Error('Erreur lors de la création de l\'article');
      
      alert('Article créé avec succès!');
      window.location.href = '/news.html'; // Redirection vers la liste des articles
  } catch (error) {
      alert(error.message);
  }
});
