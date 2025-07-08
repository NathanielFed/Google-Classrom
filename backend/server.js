require('dotenv').config();
console.log('🚀 Starting server...');

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000;

// ✅ Middleware (CORS, JSON)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ✅ Path to JSON metadata
const metadataFile = path.join(__dirname, 'data', 'files.json');

// ✅ Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  console.log('📥 File received:', req.file);

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
      message: 'File uploaded and metadata saved (JSON)',
      file: newFile
    });
  } catch (err) {
    console.error('❌ Error saving metadata:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
