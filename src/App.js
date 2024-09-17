import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UrlList from "./components/pages/UrlList/UrlList";
import CreateUrl from "./components/pages/CreateUrl/CreateUrl";

function App() {
  return (
    <Router>
      <Routes>
        {/* La página de lista será la página de inicio */}
        <Route path="/" element={<UrlList />} />
        {/* La pagina para crear URLs short */}
        <Route path="/create" element={<CreateUrl />} />
      </Routes>
    </Router>
  );
}

export default App;
