import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Building2 } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const carouselHeight = window.innerHeight * 0.7;
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
      setShowFloatingButton(scrollPosition > carouselHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-green-500" />
            <span className={`text-2xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              CiviLink
            </span>
          </div>
          
          <div className="flex items-center space-x-8">
            {['features', 'team', 'contact'].map((item) => (
              <Link
                key={item}
                to={item}
                spy={true}
                smooth={true}
                duration={500}
                className={`cursor-pointer relative group ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                <span className="capitalize">
                  {item === 'team' ? 'Development Team' : item}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {showFloatingButton && (
        <Link
          to="features"
          spy={true}
          smooth={true}
          duration={500}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in-down"
        >
          Join the Revolution!
        </Link>
      )}
    </>
  );
};

export default Navbar;