import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const ToolDownloader = lazy(() => import("./components/ToolDownloader"));
const About = lazy(() => import("./components/About"));



function App() {
  return (
    <Router>
      <div className="bg-gray-100">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ToolDownloader />
                  <About />
                </>
              }
            />
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;


//final changes