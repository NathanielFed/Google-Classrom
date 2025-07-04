import React, { useRef } from "react";

const FileUploader = () => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Selected: ${file.name}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        <span style={styles.tab}>Recent</span>
        <span style={{ ...styles.tab, ...styles.activeTab }}>Upload</span>
        <span style={styles.tab}>My Drive</span>
        <span style={styles.tab}>Shared drives</span>
        <span style={styles.tab}>Starred</span>
      </div>

      <div style={styles.uploadBox} onClick={handleClick}>
        <p>Drag files here</p>
        <p>— or —</p>
        <button style={styles.selectButton}>Select files from your device</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <div style={styles.footer}>
        <button style={styles.upload}>Upload</button>
        <button style={styles.cancel}>Cancel</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "600px",
    margin: "50px auto",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontFamily: "Arial, sans-serif",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    paddingBottom: "20px",
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid #ccc",
    padding: "10px 20px",
    gap: "20px",
  },
  tab: {
    cursor: "pointer",
    color: "#555",
  },
  activeTab: {
    color: "#1a73e8",
    fontWeight: "bold",
    borderBottom: "2px solid #1a73e8",
  },
  uploadBox: {
    padding: "40px",
    textAlign: "center",
    border: "2px dashed #ccc",
    margin: "30px 40px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  selectButton: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 40px",
    gap: "10px",
  },
  upload: {
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancel: {
    backgroundColor: "#f1f3f4",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default FileUploader;





