import React from "react";
import { render,screen } from "@testing-library/react";
import About from "./index";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

test("renders About component", () => {
  const { container } = render(<BrowserRouter><About /></BrowserRouter>);
  expect(container).toMatchSnapshot();
});

test("renders About component with correct text", () => {
    render(<BrowserRouter><About /></BrowserRouter>);
    expect(screen.getByTestId("bookhub")).toBeInTheDocument();
    expect(screen.getByText("BookHub is a comprehensive online platform designed for book enthusiasts and researchers alike. It allows users to easily find detailed information on a vast collection of books across various genres. Each book listing on BookHub includes key information such as the book's title, a brief description, author details, date of publication, genre, and user reviews. The platform also offers personalized recommendations, allowing users to explore new books based on their reading preferences. Whether you're looking for the latest releases, classic literature, or specific authors, BookHub makes book discovery simple and engaging.")).toBeInTheDocument();
    expect(screen.getByText("Enjoy your time with BookHub!")).toBeInTheDocument();
    expect(screen.getByText("Author:")).toBeInTheDocument();
    expect(screen.getByText("Yulia Kostina")).toBeInTheDocument();
    expect(screen.getByText("Based on:")).toBeInTheDocument();
    expect(screen.getByText("OpenLibrary")).toBeInTheDocument();
    });

test("renders About component with correct links", () => {
    render(<BrowserRouter><About /></BrowserRouter>);
    expect(screen.getByText("Yulia Kostina")).toHaveAttribute("href","https://github.com/julkostina");
    expect(screen.getByText("OpenLibrary")).toHaveAttribute("href","https://openlibrary.org/");
});