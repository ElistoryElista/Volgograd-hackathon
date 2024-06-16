import { selectVisuallyImpairedMode } from "@/entities";
import {
  Container,
  SoundIcon,
  Underline,
  useAppSelector,
  useWindowDimensions,
} from "@/shared";
import { useEffect, useState } from "react";

interface IProps {}
export const VisuallyEnhancedSettingsMenu: React.FC<IProps> = ({}) => {
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const [selectedTheme, setSelectedTheme] = useState<"lofi" | "black">("lofi");
  const [selectedText, setSelectedText] = useState("");
  const [selectedFontSize, setSelectedFontSize] = useState<"md" | "lg" | "xl">(
    "lg"
  );

  const width = useWindowDimensions();
  const isMobile = width.width < 1024;

  const sizes = {
    md: "16px",
    lg: "18px",
    xl: "20px",
  };

  const speakText = (event: MouseEvent) => {
    if ("speechSynthesis" in window) {
      const text = (event.target as Element).textContent;
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.2; // Устанавливаем скорость речи
        speechSynthesis.speak(utterance);
      }
    } else {
      alert("Web Speech API не поддерживается в вашем браузере.");
    }
  };

  useEffect(() => {
    if (isMobile && isVisuallyImpaired) {
      document.body.addEventListener("click", speakText);

      return () => {
        document.body.removeEventListener("click", speakText);
      };
    }
  }, [isMobile, isVisuallyImpaired]);

  useEffect(() => {
    const htmlElement = document.getElementById("html");
    if (htmlElement) {
      if (isVisuallyImpaired) {
        htmlElement.setAttribute("data-theme", selectedTheme);
      } else htmlElement.setAttribute("data-theme", "light");
    }
  }, [isVisuallyImpaired, selectedTheme]);

  useEffect(() => {
    const htmlElement = document.getElementById("html");
    if (htmlElement) {
      if (isVisuallyImpaired) {
        htmlElement.style.fontSize = sizes[selectedFontSize];
      } else htmlElement.style.fontSize = "16px";
    }
  }, [isVisuallyImpaired, selectedFontSize]);

  const handleSpeakButtonClick = () => {
    if (selectedText) {
      const utterance = new SpeechSynthesisUtterance(selectedText);
      speechSynthesis.speak(utterance);
    }
  };

  const handleSelectionChange = () => {
    const text = window.getSelection()?.toString().trim();
    text && setSelectedText(text);
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <div
      className={`bg-base-300 py-2 ${
        isVisuallyImpaired && !isMobile ? "" : "hidden"
      } navbar`}
    >
      <Container className="flex justify-between">
        <div className="navbar-start flex items-center gap-2">
          Размер шрифта{" "}
          <button
            className={`btn text-[16px] normal-case ${
              selectedFontSize === "md" ? "btn-primary" : ""
            }`}
            onClick={() => setSelectedFontSize("md")}
          >
            <span>Aa</span>
          </button>
          <button
            className={`btn text-[20px] normal-case ${
              selectedFontSize === "lg" ? "btn-primary" : ""
            }`}
            onClick={() => setSelectedFontSize("lg")}
          >
            <span>Aa</span>
          </button>
          <button
            className={`btn text-[23px] normal-case ${
              selectedFontSize === "xl" ? "btn-primary" : ""
            }`}
            onClick={() => setSelectedFontSize("xl")}
          >
            <span>Aa</span>
          </button>
        </div>
        <div className="navbar-center flex">
          <button className="btn uppercase" onClick={handleSpeakButtonClick}>
            выделите текст и нажмите <SoundIcon className="w-6" />
          </button>
        </div>
        <div className="navbar-end flex items-center gap-2">
          Цвет сайта{" "}
          <button
            className={`btn relative bg-[#FFFFFF] text-[calc(1rem+2px)] normal-case text-[#000000] hover:bg-[#FFFFFF]`}
            onClick={() => setSelectedTheme("lofi")}
          >
            <span>Aa</span>
            {selectedTheme === "lofi" && <Underline />}
          </button>
          <button
            className={`btn relative bg-[#000000] text-[calc(1rem+2px)] normal-case text-[#ffffff] hover:bg-[#000000]`}
            onClick={() => setSelectedTheme("black")}
          >
            <span>Aa</span>
            {selectedTheme === "black" && <Underline />}
          </button>
        </div>
      </Container>
    </div>
  );
};
