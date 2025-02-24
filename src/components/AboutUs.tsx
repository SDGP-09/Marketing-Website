import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin } from 'lucide-react';

const team = [
  {
    name: 'Akash Welgama',
    role: 'Lead Fullstack Developer',
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740411460/akash_f6recy.jpg',
    linkedin: 'https://www.linkedin.com/in/akash-welgama-682903298/',
    github: 'https://github.com/Akashwelgama'
  },
  {
    name: 'Ayendri Jayasekara',
    role: 'Fullstack Developer',
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740410278/WhatsApp_Image_2025-02-24_at_20.45.41_b4de00de_j9qmyc.jpg',
    linkedin: 'https://www.linkedin.com/in/ayendri-jayasekara-29a5a5269/',
    github: 'https://github.com/AyendriJayasekara'
  },
  {
    name: 'Lasith Hettiarachchi',
    role: 'Lead Fullstack Developer',
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740411633/lasith_mob2dt.jpg',
    linkedin: 'http://linkedin.com/in/lasith-ranishka',
    github: 'https://github.com/lasithLRI'
  },
  {
    name: 'Sadewni Paththamperuma',
    role: 'Fullstack Developer',
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740412419/photo_2024-03-27_11-58-46_iqommk.jpg',
    linkedin: 'https://www.linkedin.com/in/sadewni-paththamperuma-401221294/',
    github: 'https://github.com/sadewni08'
  },
  {
    name: 'Janith Yasiru Lakshitha',
    role: 'Fullstack Developer',
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740413639/WhatsApp_Image_2025-02-24_at_21.41.55_8f4518d5_gfdran.jpg',
    linkedin: 'https://www.linkedin.com/in/gamage-lakshitha-b82695294/',
    github: 'https://github.com/yasirulakshitha'
  },
  {
    name: 'Gayathma Basnayake',
    role: 'Fullstack Developer',
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1740411425/gayathma_jifat5.jpg',
    linkedin: 'https://www.linkedin.com/in/gayathma-basnayake-9453a8292/',
    github: 'https://github.com/Gayathma2003'
  }
];

const ProfileCard = ({ member, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
    >
      <div className="h-64 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
        <p className="text-gray-600 mb-4">{member.role}</p>
        <div className="flex justify-center space-x-4">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <section id="team" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <ProfileCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;