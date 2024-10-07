import React from "react";

const NewsCard = ({ article }) => {
  const { urlToImage, title, description, source, publishedAt, url } = article;

  const date = new Date(publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  return (
    <div className="card" onClick={() => window.open(url, "_blank")}>
      <div className="card-header">
        <img src={urlToImage} alt={title} className="news-img" />
      </div>
      <div className="card-content">
        <h3 className="news-title">{title}</h3>
        <h5 className="news-source">{`${source.name} · ${date}`}</h5>
        <p className="news-desc">{description}</p>
      </div>
    </div>
  );
};
export default NewsCard;
