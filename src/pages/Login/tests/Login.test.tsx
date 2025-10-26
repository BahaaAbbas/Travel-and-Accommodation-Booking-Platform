import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "@/pages/Login";
import { getTheme } from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("@/features/hooks", () => ({
  useAppDispatch: () => vi.fn(),
}));

vi.mock("@/context/ThemeContext", () => ({
  useThemeContext: () => ({ toggleTheme: vi.fn() }),
}));

const renderWithProviders = (
  ui: ReactNode,
  mode: "light" | "dark" = "light"
) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={getTheme(mode)}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe("Login Test", () => {
  it("shows success snackbar after successful ADMIN login", async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/login successful!/i)).toBeInTheDocument()
    );
  });

  it("shows success snackbar after successful USER login", async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "user" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/login successful!/i)).toBeInTheDocument()
    );
  });

  it("shows failed snackbar after unsuccessful login", async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/invalid username or password/i)
      ).toBeInTheDocument()
    );
  });

  it("shows error when password less than 4 characters", async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "anyuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "12" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/password must be at least 4 characters/i)
      ).toBeInTheDocument()
    );
  });
});
