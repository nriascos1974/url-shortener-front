import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Asegúrate de que este archivo CSS esté en el mismo directorio o ajusta la ruta según sea necesario.
import { useNavigate } from 'react-router-dom';

function CreateUrl() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/url', { original_url: url });
      setShortUrl(response.data.short_url);
      navigate('/urls');
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Create New URL</h1>
      </div>
      <form onSubmit={handleSubmit} className="url-form">
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Enter Original URL" 
          required
          className="url-input"
        />
        <button type="submit" className="add-button">
          CREATE
        </button>
      </form>
      {shortUrl && <p className="short-url">Shortened URL: <a href={`/${shortUrl}`} target="_blank" rel="noopener noreferrer">{`/${shortUrl}`}</a></p>}
    </div>
  );
}

export default CreateUrl;

