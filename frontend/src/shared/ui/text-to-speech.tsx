import React, { useState, useEffect } from "react";
import { PauseIcon, PlayIcon, ReloadIcon, StopIcon } from "../assets";

interface TextToSpeechProps {
  text: string;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fragments, setFragments] = useState<string[]>([]);
  const speech = new SpeechSynthesisUtterance();

  const speak = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    window.speechSynthesis.cancel();
    const maxLength = 300;
    const fragmentedText = text.match(new RegExp(`.{1,${maxLength}}`, "g"));
    if (fragmentedText) {
      setFragments(fragmentedText);
      setCurrentIndex(0);
    }
    setIsPaused(false);
  };

  useEffect(() => {
    if (fragments.length > 0 && currentIndex < fragments.length) {
      speech.lang = "ru-RU";
      speech.text = fragments[currentIndex];
      speech.onend = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      };
      window.speechSynthesis.speak(speech);
    }
  }, [currentIndex, fragments]);

  const pause = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const cancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    window.speechSynthesis.cancel();
    setIsPaused(false);
    setCurrentIndex(0);
    setFragments([]);
  };

  const btnClasses = "btn btn-sm btn-outline btn-circle";

  return (
    <div className="flex gap-2">
      <button className={btnClasses} onClick={speak}>
        {currentIndex === 0 && fragments.length === 0 ? (
          <PlayIcon className="w-4" />
        ) : (
          <ReloadIcon className="w-4" />
        )}
      </button>

      <button
        className={btnClasses}
        onClick={isPaused ? resume : pause}
        disabled={!(currentIndex < fragments.length && fragments.length > 0)}
      >
        {isPaused ? (
          <PlayIcon className="w-4" />
        ) : (
          <PauseIcon className="w-4" />
        )}
      </button>

      <button
        onClick={cancel}
        className={btnClasses}
        disabled={!(currentIndex < fragments.length)}
      >
        <StopIcon className="w-4" />
      </button>
    </div>
  );
};
