import React from "react";
import FileSharing from "./components/FileSharing"; // Import FileSharing component

const App: React.FC = () => {
  return (
    <div className="app-container">
      <FileSharing /> {/* Render FileSharing component */}
    </div>
  );
};

export default App;
