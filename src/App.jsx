import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";
import { MemberProfileContainer } from "./pages/members/MemberProfileContainer";

// Componentes provisorios para las otras rutas
const Estudiantes = () => <h2>Estudiantes (JSON)</h2>;
const Hechizos = () => <h2>Hechizos (API Externa)</h2>;
const ArbolComponentes = () => <h2>Árbol de Componentes</h2>;
const Bitacora = () => <h2>Bitácora de Desarrollo</h2>;

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout-hallows d-flex">
        <Sidebar />
        <main className="main-content flex-grow-1 d-flex flex-column min-vh-100 p-0 m-0">
          <div className="flex-grow-1 d-flex flex-column w-100 p-0 m-0">
            <Routes>
              {/* Ruta principal mapeada a la vista Home */}
              <Route path="/" element={<Home />} />

              {/* Ruta dinámica de integrantes: /perfil/lucas, /perfil/sol… */}
              <Route path="/perfil/:id" element={<MemberProfileContainer />} />

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
