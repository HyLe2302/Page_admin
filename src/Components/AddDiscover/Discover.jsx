import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from './../../config/Firebase';
import './Discover.css';

const Discover = () => {
    const [articles, setArticles] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);  
    const [formType, setFormType] = useState(""); 
       
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

  
    useEffect(() => {
      const unsubArt = onSnapshot(
        collection(db, 'Article'),
        snap => {
          const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          console.log("hahah",data);
          setArticles(data);
          setLoading(false);
        },
        err => {
          console.error('articles error:', err);
          setError('Không tải được articles');
          setLoading(false);
        }
      );
  
      const unsubDest = onSnapshot(
        collection(db, 'Destination'),
        snap => {
          const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setDestinations(data);
        },
        err => {    
          console.error('destinations error:', err);
          setError('Không tải được destinations');
        }
      );
  
      return () => {
        unsubArt();
        unsubDest();
      };
    }, []);
  
    const handleAdd = (type) => {
        setFormType(type);    // Set form type (Article or Destination)
        setShowForm(true);     // Show the form
    };

    
    const handleEdit = (type, id) => {
        console.log(`Sửa ${type} với ID: ${id}`);
    };
    
    const handleDelete = (type, id) => {
        console.log(`Xóa ${type} với ID: ${id}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formType === "Article") {
                await addDoc(collection(db, "Article"), {
                    title,
                    author,
                    imageURL,
                });
            } else if (formType === "Destination") {
                await addDoc(collection(db, "Destination"), {
                    city,
                    country,
                    imageURL,
                });
            }

            // Clear the form after submission
            setTitle("");
            setAuthor("");
            setImageURL("");
            setCity("");
            setCountry("");
            setShowForm(false);  // Close the form after submitting
        } catch (err) {
            console.error("Lỗi khi thêm:", err);
            setError("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };
  
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div className="discover">
        <div className="table-container">
          <h3>Articles</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author}</td>
                  <td>
                    {a.imageURL && <img src={a.imageURL} alt={a.title} />}
                  </td>
                  <td className="actions">
                    <button className="action-btn add" onClick={() => handleAdd('Article')}>Add</button>
                    
                    <button className="action-btn edit" onClick={() => handleEdit('Article', a.id)}>Edit</button>
                    <button className="action-btn delete" onClick={() => handleDelete('Article', a.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-container">
          <h3>Destinations</h3>
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Country</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map(d => (
                <tr key={d.id}>
                  <td>{d.city}</td>
                  <td>{d.country}</td>
                  <td>
                    {d.imageURL && <img src={d.imageURL} alt={d.city} />}
                  </td>
                  <td className="actions">
                    <button className="action-btn add" onClick={() => handleAdd('Destination')}>Add</button>
                    <button className="action-btn edit" onClick={() => handleEdit('Destination', d.id)}>Edit</button>
                    <button className="action-btn delete" onClick={() => handleDelete('Destination', d.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* Form to Add Article or Destination */}
        {showForm && (
            <div className="form-overlay">
                <div className="form-container">
                    <h2>{formType === "Article" ? "Thêm Article" : "Thêm Destination"}</h2>
                    <form onSubmit={handleSubmit}>
                        {formType === "Article" && (
                            <>
                                <div>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Author:</label>
                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {formType === "Destination" && (
                            <>
                                <div>
                                    <label>City:</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Country:</label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div>
                            <label>Image URL:</label>
                            <input
                                type="text"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                            />
                        </div>
                        <button type="submit">Lưu</button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                        >
                            Hủy
                        </button>
                    </form>
                </div>
            </div>
        )}

        {showForm && (
            <div className="form-overlay">
                <div className="form-container">
                    <h2>{formType === "Article" ? "Sửa Article" : "Sửa Destination"}</h2>
                    <form onSubmit={handleSubmit}>
                        {formType === "Article" && (
                            <>
                                <div>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Author:</label>
                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {formType === "Destination" && (
                            <>
                                <div>
                                    <label>City:</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Country:</label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div>
                            <label>Image URL:</label>
                            <input
                                type="text"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                            />
                        </div>
                        <button type="submit">Lưu</button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                        >
                            Hủy
                        </button>
                    </form>
                </div>
            </div>
        )}
      </div>
    );
  };
  
  export default Discover;