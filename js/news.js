// news.js
const keyApi = "5ea831159ea585a0dc4df3a5630e0921";
const newsUrl = `https://gnews.io/api/v4/search?q=example&max=5&apikey=${keyApi}`;

async function loadNews() {
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        if (response.ok) {
            displayNews(data.articles);
        } else {
            document.getElementById('newsContainer').innerHTML = data.message || "Error loading news";
        }
    } catch (error) {
        document.getElementById('newsContainer').innerHTML = "Error fetching news data";
    }
}

function displayNews(articles) {

    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = articles.map(article => 
        `<div class="news-article">
            <h2><u>${article.title}</u> </h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank" style= color:white; text-decoration-color:white;>Read more</a>
        </div>`
        ).join('');
}

loadNews();
