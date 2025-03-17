import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, ProjectorIcon, Key, LayoutGrid } from 'lucide-react';
import { Link } from 'react-scroll';

const features = [
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Streamline your construction projects with our comprehensive project management tools. Track progress, manage resources, and meet deadlines efficiently.Project Management tools are designed to help construction companies efficiently plan, execute, and monitor their projects. With real-time progress tracking, resource allocation, and deadline management, businesses can stay on top of every detail. Our platform enables seamless collaboration between contractors, consultants, and stakeholders, ensuring smooth communication and coordination. ',
    icon: ProjectorIcon,
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1742229659/002_pq2ful.jpg'
  },
  {
    id: 'messaging',
    title: 'Interplatform Messaging',
    description: 'Keep your team connected with real-time messaging across all platforms. Share updates, files, and collaborate seamlessly.keeping our team connected across web and mobile. Sharing updates instantly, exchanging critical project files',
    icon: MessageSquare,
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1742229658/004_hjxte2.jpg'
  },
  {
    id: 'tender',
    title: 'Tender Management',
    description: 'Simplify your tender process with our advanced management system. Create, track, and evaluate tenders all in one place.Our system enables businesses to publish tenders, receive bids from qualified contractors, and compare proposals efficiently. With real-time updates and automated tracking, stakeholders can stay informed about deadlines, bid evaluations, and approvals. Whether you’re a project owner seeking the best contractor or a contractor looking for new opportunities, CiviLink simplifies tendering, enhances transparency, and ensures a smooth, competitive bidding process.',
    icon: LayoutGrid,
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1742233415/09_u61usi.jpg'
  },
  {
    id: 'auth',
    title: 'Company-Based Authentication',
    description: 'Secure your project data with our robust company-based authentication system. Control access and maintain data privacy.CiviLink ensures secure access control with a robust company-based authentication system, protecting your project data from unauthorized access. Businesses can manage user roles, set permissions, and restrict sensitive information to authorized personnel only.   \n' +
        'This system enhances data privacy and security, ensuring that only verified team members can access critical project details. ',
    icon: Key,
    image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1742229659/003_y5pfoy.jpg'
  }
];

const FeatureTile = ({ feature, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
      <Link to={`feature-${feature.id}`} spy={true} smooth={true} duration={500} offset={-100}>
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6 h-48 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <feature.icon className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
          </div>
        </motion.div>
      </Link>
  );
};

const FeatureSection = ({ feature, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
      <motion.div
          id={`feature-${feature.id}`}
          ref={ref}
          className="py-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <div className={`flex flex-col md:flex-row items-center ${isEven ? '' : 'md:flex-row-reverse'} gap-8`}>
            <motion.div className="w-full md:w-1/2" initial={{ x: isEven ? -100 : 100, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <img src={feature.image} alt={feature.title} className="rounded-lg shadow-xl w-full h-[400px] object-cover" />
            </motion.div>
            <motion.div className="w-full md:w-1/2" initial={{ x: isEven ? 100 : -100, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{feature.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
  );
};

// const YouTubeVideo = () => {
//   return (
//       <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
//         <iframe
//             width="100%"
//             height="500"
//             src="https://www.youtube.com/embed/sKpPPVqj7LY"
//             title="YouTube Video"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//         ></iframe>
//       </div>
//   );
// };


const YouTubeVideo = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player;

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player('youtube-player', {
        videoId: 'sKpPPVqj7LY',
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onReady: () => setVideoLoaded(true)
        }
      });
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!videoLoaded) return;

    const player = window.YT.get('youtube-player');
    if (!player) return;

    if (inView) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }, [inView, videoLoaded]);

  return (
      <div ref={ref} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
        <div id="youtube-player" className="w-full h-[500px]" />
      </div>
  );
};



const Features = () => {
  return (
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
                <FeatureTile key={feature.id} feature={feature} index={index} />
            ))}
          </div>
          {features.map((feature, index) => (
              <FeatureSection key={feature.id} feature={feature} index={index} />
          ))}
          <div className="mt-20">
            <YouTubeVideo />
          </div>
        </div>
      </section>
  );
};

export default Features;

