// src/components/FileManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { Download, Delete, InsertDriveFile } from '@mui/icons-material';

const API_URL = 'http://localhost:4000';

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/files`);
      setFiles(res.data);
    } catch (err) {
      console.error('Failed to fetch files:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (filename) => {
    window.open(`${API_URL}/download/${filename}`, '_blank');
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`${API_URL}/delete/${filename}`);
      setFiles(files.filter(f => f.filename !== filename));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        📂 Submitted Files
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : files.length === 0 ? (
        <Typography>No files submitted yet.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {files.map(file => (
            <Paper key={file.filename} elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <InsertDriveFile color="primary" />
              <Box sx={{ flexGrow: 1 }}>
                <Typography noWrap variant="subtitle2">{file.filename}</Typography>
                <Typography variant="caption">{(new Date(file.uploadedAt)).toLocaleString()}</Typography>
              </Box>
              <Tooltip title="Download">
                <IconButton onClick={() => handleDownload(file.filename)}>
                  <Download />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => handleDelete(file.filename)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
