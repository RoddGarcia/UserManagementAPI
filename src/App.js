import "./styles.css";
import AdicionarUsuario from "./AdicionarUsuario";
import Home from "./Home";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="menuBar">
          <h5>Matheus Barbosa e Rodrigo Garcia - 02J11 - SI 2° SEMESTRE</h5>
          <h1>Employee Manager</h1>
          <div className="btns">
            <Link to="/" href="#" className="btn">
              Home
            </Link>
            <Link to="/AdicionarUsuario" className="btn">
              Add Employee
            </Link>
          </div>
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AdicionarUsuario" element={<AdicionarUsuario />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
