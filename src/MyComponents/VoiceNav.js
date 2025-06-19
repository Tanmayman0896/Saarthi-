import React, { useState, useRef, useEffect } from 'react';
import vol from './../images/volume.png';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import "../mic.css";
import { FaInfoCircle, FaMicrophone } from "react-icons/fa";
import { GrTextAlignFull } from "react-icons/gr";

export default function VoiceNav() {
  const [showModal, setShowModal] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  const { speak } = useSpeechSynthesis();
  const voiceNav = "Click to activate Voice Navigation.";
  const voiceNavProcess = "Welcome to voice navigation. Click on the microphone icon to start listening and try saying: Open Courses or Enroll for Science";

  const commands = [
    {
      command: 'open *',
      callback: (site) => {
        const clean = site.split(" ").join("");
        window.open(`https://shikshaedu.vercel.app/${clean}`);
      },
    },
    {
      command: 'go to *',
      callback: (site) => {
        const clean = site.split(" ").join("");
        window.open(`https://shikshaedu.vercel.app/${clean}`);
      },
    },
    {
      command: 'open courses',
      callback: () => {
        window.open("https://shikshaedu.vercel.app/coursecat");
      },
    },
    {
      command: 'enroll for *',
      callback: () => {
        window.open("https://shikshaedu.vercel.app/videos");
      },
    },
    {
      command: 'reset',
      callback: () => {
        handleReset();
      },
    },
    {
      command: 'stop',
      callback: () => {
        stopHandle();
      },
    },
  ];

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const handleStart = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support voice recognition. Please use Google Chrome.");
      return;
    }

    setIsListening(true);
    microphoneRef.current?.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-IN', // or 'en-US' for US English
    });
  };

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current?.classList.remove("listening");
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  useEffect(() => {
    console.log("Transcript:", transcript);
  }, [transcript]);

  return (
    <>
      <div>
        <button
          className="fixed z-50 bottom-5 right-5 text-white px-4 w-auto h-10 bg-[#1F2937] rounded-full hover:bg-[#4A77B5] active:shadow-lg shadow transition ease-in focus:outline-none animate-bounce duration-500"
          type="button"
          onClick={() => setShowModal(true)}
          onMouseOver={() => speak({ text: voiceNav })}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FaMicrophone className="w-6 h-6" /> &nbsp;Voice Navigation
          </div>
        </button>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-center justify-center p-5 border-b border-gray-400 border-solid rounded-t lg:h-28">
                  <h3 className="flex items-center text-3xl font-bold">
                    VOICE NAVIGATION &nbsp;
                    <FaInfoCircle
                      className="w-5 h-5"
                      onMouseOver={() => speak({ text: voiceNavProcess })}
                    />
                  </h3>
                </div>
                <div className="relative flex-auto p-6">
                  {!browserSupportsSpeechRecognition ? (
                    <div className="text-red-600 font-semibold">
                      Your browser doesn't support speech recognition.
                    </div>
                  ) : (
                    <div className="microphone-wrapper">
                      <div className="mircophone-container">
                        <div
                          className="microphone-icon-container"
                          ref={microphoneRef}
                          onClick={handleStart}
                        >
                          <img src={vol} className="microphone-icon" alt="mic" />
                        </div>
                        <div className="microphone-status mt-2">
                          {isListening ? "Listening..." : "Click to start Listening"}
                          <br />
                          <span className="text-sm font-semibold text-gray-400">
                            Try Saying: Open Courses / Enroll for Science
                          </span>
                        </div>
                      </div>

                      {transcript && (
                        <div className="microphone-result-container mt-5">
                          <div className="microphone-result-text mt-2 lg:w-[50%] mx-auto text-center">
                            <div className="font-bold text-gray-500 mb-2 flex justify-center">
                              <GrTextAlignFull className="w-6 h-6 mt-1" /> &nbsp;Transcript
                            </div>
                            {transcript}
                          </div>
                          <div className="flex justify-center mt-4">
                            <button
                              className="px-3 py-2 mb-1 mr-2 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-gray-600 shadow"
                              onClick={handleReset}
                            >
                              Reset
                            </button>
                            {isListening && (
                              <button
                                className="px-3 py-2 mb-1 text-sm font-semibold text-white bg-[#d83a3a] rounded hover:shadow-lg"
                                onClick={stopHandle}
                              >
                                Stop
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-gray-400 border-solid rounded-b">
                  <button
                    className="px-3 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-gray-800 rounded hover:bg-gray-600 shadow"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </>
  );
}