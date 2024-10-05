const apiKey = "0ab89508285743fd92e9e78d2b95f818";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
  input.value = "";
  fetchNews("India");
});

async function fetchNews(query) {
  try {
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    // console.log("Data fetched:", data); // Log the fetched data
    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";
  //   console.log("Articles to bind:", articles); // Log the articles to bind
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsTemplate.content.cloneNode(true);
    dataFill(cardClone, article);
    cardsContainer.appendChild(cardClone); // Append the cloned card to the container
  });
}

function dataFill(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} | ${date}`;
  //   console.log("Card filled with data:", article); // Log the article data
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
function onNavItemClick(query) {
  fetchNews(query);
}

const searchBtn = document.getElementById("search-btn");
const input = document.getElementById("news-input");
searchBtn.addEventListener("click", () => {
  const newQuery = input.value;
  if (!query) return;
  fetchNews(newQuery);
});
function reload() {
  window.location.reload();
}
