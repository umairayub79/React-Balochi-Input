import React, { useState } from "react";
import BalochiInput from "./lib";

const App = () => {
  const npmCommand = "npm install react-balochi-input";
  const demoCode = `
  import React, {useState} from 'react';
  import BalochiInput from 'react-balochi-input';
  
  const YourComponent = () => {
    const [inputValue, setInputValue] = useState('Ab')
    
    const handleBalochiInputChange = (balochiText) => {
      setInputValue(balochi)
      console.log(balochiText);
    };
  
    return (
      <BalochiInput
        className="custom-balochi-input"
        value={inputValue} // will show آب
        onChange={handleBalochiInputChange}
        placeholder="Start typing.."
      />
    );
  };
  
  export default YourComponent;
  `;

  return (
    <div className="app-container">
      <h1 className="app-heading">Balochi Input React Component Demo</h1>
      <p className="app-paragraph">
        Welcome to the demo of the Balochi Input React component. <br /> This
        component allows you to type in Balochi using your keyboard.
      </p>
      <BalochiInput className="balochi-input" />
      <p className="app-paragraph mt-4">
        To use this component in your project, install it via npm:
      </p>
      <div className="app-code">
        <pre>npm install react-balochi-input</pre>
        <CopyButton code={npmCommand} />
      </div>
      <p>Usage:</p>
      <pre className="app-code">
        {demoCode}
        <CopyButton code={demoCode} />
      </pre>
    </div>
  );
};

const CopyIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" height="1.5em" width="1.5em">
    <path d="M502.6 70.63L441.35 9.38C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.02 256c.88 35.4 29.58 64 64.88 64h192c35.2 0 64-28.8 64-64V93.25c0-8.48-3.4-16.62-9.4-22.62zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16V64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1v192zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16l.88-255.9c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64L0 448c.002 35.3 28.66 64 64 64h192c35.2 0 64-28.8 64-64v-32h-47.1l-.9 32z" />
  </svg>
);

const CheckMarkIcon = () => (
  <svg viewBox="0 0 1024 1024" fill="currentColor" height="2em" width="2em">
    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
  </svg>
);

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyCodeToClipboard = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset the 'copied' state after 1 second
      })
      .catch((error) => {
        console.error("Error copying code to clipboard:", error);
      });
  };

  return (
    <button
      onClick={() => copyCodeToClipboard(code)}
      className={`copy-button ${copied ? "copied" : ""}`}
    >
      {copied ? <CheckMarkIcon /> : <CopyIcon />}
    </button>
  );
};
export default App;
