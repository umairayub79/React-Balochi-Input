import React, { useState, useEffect } from "react";

const BalochiInput = ({
  className,
  onChange,
  value,
  placeholder,
  allowSwitching = false,
  ...props
}) => {
  // State to track Shift key mode
  const [isShiftMode, setIsShiftMode] = useState(false);

  const [englishMode, setEnglishMode] = useState(false);

  // Function to convert English(Latin) characters to their Balochi counterparts
  const convertToBalochi = (englishText) => {
    const normalMap = {
      q: "ق",
      w: "و",
      e: "ع",
      r: "ر",
      t: "ت",
      y: "ے",
      u: "ء",
      i: "ی",
      o: "ہ",
      p: "پ",
      a: "ا",
      s: "س",
      d: "د",
      f: "ف",
      g: "گ",
      h: "ھ",
      j: "ج",
      k: "ک",
      l: "ل",
      z: "ز",
      x: "ش",
      c: "چ",
      v: "ط",
      b: "ب",
      n: "ن",
      m: "م",

      Q: "ءُ",
      W: "ؤ",
      E: "ءِ",
      R: "ڑ",
      T: "ٹ",
      Y: "ئے",
      U: "ٰ",
      I: "ئ",
      O: "ْ",
      P: "ُ",
      A: "آ",
      S: "ص",
      D: "ڈ",
      F: "ءَ",
      G: "غ",
      H: "ح",
      J: "ض",
      K: "خ",
      L: "ئِے",
      Z: "ذ",
      X: "ژ",
      C: "ث",
      V: "ظ",
      B: "یٔ",
      N: "ں",
      M: "اَنت",

      "`": "ً",
      ";": "؛",
      "'": "ۂ",
      ",": "،",
      ".": "۔",
      "/": "ْ",
    };

    const shiftMap = {
      ",": "ِ", // , caps on
      "<": "ِ",

      ".": "َ", // . caps on
      ">": "َ",

      "/": "؟", // caps on
      "?": "؟",

      ";": ":", // caps on
      ":": ":",

      "'": "‘", // / caps on
      '"': "‘",

      0: "ّ", // / caps on
      ")": "ّ",
    };

    let balochiText = "";
    for (let i = 0; i < englishText.length; i++) {
      const char = englishText[i];
      if (isShiftMode && shiftMap[char]) {
        balochiText += shiftMap[char];
      } else if (normalMap[char]) {
        balochiText += normalMap[char];
      } else {
        balochiText += char;
      }
    }
    return balochiText;
  };

  // State to store converted input value
  const [inputValue, setInputValue] = useState(convertToBalochi(value || ""));

  useEffect(() => {
    // Event listener for key down to handle Shift key and input mode changes
    const handleKeyDown = (e) => {
      if (
        e.key === "Shift" ||
        (e.getModifierState && e.getModifierState("CapsLock"))
      ) {
        setIsShiftMode(true);
      }

      if (e.ctrlKey && e.keyCode === 32) {
        if (allowSwitching) {
          setEnglishMode((prev) => (prev ? false : true));
        }
      }
    };

    // Event listener for key up to handle Shift key
    const handleKeyUp = (e) => {
      if (
        e.key === "Shift" ||
        (e.getModifierState && e.getModifierState("CapsLock"))
      ) {
        setIsShiftMode(false);
      }
    };

    // Add event listeners when component mounts
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [allowSwitching]);

  // Handler for input changes
  const handleInputChange = (e) => {
    const { nativeEvent, target } = e;
    const { value } = target;
    let newValue;

    // Check if the input event is triggered by typing and not in English mode
    if (nativeEvent.inputType === "insertText" && !englishMode) {
      // If so, convert the last character from English to Balochi
      newValue =
        value.slice(0, -1) + convertToBalochi(value.charAt(value.length - 1));
    } else {
      // If not, keep the value as it is
      newValue = value;
    }

    setInputValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      dir="rtl"
      type="text"
      className={className}
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default BalochiInput;
