import React from "react";
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Header from ".";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

test("renders header correctly",()=>{
    const {container} = render(<BrowserRouter><Header/></BrowserRouter>);
    expect(container).toMatchSnapshot();
})

test("renders logo and title correctly",()=>{
    render(<BrowserRouter><Header /></BrowserRouter>);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("BookHub")).toBeInTheDocument();
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom",()=>({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

test("navigates to the correct route when Home/About clicked",()=>{

    render(<MemoryRouter><Header /></MemoryRouter>);
    const home =  screen.getByText("Home");
    userEvent.click(home);  
    expect(mockNavigate).toHaveBeenCalledWith('/');

    const about = screen.getByText("About");
    userEvent.click(about);
    expect(mockNavigate).toHaveBeenCalledWith('/about');
})


