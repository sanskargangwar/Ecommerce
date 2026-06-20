import React, { useContext, useEffect, useRef, useState } from "react";
import ai from "../assets/ai.png";
import open from "../assets/open.mp3";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();

  const [activeAi, setActiveAi] = useState(false);

  const recognitionRef = useRef(null);
  const audioRef = useRef(new Audio(open));

  const speak = (message) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);

    utterance.onend = () => {
      setActiveAi(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // console.log("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
        .trim()
        .toLowerCase();

      // console.log("Command:", transcript);

      recognition.stop();

      if (
        transcript.includes("search") &&
        transcript.includes("open") &&
        !showSearch
      ) {
        speak("opening search");
        setShowSearch(true);
        navigate("/collection");
      }

      else if (
        transcript.includes("search") &&
        transcript.includes("close") &&
        showSearch
      ) {
        speak("closing search");
        setShowSearch(false);
      }

      else if (
        transcript.includes("collection") ||
        transcript.includes("collections") ||
        transcript.includes("product") ||
        transcript.includes("products")
      ) {
        speak("opening collection page");
        navigate("/collection");
      }

      else if (
        transcript.includes("about") ||
        transcript.includes("about page")
      ) {
        speak("opening about page");
        navigate("/about");
        setShowSearch(false);
      }

      else if (
        transcript.includes("home") ||
        transcript.includes("home page")
      ) {
        speak("opening home page");
        navigate("/");
        setShowSearch(false);
      }

      else if (
        transcript.includes("cart") ||
        transcript.includes("kaat") ||
        transcript.includes("caat")
      ) {
        speak("opening your cart");
        navigate("/cart");
        setShowSearch(false);
      }

      else if (transcript.includes("contact")) {
        speak("opening contact page");
        navigate("/contact");
        setShowSearch(false);
      }

      else if (
        transcript.includes("order") ||
        transcript.includes("orders") ||
        transcript.includes("my order") ||
        transcript.includes("my orders")
      ) {
        speak("opening your orders page");
        navigate("/order");
        setShowSearch(false);
      }

      else {
        // toast.error("Try Again");
        setActiveAi(false);
      }
    };

    recognition.onerror = () => {
      setActiveAi(false);
    };

    recognition.onend = () => {
      setActiveAi(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [navigate, showSearch, setShowSearch]);

  const startListening = () => {
    if (!recognitionRef.current || activeAi) return;

    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play();

      setActiveAi(true);

      recognitionRef.current.start();
    } catch (error) {
      console.log(error);
      setActiveAi(false);
    }
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={startListening}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-[100px] cursor-pointer ${
          activeAi
            ? "translate-x-[10%] translate-y-[-10%] scale-125"
            : "translate-x-[0] translate-y-[0] scale-100"
        } transition-transform`}
        style={{
          filter: activeAi
            ? "drop-shadow(0px 0px 30px #00d2fc)"
            : "drop-shadow(0px 0px 20px black)",
        }}
      />
    </div>
  );
}

export default Ai;