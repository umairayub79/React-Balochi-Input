import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import BalochiInput from "./index";
import { afterEach, expect, test, vi } from "vitest";

afterEach(cleanup);
test("BalochiInput renders correctly", () => {
  const onChange = vi.fn();

  render(
    <BalochiInput
      aria-label="Test Input"
      className="test-class"
      onChange={onChange}
      placeholder="Type here"
    />
  );

  const inputElement = screen.getByLabelText("Test Input");
  expect(inputElement).toBeTruthy();

  fireEvent.change(inputElement, { target: { value: "بلوچی" } });
  expect(onChange).toHaveBeenCalledWith("بلوچی");
});

test("BalochiInput converts English to Balochi correctly", () => {
  const onChange = vi.fn();

  render(
    <BalochiInput
      aria-label="Test Input"
      className="test-class"
      onChange={onChange}
      value="blwci"
      placeholder="Type here"
    />
  );

  const inputElement = screen.getByLabelText("Test Input");
  fireEvent.change(inputElement, { target: { value: "blwci" } });

  expect(inputElement.value).toBe("بلوچی");
});

test("BalochiInput handles Shift mode correctly", () => {
  const onChange = vi.fn();

  render(
    <BalochiInput
      aria-label="Test Input"
      className="test-class"
      onChange={onChange}
      value="hello"
      placeholder="Type here"
    />
  );

  const inputElement = screen.getByLabelText("Test Input");
  fireEvent.keyDown(window, { key: "Shift" });

  fireEvent.change(inputElement, { target: { value: "A<>P" } });

  fireEvent.keyUp(window, { key: "Shift" });

  expect(inputElement.value).toBe("آَُِ");
});

test("BalochiInput handles CapsLock mode correctly", () => {
  const onChange = vi.fn();

  render(
    <BalochiInput
      aria-label="Test Input"
      className="test-class"
      onChange={onChange}
      value="Hello"
      placeholder="Type here"
    />
  );

  const inputElement = screen.getByLabelText("Test Input");
  fireEvent.keyDown(window, { key: "CapsLock" });

  fireEvent.change(inputElement, { target: { value: "AP" } });

  fireEvent.keyUp(window, { key: "CapsLock" });

  expect(inputElement.value).toBe("آُ");
});
