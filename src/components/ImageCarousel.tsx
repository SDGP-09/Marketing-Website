import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740420697/Con_2_izwoun.png',
  'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740420697/con_1_eguubf.png',
  'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740420696/Con_3_chrzwl.png',
  'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740420696/Con_5_f9oozn.png',
  'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740420695/Con_4_delz80.png',
  'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740420948/54205924261_e67c602dc6_k_pnzcyv.jpg',
  'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740420947/49397860276_3e32dbac31_o_dkoskm.jpg',
];

const captions = [
  'Building Tomorrow\'s Infrastructure',
  'Connecting Construction Teams',
  'Streamlined Project Management',
  'Real-time Collaboration',
  'Smart Construction Solutions',
  'Digital Construction Management',
  'Future of Construction',
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          // transition: 'transform 0.1s linear'
        }}
      >
        <AnimatePresence>
          <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // transition={{ duration: 1, times: [0, 0.5, 1] }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-400/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-1/4 left-0 right-0 text-center text-white z-10">
        <motion.h2
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-4xl font-bold mb-8"
        >
          {captions[currentIndex]}
        </motion.h2>

        <Link
          to="features"
          spy={true}
          smooth={true}
          duration={500}
          className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          Join the Revolution!
        </Link>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;