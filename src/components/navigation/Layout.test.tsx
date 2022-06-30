import { Layout } from "./Layout";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

describe("<Layout />", () => {
  xit("Should load without error", async () => {
    render(<Layout />);
    expect(screen.getByLabelText("Base application")).toHaveTextContent(
      "Login"
    );
  });
  xit("Select a navigation item", async () => {
    const mockLeftNavigationClick = jest.fn();
    render(
      <Layout
        navigationActions={mockNavActions}
        leftNavigationClick={mockLeftNavigationClick}
      />
    );
    fireEvent.click(screen.getByLabelText("Navigation menu"));
    await waitFor(() => {
      expect(screen.getByLabelText("Navigation drawer")).toHaveTextContent(
        "Home2"
      );
    });
    fireEvent.click(screen.getByText("Home2"));
    await waitFor(() => {
      expect(mockLeftNavigationClick).toBeCalledWith(mockNavActions[2]);
    });
  });
});

const mockNavActions = [
  {
    key: "HOME",
    label: "Home",
    icon: null,
    ariaLabel: "Home",
  },
  { divider: true },
  {
    key: "HOME2",
    label: "Home2",
    icon: null,
    ariaLabel: "Home2",
  },
];
