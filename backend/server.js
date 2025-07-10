require('dotenv').config();
console.log('🚀 Starting server...');

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000;

// ✅ CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Multer config with file filter and size limit
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.docx', '.doc', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: pdf, docx, doc, jpg, jpeg, png'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

const metadataFile = path.join(__dirname, 'data', 'files.json');

// ✅ Upload route
app.post('/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Upload failed: ' + err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newFile = {
      filename: req.file.filename,
      path: req.file.path,
      url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
      userId: req.body.userId || 'temp-user',
      assignmentId: req.body.assignmentId || 'temp-assignment',
      uploadedAt: new Date().toISOString()
    };

    try {
      let existing = [];
      if (fs.existsSync(metadataFile)) {
        const raw = fs.readFileSync(metadataFile);
        existing = JSON.parse(raw);
      }

      existing.push(newFile);
      fs.writeFileSync(metadataFile, JSON.stringify(existing, null, 2));

      res.status(200).json({
        message: '✅ File uploaded and metadata saved',
        file: newFile
      });
    } catch (err) {
      console.error('❌ Error saving metadata:', err);
      res.status(500).json({ message: 'Upload failed', error: err.message });
    }
  });
});

// ✅ Download route
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, err => {
      if (err) {
        console.error("❌ Download error:", err);
        res.status(500).json({ message: "Download failed" });
      }
    });
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

// ✅ Delete route
app.delete('/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    let metadata = [];
    if (fs.existsSync(metadataFile)) {
      const raw = fs.readFileSync(metadataFile, 'utf-8');
      metadata = JSON.parse(raw);
    }

    const updated = metadata.filter(file => file.filename !== filename);
    fs.writeFileSync(metadataFile, JSON.stringify(updated, null, 2));

    res.status(200).json({ message: '✅ File deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

// ✅ List files
app.get('/files', (req, res) => {
  if (fs.existsSync(metadataFile)) {
    const data = fs.readFileSync(metadataFile, 'utf-8');
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(200).json([]);
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});







