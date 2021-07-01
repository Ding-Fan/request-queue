import React from "react";
import "./App.css";
import Container from "./components/Container";
import Dropdown from "./components/Dropdown";
import InfoPanel from "./components/InfoPanel";

function App() {
  return (
    <div className="bg-blue-sora h-screen w-screen">
      <Container left={<Dropdown />} right={<InfoPanel />} />
    </div>
  );
}

export default App;
