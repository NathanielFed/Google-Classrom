import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, IconButton, Tooltip, Avatar
} from "@mui/material";
import { Download, Delete } from "@mui/icons-material";

export default function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/files")
      .then(res => res.json())
      .then(setFiles)
      .catch(err => console.error("❌ Error fetching files:", err));
  }, []);

  const handleDownload = (filename) => {
    window.open(`http://localhost:4000/download/${filename}`, "_blank");
  };

  const handleDelete = async (filename) => {
    if (!window.confirm("Delete this file?")) return;

    try {
      const res = await fetch(`http://localhost:4000/delete/${filename}`, { method: "DELETE" });
      if (res.ok) {
        setFiles(prev => prev.filter(file => file.filename !== filename));
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  const getFileIconOrPreview = (file) => {
    const ext = file.filename.split('.').pop().toLowerCase();
    const imageExts = ['jpg', 'jpeg', 'png'];

    if (imageExts.includes(ext)) {
      return (
        <Avatar
          variant="rounded"
          src={`http://localhost:4000/uploads/${file.filename}`}
          alt="preview"
          sx={{ width: 40, height: 40, mr: 2 }}
        />
      );
    }

    const emojiMap = {
      pdf: "📕",
      docx: "📄",
      doc: "📄",
      pptx: "📊",
      xlsx: "📊",
      txt: "📜",
      zip: "🗜️"
    };

    return (
      <Box sx={{ fontSize: 24, width: 40, textAlign: "center", mr: 2 }}>
        {emojiMap[ext] || "📁"}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>📁 Submitted Files</Typography>

      {files.length === 0 ? (
        <Typography>No uploaded files yet.</Typography>
      ) : (
        files.map((file, i) => (
          <Paper key={i} elevation={1} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2, py: 1,
            mb: 1,
            borderRadius: 2,
            backgroundColor: "#fff"
          }}>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, overflow: "hidden" }}>
              {getFileIconOrPreview(file)}
              <Typography
                variant="body1"
                noWrap
                sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {file.filename}
              </Typography>
            </Box>

            <Box>
              <Tooltip title="Download">
                <IconButton color="primary" onClick={() => handleDownload(file.filename)}>
                  <Download />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton color="error" onClick={() => handleDelete(file.filename)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
}



