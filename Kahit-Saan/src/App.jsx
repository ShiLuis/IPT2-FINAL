// In your App.js or relevant router file
import React from 'react';
import LandingPage from './pages/LandingPage'; // Adjust path as needed
import './App.css'; // Or your main CSS file where Tailwind is imported

function App() {
  return (
    <div>
      <LandingPage />
      {/* You can add Routes here for other pages like Admin Panel */}
    </div>
  );
}

export default App;