import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import BalochiInput from "./index";
import { afterEach, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

test("BalochiInput renders correctly", () => {
  render(<BalochiInput aria-label="Test Input" data-testid="test-id" />);
  const inputElement = screen.getByTestId("test-id");
  expect(inputElement).toBeInTheDocument();
});

test("BalochiInput converts English to Balochi correctly", async () => {
  const user = userEvent.setup();

  render(<BalochiInput aria-label="Test Input" data-testid="test-id" />);
  const inputElement = screen.getByLabelText("Test Input");

  await user.type(inputElement, "ab");

  expect(inputElement).toHaveValue("اب");
});

test("BalochiInput handles Shift mode correctly", async () => {
  const user = userEvent.setup();

  render(
    <BalochiInput
      aria-label="Test Input"
      className="test-class"
      placeholder="Type here"
    />
  );

  const inputElement = screen.getByLabelText("Test Input");
  fireEvent.keyDown(window, { key: "Shift" });

  await user.type(inputElement, "a,.");

  fireEvent.keyUp(window, { key: "Shift" });

  expect(inputElement.value).toBe("اَِ");
});

test("BalochiInput handles CapsLock mode correctly", async () => {
  const user = userEvent.setup();

  render(
    <BalochiInput
      aria-label="Test Input"
      className="test-class"
      placeholder="Type here"
    />
  );

  const inputElement = screen.getByLabelText("Test Input");
  fireEvent.keyDown(window, { key: "CapsLock" });

  await user.type(inputElement, "AP");
  fireEvent.keyUp(window, { key: "CapsLock" });

  expect(inputElement.value).toBe("آُ");
});
