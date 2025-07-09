import React from 'react';
import Stream from '../Components/Stream'; // adjust path if needed

export default function StreamTest() {
  // Hardcoded test classId — use a real one from your DB
  const testClassId = "686683e379f1cbee44feed3c";

  return (
    <div>
      <h1>📢 Test Stream</h1>
      <Stream classId={testClassId} />
    </div>
  );
}