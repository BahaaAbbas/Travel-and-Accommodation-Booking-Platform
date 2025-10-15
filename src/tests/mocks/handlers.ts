import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock POST /auth/authenticate
  http.post("*/auth/authenticate", async ({ request }) => {
    const body = (await request.json()) as {
      userName: string;
      password: string;
    };

    if (body.password.length < 4) {
      return HttpResponse.json(
        { message: "Password must be at least 4 characters" },
        { status: 401 }
      );
    }

    if (body.userName === "admin" && body.password === "admin") {
      return HttpResponse.json(
        { token: "fake-jwt-token", userType: "Admin" },
        { status: 200 }
      );
    }

    if (body.userName === "user" && body.password === "user") {
      return HttpResponse.json(
        { token: "fake-jwt-token", userType: "User" },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }),
];
