import React from "react";
import { configure, shallow, mount } from "enzyme";
import { render, screen, fireEvent } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-17-updated";
import userEvent from "@testing-library/user-event";

import NavBar from "../NavBar/NavBar";

configure({ adapter: new Adapter() });
describe("Testing NavBar Component", () => {
  it("Dashboard link should be available", () => {
    const loginData = {
      role: "creoadmin",
      success: true,
      token: "xyz",
    };
    localStorage.setItem("user", JSON.stringify(loginData));
    render(<NavBar />);
    expect(screen.getByTestId("creodash").textContent).toBe("Dashboard");
  });

  it("Projects link should be available", () => {
    const loginData = {
      role: "creoadmin",
      success: true,
      token: "xyz",
    };
    localStorage.setItem("user", JSON.stringify(loginData));
    render(<NavBar />);
    expect(screen.getByTestId("projects").textContent).toBe("Projects");
  });

  it("Register User link should be available for creospan admin role", () => {
    const loginData = {
      role: "creoadmin",
      success: true,
      token: "xyz",
    };
    localStorage.setItem("user", JSON.stringify(loginData));
    render(<NavBar />);
    expect(screen.getByTestId("register").textContent).toBe("Register User");
  });

  it("Tasks link should be available for employee role", () => {
    const loginData = {
      role: "employee",
      success: true,
      token: "xyz",
    };
    localStorage.setItem("user", JSON.stringify(loginData));
    render(<NavBar />);
    expect(screen.getByTestId("tasks").textContent).toBe("Tasks");
  });
});
