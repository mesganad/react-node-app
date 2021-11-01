import React from "react";
import { configure, shallow, mount } from "enzyme";
import { render, screen, fireEvent } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-17-updated";
import userEvent from "@testing-library/user-event";

import NavBar from "../NavBar/NavBar";

configure({ adapter: new Adapter() });

it("Testing Dashboard Link", () => {
  const loginData = {
    role: "creoadmin",
    success: true,
    token: "xyz",
  };
  localStorage.setItem("user", JSON.stringify(loginData));
  render(<NavBar />);
  expect(screen.getByTestId("creodash").textContent).toBe("Dashboard");
});
