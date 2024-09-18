import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
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
      navigate('/');
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Create New URL</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.urlForm}>
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Enter Original URL" 
          required
          className={styles.urlInput}
        />
        <button type="submit" className={styles.addButton}>
          CREATE
        </button>
      </form>
      {shortUrl && (
        <p className={styles.shortUrl}>
          Shortened URL: <a href={`/${shortUrl}`} target="_blank" rel="noopener noreferrer" className={styles.shortUrlLink}>{`/${shortUrl}`}</a>
        </p>
      )}
    </div>
  );
}

export default CreateUrl;
