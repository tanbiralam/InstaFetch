import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const MultiPlatformDownloader = lazy(() => import("./components/MultiPlatformDownloader"));
const About = lazy(() => import("./components/About"));
const FAQs = lazy(() => import("./components/FAQs"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-white via-pastel-blue/5 to-pastel-purple/10">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 rounded-full border-4 border-pastel-blue border-t-transparent animate-spin"></div>
          </div>
        }>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  {/* Hero Section */}
                  <section className="pt-20 pb-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2 space-y-6 text-center md:text-left">
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pastel-blue to-pastel-purple">
                            Download Social Media Content Effortlessly
                          </h1>
                          <p className="text-lg text-gray-700 max-w-lg">
                            The ultimate platform for downloading high-quality videos, photos, and more from Instagram, YouTube, Facebook and Twitter.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a 
                              href="#downloader"
                              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-pastel-blue to-pastel-purple text-white font-medium shadow-md hover:shadow-lg transition-all"
                            >
                              Start Downloading
                            </a>
                            <a 
                              href="#features"
                              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-pastel-gray/30 text-gray-700 font-medium shadow-sm hover:shadow-md transition-all"
                            >
                              Learn More
                            </a>
                          </div>
                        </div>
                        <div className="md:w-1/2">
                          <div className="relative">
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pastel-blue to-pastel-purple opacity-30 blur-xl"></div>
                            <div className="relative rounded-2xl bg-white p-4 shadow-xl">
                              <img 
                                src="/hero-illustration.svg" 
                                alt="Social Media Downloader" 
                                className="w-full h-auto"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://placehold.co/600x400/pastel-blue/white?text=InstaFetch";
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  
                  {/* Downloader Section */}
                  <section id="downloader" className="py-16">
                    <MultiPlatformDownloader />
                  </section>
                  
                  {/* About Section */}
                  <section id="about" className="py-16 bg-gradient-to-br from-pastel-blue/10 to-pastel-purple/10">
                    <About />
                  </section>
                  
                  {/* FAQs Section */}
                  <section id="faqs" className="py-16">
                    <div className="container mx-auto max-w-4xl">
                      <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pastel-blue to-pastel-purple">
                        Frequently Asked Questions
                      </h2>
                      <FAQs />
                    </div>
                  </section>
                </main>
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