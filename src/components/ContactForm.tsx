import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Loader } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateField = (name) => {
    if (!formData[name] && touched[name]) {
      return 'This field is required';
    }
    if (name === 'email' && touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields immediately
    const nameError = !formData.name ? 'This field is required' : '';
    const emailError =
        !formData.email
            ? 'This field is required'
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                ? 'Please enter a valid email address'
                : '';
    const messageError = !formData.message ? 'This field is required' : '';

    // If there are any errors, mark all fields as touched to show error messages and return
    if (nameError || emailError || messageError) {
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTouched({ name: false, email: false, message: false });

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 rounded-lg border ${
                  validateField('name')
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                } focus:border-transparent focus:ring-2 transition-colors`}
                placeholder="Enter your name"
              />
              {validateField('name') && (
                <p className="mt-1 text-sm text-red-500">{validateField('name')}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 rounded-lg border ${
                  validateField('email')
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                } focus:border-transparent focus:ring-2 transition-colors`}
                placeholder="Enter your email"
              />
              {validateField('email') && (
                <p className="mt-1 text-sm text-red-500">{validateField('email')}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  validateField('message')
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                } focus:border-transparent focus:ring-2 transition-colors`}
                placeholder="Write your message here..."
              />
              {validateField('message') && (
                <p className="mt-1 text-sm text-red-500">{validateField('message')}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 bg-white rounded-lg shadow-lg p-4 flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-800">Message sent successfully!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;