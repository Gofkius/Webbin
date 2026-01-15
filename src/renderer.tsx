import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

createRoot(document.getElementById("root")!).render(
    <App />
);

window.addEventListener('keydown', (event) => {
  if (event.key === 'F1') {
    event.preventDefault();
    console.log('Opening new window...');
    
    // valid! TypeScript now knows this exists
    window.electronAPI.openNewWindow(); 
  }
});