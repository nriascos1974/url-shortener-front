import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { ImBin, ImRedo2 } from "react-icons/im";


function UrlList() {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  // Fetch URLs from the API when the component mounts
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

  // Function to handle redirection
  const handleRedirect = async (shortUrl) => {
    try {
      const response = await axios.get(`/api/${shortUrl}`);
      
      // Usamos console.log para inspeccionar la respuesta
      console.log("Response from API:", response.data);
  
      // Verifica si la respuesta contiene una URL válida para redirigir
      if (response.data.url && typeof response.data.url === "string") {
        window.location.href = response.data.url; // Redirige a la URL devuelta
      } else {
        console.error("Invalid URL in response:", response.data);
      }
    } catch (error) {
      console.error("Error retrieving URL:", error);
    }
  };
  
  

  // Function to handle deletion of a URL
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

  // Function to handle adding a new URL
  const handleAddNewUrl = () => {
    navigate('/create');  // Redirige a /create
  };
  
  return (
    <div className="container">
  <div className="header">
    <h1>Shortened URLs</h1>
    <button onClick={handleAddNewUrl} className="add-button">
      Add New URL
    </button>
  </div>

  <table className="styled-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Original URL</th>
        <th>Short URL</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {urls.map((url) => (
        <tr key={url.id}>
          <td>{url.id}</td>
          <td>{url.original_url}</td>
          <td>{`/${url.short_url}`}</td>
          <td>
            <button onClick={() => handleRedirect(url.short_url)} className="action-button go-button">
            {<ImRedo2 />}
            </button>
            <button onClick={() => handleDelete(url.id)} className="action-button delete-button">
              {<ImBin />}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default UrlList;
