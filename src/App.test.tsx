import { render, screen } from "@testing-library/react";
import App from "./App";
import * as ReactQuery from "@tanstack/react-query";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter } from "react-router-dom";

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );
  return {
    ...original,
    useQuery: () => ({ isLoading: false, error: {}, data: [] }),
  };
});

const queryClient = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

describe("<App />", () => {
  it("Should load without error", async () => {
    render(
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ReactQuery.QueryClientProvider client={queryClient}>
            <App />
          </ReactQuery.QueryClientProvider>
        </QueryParamProvider>
      </BrowserRouter>
    );
    expect(screen.getByLabelText("Select a Profile")).toBeInTheDocument();
  });
});
