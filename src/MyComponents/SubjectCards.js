import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import braille from "braille";
import sci from "./../images/sci.png";
import math from "./../images/maths.png";
import eng from "./../images/eng.png";
import hin from "./../images/hin.png";
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function SubjectCards() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  function handleClick(subject) {
    const brailleText = braille.toBraille(`This is the ${subject} course in braille.`);
    toast(`Braille: ${brailleText}`);
  }
  const subjects = [
    {
      name: t('science', 'Science'),
      description: t('scienceDescription', 'Science helps us understand the world around us by exploring natural phenomena, conducting experiments, and making observations.'),
      imageSrc: sci,
    },
    {
      name: t('mathematics', 'Mathematics'),
      description: t('mathematicsDescription', 'Mathematics is the language of the universe, and it plays a vital role in various fields of science and technology.'),
      imageSrc: math,    },
    {
      name: t('english', 'English'),
      description: t('englishDescription', "English is a global language, and it's essential for communication, literature, and many other aspects of life."),
      imageSrc: eng,
    },
    
  ];
  return (
    <>
      <Toaster />
      <div className={`pt-6 pb-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-lavender'}`}>
        {subjects.map((subject) => (
          <div key={subject.name} className="container flex flex-col mx-auto mt-4 w-96 lg:w-4/5">
            <div className={`flex flex-col mx-2 overflow-hidden rounded-lg shadow-xl hover:shadow-sm hover:cursor-pointer md:flex-row w-100 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
              <div className="w-auto h-64 md:w-1/2">
                <img
                  className="inset-0 object-cover object-center w-full h-full"
                  src={subject.imageSrc}
                  alt={`${subject.name} Image`}
                />
              </div>
              <div className="flex flex-col justify-between w-full px-6 py-4 text-gray-800">
                <h3 className="self-center text-3xl font-semibold leading-tight uppercase truncate">
                  {subject.name}
                </h3>
                <p className="mt-1">{subject.description}</p>
                <button
                  className="w-[80%] lg:w-[30%] inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-[#212427] rounded-lg group bg-gradient-to-br from-lavender to-lavender-dark group-hover:from-lavender group-hover:to-lavender-dark hover:text-[#EFEEE9] focus:ring-2 focus:outline-none focus:ring-[#EFEEE9]"
                  type="button"
                  onClick={() => navigate(`/${subject.name.toLowerCase()}`)}
                >                  <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-transparent dark:bg-lavender-dark rounded-md group-hover:bg-opacity-0">
                    {t('goToCourse', 'GO TO COURSE')}
                  </span>
                </button>
                <p className={`mt-1 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('revScheme', "REV-2019'C' Scheme")}
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
