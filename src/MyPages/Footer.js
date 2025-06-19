import React from 'react'
import { FaLinkedin,FaFacebookSquare,FaInstagramSquare,FaTwitterSquare, FaGlobe } from "react-icons/fa";
import {Link,NavLink} from "react-router-dom"
import logo from '.././images/blacklogo.png'
import logo1 from '.././images/blacklogomirror.png'
import whitelogo from '.././images/whitelogo.png'
import whitelogo1 from '.././images/newwhitelogo.png'
import { useLanguage } from '../contexts/LanguageContext';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { currentLanguage, languages, changeLanguage, getCurrentLanguageInfo } = useLanguage();
  const { speak } = useSpeechSynthesis();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const handleLanguageChange = (languageCode) => {
    console.log('Footer: Attempting to change language to:', languageCode);
    changeLanguage(languageCode);
    speak({ text: `Language changed to ${languages.find(lang => lang.code === languageCode)?.nativeName}` });
  };

  return (
//     <div className='bg-gray-800'>
//     <div className='bg-gradient-to-t py-6 px-4 grid lg:grid-cols-2 gap-30 text-gray-200'>
//         <div>
//               <img className="h-8" src={logo} alt='logo'/>
//             <p className='block ml-5 mt-2'>
//             Empowering Abilities, Unlocking Potential: Education for All! <br></br>
//             Saarthi is designed in such a way that it is accessible to students with various difficulties, like visual, auditory etc. <br></br>
// </p>
//             <div className='flex justify-start mt-4 ml-5'>
//                 <FaFacebookSquare size={30}/>
//                 <FaLinkedin size={30}/>
//                 <FaInstagramSquare size={30}/>
//                 <FaTwitterSquare size={30}/>
//             </div>      
//         </div>
//     <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center justify-evenly">
//       <div className="lg:w-1/4 md:w-1/2 w-full px-2">
//         <h2 className="title-font font-medium text-white text-lg mb-3 underline">Quick Links</h2>
//         <nav className="list-none gap-2 mb-6">
//           <li>
//             <a className="text-white hover:text-gray-800 p-2 no-underline">About </a>
//           </li>
//           <li>
//             <a className="text-white hover:text-gray-800 p-2 no-underline"><Link to="/headlines" class="nav-link active">Headlines</Link></a>
//           </li>
//           <li>
//             <a className="text-white hover:text-gray-800 p-2 no-underline">Testimonials</a>
//           </li>
//         </nav>
//       </div>
//       <div className="lg:w-1/4 md:w-1/2 w-full">
//         <h2 className="title-font font-medium text-white tracking-widest text-lg mb-3 underline">Home</h2>
//         <nav className="list-none gap-2  mb-6">
//           <li>
//             <a className="text-white hover:text-gray-400 no-underline p-2" href='#'>Disclaimer</a>
//           </li>
//           <li>
//             <a className="text-white  hover:text-gray-500 no-underline p-2" href='#'><Link to="/govtpolicy" class="nav-link active">Government policies</Link></a>
//           </li>
//           <li>
//             <a className="text-white hover:text-gray-800 no-underline p-2"><Link to="/donation" class="nav-link active">Donate Us</Link></a>
//           </li>          
//         </nav>
//       </div>
//      </div>    
//     </div>
//     </div>
<>
<footer className={`footer p-10 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>  <div>
    <span className="footer-title">{t('services', 'Services')}</span> 
    <a className="hover:bg-lavender-dark" href='/coursecat'>{t('courses', 'Courses')}</a> 
    <a className="hover:bg-lavender-dark" href='/'>{t('teaching', 'Teaching')}</a> 
    <a className="hover:bg-lavender-dark" href='/'>{t('assessments', 'Assessments')}</a> 
    <a className="hover:bg-lavender-dark" href='/'>{t('materials', 'Materials')}</a>
  </div> 
  <div>
    <span className="footer-title">{t('company', 'Company')}</span> 
    <a className="hover:bg-lavender-dark" href='/aboutus'>{t('aboutus', 'About us')}</a> 
    <a className="hover:bg-lavender-dark" href=''>{t('contact', 'Contact')}</a> 
    <a className="hover:bg-lavender-dark" href='/popup'>{t('guide', 'Guide')}</a> 
  </div> 
  <div>
    <span className="footer-title">{t('legal', 'Legal')}</span> 
    <a className="hover:bg-lavender-dark" href=''>{t('terms', 'Terms of use')}</a> 
    <a className="hover:bg-lavender-dark" href=''>{t('privacy', 'Privacy policy')}</a> 
    <a className="hover:bg-lavender-dark" href=''>{t('cookies', 'Cookie policy')}</a>
  </div>  <div>
    <span className="footer-title">{t('language', 'Language')} / भाषा</span>
    <div className="text-sm mb-2 text-gray-500 dark:text-gray-400">
      {t('current', 'Current')}: {getCurrentLanguageInfo()?.nativeName} | {t('active', 'Active')}: {currentLanguage}
    </div>
    <div className="flex flex-col space-y-2">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageChange(language.code)}
          onMouseOver={() => speak({ text: `Switch to ${language.nativeName}` })}            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-left transition-colors ${
            currentLanguage === language.code
              ? 'bg-blue-600 text-white'
              : `hover:bg-gray-700 hover:text-white ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`
          }`}
        >
          <FaGlobe className="w-4 h-4" />
          <span>{language.nativeName}</span>          {currentLanguage === language.code && (
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
              {t('active', 'Active')}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
</footer>
<footer className={`footer px-10 py-4 border-t ${isDarkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>  <div className="items-center grid-flow-col">
    <img className="h-8" src={isDarkMode ? whitelogo : logo} alt='logo'/>
    <p>{t('tagline', 'Empowering Abilities,')} <br/> {t('taglineSecond', 'Unlocking Potential: Education for All')}</p>
    <img className="h-8" src={isDarkMode ? whitelogo1 : logo1} alt='logo mirror'/>
  </div>
  <div className="md:place-self-center md:justify-self-end">
    <div className="grid grid-flow-col gap-4">
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
    </div>
  </div>
</footer>
</>
  )
}

export default Footer