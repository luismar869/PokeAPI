import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

const Home   = lazy(() => import("./pages/Home"));
const Detalles = lazy(() => import("./pages/Detalles"));


const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Suspense fallback={<div className="p-10">Cargando...</div>}>
        <Routes>
          <Route path="/"       element={<Home />}   />
          <Route path="/detalles" element={<Detalles />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;