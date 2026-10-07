import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";

// Componentes provisorios para las otras rutas
const Estudiantes = () => <h2>Estudiantes (JSON)</h2>;
const Hechizos = () => <h2>Hechizos (API Externa)</h2>;
const ArbolComponentes = () => <h2>Árbol de Componentes</h2>;
const Bitacora = () => <h2>Bitácora de Desarrollo</h2>;

// Perfiles de integrantes
const AlejandroProfile = () => <h2>Perfil de Alejandro</h2>;
const DanielaProfile = () => <h2>Perfil de Daniela</h2>;
const JuanPabloProfile = () => <h2>Perfil de Juan Pablo</h2>;
const LucasProfile = () => <h2>Perfil de Lucas</h2>;
const SolProfile = () => <h2>Perfil de Sol</h2>;

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout-hallows d-flex">
        <Sidebar />
        <main className="main-content flex-grow-1 d-flex flex-column min-vh-100">
          <div className="flex-grow-1 p-4">
            <Routes>
              {/* Ruta principal mapeada a la vista Home */}
              <Route path="/" element={<Home />} />

              {/* Rutas de integrantes */}
              <Route path="/perfil/alejandro" element={<AlejandroProfile />} />
              <Route path="/perfil/daniela" element={<DanielaProfile />} />
              <Route path="/perfil/juanpablo" element={<JuanPabloProfile />} />
              <Route path="/perfil/lucas" element={<LucasProfile />} />
              <Route path="/perfil/sol" element={<SolProfile />} />

              {/* Rutas de secciones */}
              <Route path="/arbol" element={<ArbolComponentes />} />
              <Route path="/estudiantes" element={<Estudiantes />} />
              <Route path="/hechizos" element={<Hechizos />} />
              <Route path="/bitacora" element={<Bitacora />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
}
