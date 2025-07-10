import React, { useState } from 'react';
import ClassroomUploader from './components/ClassroomUploader';
import FileList from './components/FileList';

function App() {
  const [showUploader, setShowUploader] = useState(true);

  return (
    <>
      {showUploader && <ClassroomUploader onClose={() => setShowUploader(false)} open={showUploader} />}
      <FileList />
    </>
  );
}

export default App;


