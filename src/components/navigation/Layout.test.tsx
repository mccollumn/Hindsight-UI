import { Layout } from "./Layout";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mockNavActions } from "./mocks/navActions";

const MockLogo = () => {
  return <div>Mock Logo</div>;
};

describe("<Layout />", () => {
  it("Should load without error", async () => {
    render(<Layout isAuthorized={false} />);
    expect(screen.getByLabelText("Base application")).toBeInTheDocument();
  });

  it("Select a navigation item", async () => {
    const mockNavigationClick = jest.fn();
    render(
      <Layout
        navigationActions={mockNavActions}
        navigationClick={mockNavigationClick}
        isAuthorized={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Navigation drawer")).toHaveTextContent(
        "Profiles"
      );
    });
    fireEvent.click(screen.getByText("Profiles"));
    await waitFor(() => {
      expect(mockNavigationClick).toBeCalledWith(mockNavActions[1]);
    });
  });

  it("should override with component", () => {
    render(
      <Layout
        navigationActions={[
          ...mockNavActions,
          {
            key: "component",
            Component: <MockLogo />,
            authFilter: "always",
            position: "left",
          },
        ]}
        isAuthorized={false}
      />
    );
    expect(screen.getByText("Mock Logo")).toBeInTheDocument();
  });

  it("Should expand and contract left navigation", () => {
    render(<Layout navigationActions={mockNavActions} isAuthorized={false} />);

    // Expand
    fireEvent.click(screen.getByLabelText("Expand Left Navigation"));

    expect(screen.getByLabelText("Base application")).toHaveClass("expanded");

    // Contract
    fireEvent.click(screen.getByLabelText("Collapse Left Navigation"));

    expect(screen.getByLabelText("Base application")).toHaveClass("contracted");
  });

  it("Should filter non-authorized nav actions", () => {
    render(<Layout navigationActions={mockNavActions} isAuthorized={false} />);

    expect(screen.getByLabelText("Login")).toBeInTheDocument();
  });
});
