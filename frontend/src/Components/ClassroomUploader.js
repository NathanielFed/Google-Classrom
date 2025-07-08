import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './ClassroomUploader.css';

const ClassroomUploader = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', 'user123');
    formData.append('assignmentId', 'assign456');

    try {
      const res = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUploadStatus(data.message || 'Uploaded!');
    } catch (err) {
      setUploadStatus('Upload failed.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="upload-modal">
        <div className="modal-header">
          <span>Insert files using Google Drive</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="tab-bar">
          <span className="tab">RECENT</span>
          <span className="tab active">UPLOAD</span>
          <span className="tab">MY DRIVE</span>
          <span className="tab">STARRED</span>
        </div>

        <div className="upload-area" {...getRootProps()}>
          <input {...getInputProps()} />
          <CloudUploadIcon fontSize="large" style={{ fontSize: '40px', color: '#666' }} />
          <p className="text">Drag a file here</p>
          <p className="text">or</p>
          <button className="browse-btn">BROWSE</button>
        </div>

        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>CANCEL</button>
          <button className="upload-btn" onClick={handleUpload} disabled={!file}>UPLOAD</button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomUploader;