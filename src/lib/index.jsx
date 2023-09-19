import React, { useState, useEffect } from "react";

const BalochiInput = ({
  className,
  onChange,
  value,
  placeholder,
  ...props
}) => {
  const [isShiftMode, setIsShiftMode] = useState(false);

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

      "`": 'ً',
      ";": "؛",
      "'": "ۂ",
      ",": "،",
      ".": "۔",
      "/": "ْ",
    };

    const shiftMap = {
      "," : "ِ", // , caps on
      "<" : "ِ",

      "." : "َ", // . caps on
      ">" : "َ",
      
      "/" : "؟", // caps on
      "?" : "؟",

      ";" : ":", // caps on
      ":" : ":",
 
      "'" : "‘",// / caps on
      "\"" : "‘",

      "0" : "ّ",// / caps on
      ")" : "ّ",
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

  const [inputValue, setInputValue] = useState(convertToBalochi(value || ""));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "Shift" ||
        (e.getModifierState && e.getModifierState("CapsLock"))
      ) {
        setIsShiftMode(true);
      }
    };

    const handleKeyUp = (e) => {
      if (
        e.key === "Shift" ||
        (e.getModifierState && e.getModifierState("CapsLock"))
      ) {
        setIsShiftMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    const convertedValue = convertToBalochi(value);
    setInputValue(convertedValue);
    if (onChange) {
      onChange(convertedValue);
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
      aria-label=""
      {...props}
    />
  );
};

export default BalochiInput;
