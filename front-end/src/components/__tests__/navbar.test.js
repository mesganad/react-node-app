import React from "react";
import { configure, shallow, mount } from "enzyme";
import { render, screen, fireEvent } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-17-updated";
import userEvent from "@testing-library/user-event";

import App from "../../App";
import NavBar from "../NavBar/NavBar";

configure({ adapter: new Adapter() });

describe("Tesing NavBar Component", () => {
  it("Test Rendering", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists(NavBar)).toEqual(true);
  });
});
