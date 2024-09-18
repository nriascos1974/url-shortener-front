import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { ImBin, ImRedo2 } from "react-icons/im";

function UrlList() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar el mensaje "Wait a moment"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get("/api/urls");
        setUrls(response.data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchUrls();
  }, []);

  const handleRedirect = async (shortUrl) => {
    try {
      setLoading(true); // Activamos el estado de carga
      const response = await axios.get(`api/url/${shortUrl}`);
      
      if (response.data.original_url && typeof response.data.original_url === "string") {
        
        setTimeout(() => {
          setLoading(false); // Desactivamos el estado de carga
          window.location.href = response.data.original_url; // Redirigimos después de 3 segundos
        }, 3000); // Esperar 3 segundos
      } else {
        console.error("Invalid URL in response:", response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error retrieving URL:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this URL?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/api/url/${id}`);
        setUrls(urls.filter((url) => url.id !== id));
      } catch (error) {
        console.error("Error deleting URL:", error);
      }
    }
  };

  const handleAddNewUrl = () => {
    navigate("/create");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Shortened URLs</h1>
        <button onClick={handleAddNewUrl} className={styles.addButton}>
          Add New URL
        </button>
      </div>

      {loading ? (
        <div className={styles.waitMessage}>
          <p>Wait a moment, you will be redirected shortly...</p>
        </div>
      ) : (
        <table className={styles.styledTable}>
          <thead>
            <tr className={styles.styledTableTheadTr}>
              <th className={styles.styledTableTh}>ID</th>
              <th className={styles.styledTableTh}>Original URL</th>
              <th className={styles.styledTableTh}>Short URL</th>
              <th className={styles.styledTableTh}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr
                key={url.id}
                className={`${styles.styledTableTbodyTr} ${
                  url.id % 2 === 0 ? styles.styledTableTbodyTrEven : ""
                }`}
              >
                <td className={styles.styledTableTd}>{url.id}</td>
                <td className={styles.styledTableTd}>{url.original_url}</td>
                <td className={styles.styledTableTd}>{`/${url.short_url}`}</td>
                <td className={styles.actionButtons}>
                  <button
                    onClick={() => handleRedirect(url.short_url)}
                    className={styles.goButton}
                  >
                    {<ImRedo2 />}
                  </button>
                  <button
                    onClick={() => handleDelete(url.id)}
                    className={styles.deleteButton}
                  >
                    {<ImBin />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UrlList;
