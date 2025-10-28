import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { getTheme } from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Checkout from "../Checkout";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
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

describe("Checkout Test Componenet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders checkout form correctly", () => {
    renderWithProviders(<Checkout />);

    expect(screen.getByText("Secure Checkout")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Payment Method")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirm booking/i })
    ).toBeInTheDocument();
  });

  it("updates form field values as expected", () => {
    renderWithProviders(<Checkout />);

    const nameInput = screen.getByLabelText("Full Name");
    fireEvent.change(nameInput, { target: { value: "Bahaa Abbas" } });
    expect(nameInput).toHaveValue("Bahaa Abbas");

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bahaa@gmail.com" } });
    expect(emailInput).toHaveValue("bahaa@gmail.com");
  });

  it("renders card fields when payment method is Credit Card", async () => {
    renderWithProviders(<Checkout />);

    const paymentSelect = screen.getByLabelText("Payment Method");
    fireEvent.mouseDown(paymentSelect);

    const creditOption = await screen.findByRole("option", {
      name: "Credit Card",
    });
    fireEvent.click(creditOption);

    expect(await screen.findByLabelText("Cardholder Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Card Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Expiry Date (MM/YY)")).toBeInTheDocument();
    expect(screen.getByLabelText("CVV")).toBeInTheDocument();
  });

  it("hides card fields when payment method is PayPal", async () => {
    renderWithProviders(<Checkout />);

    const paymentSelect = screen.getByLabelText("Payment Method");
    fireEvent.mouseDown(paymentSelect);

    const creditOption = await screen.findByRole("option", {
      name: "PayPal",
    });
    fireEvent.click(creditOption);
    expect(screen.queryByLabelText("Cardholder Name")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Card Number")).not.toBeInTheDocument();
  });

  it("submits form and navigates to confirmation page", async () => {
    renderWithProviders(<Checkout />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "Bahaa Abbas" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "bahaa@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "1234567890" },
    });

    const paymentSelect = screen.getByLabelText("Payment Method");
    fireEvent.mouseDown(paymentSelect);
    const creditOption = await screen.findByRole("option", {
      name: "Credit Card",
    });
    fireEvent.click(creditOption);

    fireEvent.change(screen.getByLabelText("Cardholder Name"), {
      target: { value: "Bahaa Abbas" },
    });
    fireEvent.change(screen.getByLabelText("Card Number"), {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(screen.getByLabelText("Expiry Date (MM/YY)"), {
      target: { value: "12/25" },
    });
    fireEvent.change(screen.getByLabelText("CVV"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /confirm booking/i }));

    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith(
          "/confirmation",
          expect.objectContaining({
            state: expect.objectContaining({
              confirmInfo: expect.objectContaining({
                customerName: "Bahaa Abbas",
                email: "bahaa@gmail.com",
                phone: "1234567890",
                paymentMethod: "Credit Card",
              }),
            }),
          })
        );
      },
      { timeout: 8000 }
    );
  }, 10000);
  it("shows validation errors when submitting empty form", async () => {
    renderWithProviders(<Checkout />);

    fireEvent.click(screen.getByRole("button", { name: /confirm booking/i }));

    await screen.findAllByText(/required/i);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
