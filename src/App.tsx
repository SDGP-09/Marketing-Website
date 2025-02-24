import React from 'react';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ImageCarousel />
      <Features />
      <AboutUs />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;