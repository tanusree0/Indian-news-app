
const apiKey = 'aab70c535447439f857011467f5fbbe5';
const newsApiUrl = 'https://newsapi.org/v2/everything';

async function getNews() {
    const place = document.getElementById('placeInput').value.trim();
    if (!place) {
        alert("Please enter a place.");
        return;
    }

    const url = `${newsApiUrl}?q=${place}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'ok' || data.articles.length === 0) {
            document.getElementById('newsContainer').innerHTML = '<p>No news found for this location.</p>';
            return;
        }

        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        alert('Failed to fetch news. Please try again later.');
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = ''; // Clear previous news

    articles.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('newsArticle');

        const title = document.createElement('h3');
        title.innerHTML = article.title;
        newsArticle.appendChild(title);

        const description = document.createElement('p');
        description.innerHTML = article.description || 'No description available.';
        newsArticle.appendChild(description);

        const readMoreLink = document.createElement('a');
        readMoreLink.href = article.url;
        readMoreLink.target = '_blank';
        readMoreLink.innerHTML = 'Read more';
        newsArticle.appendChild(readMoreLink);

        newsContainer.appendChild(newsArticle);
    });
}
