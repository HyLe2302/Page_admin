import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../config/Firebase";

const Test = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // 1. tạo reference đến collection "Article"
    const colRef = collection(db, "Article");

    // 2. fetch docs
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(colRef);
        // 3. map thành mảng object có id + data
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(list);
      } catch (err) {
        console.error("Lỗi khi lấy Article:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Danh sách Article</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id} style={{ marginBottom: 12 }}>
            <strong>{article.title}</strong><br/>
            <em>{article.subtitle}</em><br/>
            <p>{article.content}</p>
            {article.imageURL && (
              <img src={article.imageURL} alt={article.title} style={{ maxWidth: 200 }}/>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;