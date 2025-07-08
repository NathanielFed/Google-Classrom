import React, { useState } from 'react';
import ClassroomUploader from './components/ClassroomUploader';

function App() {
  const [showUploader, setShowUploader] = useState(true);

  return (
    <>
      {showUploader && <ClassroomUploader onClose={() => setShowUploader(false)} />}
    </>
  );
}

export default App;
