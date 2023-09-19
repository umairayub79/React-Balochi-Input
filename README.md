# react-balochi-input

![NPM License](https://img.shields.io/npm/l/react-balochi-input?style=for-the-badge&logo=mit) 
[![NPM Version](https://img.shields.io/npm/v/react-balochi-input?style=for-the-badge)](https://www.npmjs.com/package/react-balochi-input)


## Overview

The **Balochi Input React Component** is a specialized React component designed to seamlessly integrate Balochi language input functionality into your web applications. This component empowers users to input Balochi text using their standard keyboard, ensuring a user-friendly experience.

## Features

- Real-time conversion of English characters to their corresponding Balochi script.
- Support for both regular and shift modes to access special characters.
- Highly customizable, facilitating seamless integration into your existing projects.

## Functionality

The component dynamically converts English characters to their corresponding Balochi counterparts, ensuring a seamless transition between languages for users.

## Installation

To integrate the **Balochi Input React Component** into your project, simply execute the following command:

```bash
npm install react-balochi-input
```

## Usage

```jsx
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
```

## Props

- `className` (string): Custom CSS class for styling.
- `value` (string): Initial value for the input field.
- `onChange` (function): Callback function triggered on input change, providing the Balochi text.
- `placeholder` (string): Placeholder text for the input field.
- custom props : Accepts custom props for further customization.


## Development

- `dev`: Start the development server using Vite.
- `build`: Build the project using Vite.
- `test`: Run tests using Vitest.
- `watch`: Watch for changes and re-run tests using Vitest.
- `coverage`: Run tests with coverage using Vitest.

To get started, you can run:

```bash
npm run dev
```




## Contributing

Contributions from the community are welcome! If you'd like to contribute to this project, here's how you can help:

1. **Fork** the repository and **clone** it locally.
2. Create a new branch for your contribution.
3. Make your changes and ensure the code is well-documented.
4. Test thoroughly to make sure it works as expected.
5. **Commit** your changes and **push** them to your fork.
6. Create a **pull request**, describing your changes in detail.


Thank you for considering contributing to our project!


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
