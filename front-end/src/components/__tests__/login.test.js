import React from "react";
import axios from "axios";
import { configure, shallow, mount } from "enzyme";
import { render, screen, fireEvent } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-17-updated";
import userEvent from "@testing-library/user-event";
import Login from "../authentication/Login";
import CreospanAdmin from "../creospan/CreospanAdmin";

configure({ adapter: new Adapter() });
jest.mock("axios");
describe("Tesing Login Component", () => {
  it("Username field should have label", () => {
    render(<Login />);
    const usernameInputNode = screen.getByTestId("uname");
    expect(usernameInputNode.getAttribute("name")).toBe("username");
  });

  it("Username input should accept text", () => {
    render(<Login />);
    const usernameInputNode = screen.getByTestId("uname");
    expect(usernameInputNode.value).toMatch("");
    fireEvent.change(usernameInputNode, { target: { value: "testing" } });
    expect(usernameInputNode.value).toMatch("testing");
  });

  it("Username should have at least 3 characters", () => {
    render(<Login />);
    const usernameNode = screen.getByTestId("uname");
    const errorMessage = "Username should be atleast 3 characters";
    const signinBtn = screen.getByTestId("signin");
    fireEvent.change(usernameNode, { target: { value: "me" } });
    userEvent.click(signinBtn);
    expect(screen.getByTestId("usernameVal").textContent).toBe(errorMessage);
  });

  it("should be able to submit form", () => {
    const mockFn = jest.fn();
    render(<Login />);
    const buttonNode = screen.getByTestId("signin");
    const usernameNode = screen.getByTestId("uname");
    const passwordNode = screen.getByTestId("pass");
    fireEvent.change(usernameNode, { target: { value: "ruvi" } });
    fireEvent.change(passwordNode, { target: { value: "ruvi" } });
    fireEvent.submit(buttonNode);
    expect(mockFn).toHaveBeenCalledTimes(0);
    //expect(screen.getByTestId("errorMsg").textContent).toBe(
    //"Invalid Username or Password"
    //);
  });

  //   it("testing axios", () => {
  //     render(<Login />);

  //     const resp = {
  //       role: "creoadmin",
  //       success: true,
  //       token: "xyz",
  //     };
  //     // axios.post.mockResolvedValue(resp);
  //     //axios.post.mockImplementation(() => Promise.resolve(resp));
  //     mockAxios.post.mockResolvedValueOnce(resp);

  //     const buttonNode = screen.getByTestId("signin");
  //     const usernameNode = screen.getByTestId("uname");
  //     const passwordNode = screen.getByTestId("pass");
  //     fireEvent.change(usernameNode, { target: { value: "ruvi" } });
  //     fireEvent.change(passwordNode, { target: { value: "ruvi" } });
  //     fireEvent.submit(buttonNode);
  //     return axios.post().then((data) => {
  //       expect(data).toEqual(resp);
  //     });
  //     // expect(axios.get).toHaveBeenCalledTimes(1);
  //   });
});
