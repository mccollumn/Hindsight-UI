import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonStyled } from "./ButtonStyled";

describe("ButtonStyled", () => {
  it("renders with default text", () => {
    render(<ButtonStyled />);

    const button = screen.getByRole("button", { name: "Button Text" });
    expect(button).toBeInTheDocument();
  });

  it("renders with custom text", () => {
    render(<ButtonStyled>Custom Button</ButtonStyled>);

    const button = screen.getByRole("button", { name: "Custom Button" });
    expect(button).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<ButtonStyled onClick={handleClick}>Click Me</ButtonStyled>);

    const button = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<ButtonStyled disabled>Disabled Button</ButtonStyled>);

    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toBeDisabled();
  });

  it("passes through additional props", () => {
    render(
      <ButtonStyled data-testid="custom-button" size="large">
        Large Button
      </ButtonStyled>
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toBeInTheDocument();
  });
});
