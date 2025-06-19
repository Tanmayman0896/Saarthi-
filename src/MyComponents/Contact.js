import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import feedimg from './../images/feedback.png'
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
// import { feedbackService } from '../services/feedbackService'; // Uncomment if you want to store feedback in Firestore

const Contact = () => {
  const form = useRef();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error(t('nameRequired', 'Name is required'));
      return false;
    }
    if (!formData.email.trim()) {
      toast.error(t('emailRequired', 'Email is required'));
      return false;
    }
    if (!formData.message.trim()) {
      toast.error(t('messageRequired', 'Feedback message is required'));
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t('invalidEmail', 'Please enter a valid email address'));
      return false;
    }
    return true;
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Show loading toast
    const loadingToast = toast.loading(t('submittingFeedback', 'Submitting your feedback...'));

    try {
      // Send email via EmailJS
      const result = await emailjs.sendForm(
        'service_v6z4web', 
        'template_71rki5m', 
        form.current, 
        'WBsHhIONN4glZMqDK'
      );
      
      console.log('Feedback sent successfully via email:', result.text);
      
      // Optionally save to Firestore (uncomment the lines below if you want to store feedback in database)
      /*
      try {
        await feedbackService.saveFeedback({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          source: 'website_contact_form'
        });
        console.log('Feedback also saved to Firestore');
      } catch (firestoreError) {
        console.error('Failed to save to Firestore, but email sent successfully:', firestoreError);
      }
      */
      
      // Hide loading toast
      toast.dismiss(loadingToast);
      
      // Show success popup
      toast.success(
        t('feedbackReceived', 'Feedback received! Thank you for your valuable input.'),
        {
          duration: 4000,
          icon: '✅',
          style: {
            background: isDarkMode ? '#374151' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
          },
        }
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset form reference
      form.current.reset();
      
    } catch (error) {
      console.error('Error sending feedback:', error.text);
      
      // Hide loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      toast.error(
        t('feedbackError', 'Failed to send feedback. Please try again later.'),
        {
          duration: 4000,
          icon: '❌',
          style: {
            background: isDarkMode ? '#374151' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };return (
    <form ref={form} onSubmit={sendEmail}>
      <section className={`body-font relative transition-colors duration-300 ${isDarkMode ? 'text-gray-100 bg-gray-900' : 'text-gray-600 bg-white'}`}>
        <div className="container px-5 py-4 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 mt-2 md:mb-0">
            <img className="object-cover object-center rounded" alt="feedback" src={feedimg}></img>
          </div>
          <div className={`lg:w-1/2 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 md:mt-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <h2 className={`text-2xl text-center mb-4 font-bold title-font ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {t('feedbackForm', 'Feedback Form')}
            </h2>
            <p className={`leading-relaxed text-center mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('feedbackDescription', 'We value your feedback! Help us improve our platform.')}
            </p>
            
            <div className="relative mb-4">
              <label htmlFor="name" className={`leading-7 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('name', 'Name')} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600' 
                    : 'bg-gray-100 border-gray-300 text-gray-700 focus:bg-white'
                }`}
                placeholder={t('enterName', 'Enter your name')}
              />
            </div>
            
            <div className="relative mb-4">
              <label htmlFor="email" className={`leading-7 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('email', 'Email')} <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600' 
                    : 'bg-gray-100 border-gray-300 text-gray-700 focus:bg-white'
                }`}
                placeholder={t('enterEmail', 'Enter your email')}
              />
            </div>
            
            <div className="relative mb-4">
              <label htmlFor="message" className={`leading-7 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('feedbackMessage', 'Feedback Message')} <span className="text-red-500">*</span>
              </label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleInputChange}
                required
                className={`w-full rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600' 
                    : 'bg-gray-100 border-gray-300 text-gray-700 focus:bg-white'
                }`}
                placeholder={t('enterFeedback', 'Share your thoughts, suggestions, or report issues...')}
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`text-white border-0 py-3 px-8 focus:outline-none rounded text-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                isSubmitting 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : isDarkMode 
                    ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl' 
                    : 'bg-indigo-500 hover:bg-indigo-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('submitting', 'Submitting...')}
                </span>
              ) : (
                t('submitFeedback', 'Submit Feedback')
              )}
            </button>
          </div>
        </div>
      </section>
    </form>
  )
}

export default Contact