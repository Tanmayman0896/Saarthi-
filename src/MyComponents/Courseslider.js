import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import math from './../images/maths.png';
import sci from './../images/sci.png';
import eng from './../images/eng.png';
import hin from './../images/hin.png';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Courseslider() {
  const { speak } = useSpeechSynthesis();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const subjects = [
    {
      name: t('science', 'Science'),
      description: '',
      imageSrc: sci,
      imageAlt: 'Science image',
      href: '/coursecat',
    },
    {
      name: t('mathematics', 'Mathematics'),
      description: '',
      imageSrc: math,
      imageAlt: '',
      href: '/coursecat',
    },
    {
      name: t('english', 'English'),
      description: '',
      imageSrc: eng,
      imageAlt: '',
      href: '/coursecat',
    },
    {
      name: t('hindi', 'Hindi'),
      description: '',
      imageSrc: hin,
      imageAlt: '',
      href: '/coursecat',
    },
  ];

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:max-w-none lg:py-32">
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} onMouseOver={() => speak({ text: t('subjectsTaught', 'Subjects Taught') })}>{t('subjectsTaught', 'Subjects Taught')}</h2>          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            {subjects.map((subject) => (
              <div key={subject.name} className="relative text-xl group">
                <div className={`relative w-full overflow-hidden rounded-lg h-80 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <img
                    src={subject.imageSrc}
                    alt={subject.imageAlt}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <h2
                  className={`mt-6 text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
                  onMouseOver={() => speak({ text: subject.name })}
                >
                  <a href={subject.href} className="text-xl">
                    <span className="absolute inset-0 text-l" />
                    {subject.name}
                  </a>
                </h2>
                <p className={`text-base font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{subject.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
