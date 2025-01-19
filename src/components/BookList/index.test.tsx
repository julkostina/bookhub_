import React from "react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";
import { useGlobalContext } from "../../context";
import { render, screen } from "@testing-library/react";
import Book from "./Book";
import BookList from "../BookList";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
fetchMock.enableMocks();

const props = {
  title: "Sample Book",
  first_publish_year: "1990",
  edition_count: 3,
  author: ["Author1", "Author2"],
  id: "123",
  cover_img: "sample-image.jpg",
};
test("render Book component correctly", async () => {
  const { container } = render(
    <BrowserRouter>
      <Book {...props} />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

test("displays correct book title and author", () => {
  render(
    <BrowserRouter>
      <Book {...props} />
    </BrowserRouter>
  );
  expect(screen.getByText("Sample Book")).toBeInTheDocument();
  expect(screen.getByText("Author:")).toBeInTheDocument();
  expect(screen.getByText("Author1, Author2")).toBeInTheDocument();
  expect(screen.getByText("Total Editions:")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
  expect(screen.getByText("First Publish Year:")).toBeInTheDocument();
  expect(screen.getByText("1990")).toBeInTheDocument();
});

test("renders Link with correct URL", () => {
  render(
    <MemoryRouter>
      <Book {...props} />
    </MemoryRouter>
  );
  const link = screen.getByRole("link", { name: /sample book/i });
  expect(link).toHaveAttribute("href", "/book/123");
});

test("image has correct alt text", () => {
  render(
    <BrowserRouter>
      <Book {...props} />
    </BrowserRouter>
  );
  const image = screen.getByAltText("cover");
  expect(image).toHaveAttribute("src", "sample-image.jpg");
});

test("handles missing author gracefully", () => {
  render(
    <BrowserRouter>
      <Book {...{ ...props, author: [] }} />
    </BrowserRouter>
  );
  expect(screen.getByText("Author:")).toBeInTheDocument();
  expect(screen.getByText("Unknown author")).toBeInTheDocument();
});
test("handles missing cover image gracefully", () => {
  render(
    <BrowserRouter>
      <Book {...{ ...props, cover_img: "" }} />
    </BrowserRouter>
  );
  const img = screen.getByAltText("cover");
  expect(img.getAttribute("src")).toBe(
    `./${process.env.PUBLIC_URL}/img/book-cover.png`
  );
});

jest.mock("../../context", () => ({
  useGlobalContext: jest.fn(),
}));


test("renders BookList correctly", () => {
  mockedUseGlobalContext.mockReturnValue({
    books: [],
    loading: false,
    resultTitle: "Sample Title",
  });
  
  const { container } = render(<BookList />);
  expect(container).toMatchSnapshot();
});

test("renders loader when loading is true", () => {
  mockedUseGlobalContext.mockReturnValue({
    books: [],
    loading: true,
    resultTitle: "",
  });
  render(<BookList />);
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});
const mockedUseGlobalContext = useGlobalContext as jest.Mock;

test("renders books data", () => {
  mockedUseGlobalContext.mockReturnValue({
    books: [
      {
        id: "/works/123",
        first_publish_year: "1990",
        edition_count: 3,
        author: ["Author1", "Author2"],
        title: "Book Title 1",
        cover_img: "456",
      },
      {
        id: "/works/274",
        first_publish_year: "1989",
        edition_count: 1,
        author: ["Author61", "Author0"],
        title: "Book Title 2",
        cover_img: null
      },
    ],
    loading: false,
    resultTitle: "Test Results",
  });
  
  render(<BrowserRouter><BookList/></BrowserRouter>);
  expect(screen.getByText("Test Results")).toBeInTheDocument();
  expect(screen.getByText("Book Title 1")).toBeInTheDocument();
  expect(screen.getByText("Book Title 2")).toBeInTheDocument();
  expect(screen.getAllByAltText("cover")).toHaveLength(2);
});


test("renders correct book covers",()=>{

  mockedUseGlobalContext.mockReturnValue({
    books: [
      {
        id: "/works/123",
        first_publish_year: "1990",
        edition_count: 3,
        author: ["Author1", "Author2"],
        title: "Book Title 1",
        cover_img: "456",
      },
      {
        id: "/works/274",
        first_publish_year: "1989",
        edition_count: 1,
        author: ["Author61", "Author0"],
        title: "Book Title 2",
        cover_img: null
      },
    ],
    loading: false,
    resultTitle: "Test Results",
  });
  
  render(<BrowserRouter><BookList/></BrowserRouter>);
  const images = screen.getAllByAltText("cover");
  expect(images[0]).toHaveAttribute("src","/img/book-cover.png");
  expect(images[1]).toHaveAttribute("src","/img/book-cover.png");
})


test("renders no books found message", () => {
  mockedUseGlobalContext.mockReturnValue({
    books:[],
    loading:false,
    resultTitle:"No books found"
  })
  render(<BookList />);
  expect(screen.getByText("No books found")).toBeInTheDocument();
});

test("renders first 30 books", () => {
  const books= Array.from({length:40},(_,i)=>({
    title: `Book ${i+1}`,
  first_publish_year: "1990",
  edition_count: `${i+1}`,
  author: ["Author1", "Author2"],
  id: `${i+1}`,
  cover_img: "sample-image.jpg",
  }
  ));

  mockedUseGlobalContext.mockReturnValue({
    books,
    loading: false,
    resultTitle: "Books"
  })
  render(<BrowserRouter><BookList/></BrowserRouter>);
  expect(screen.getAllByRole("link")).toHaveLength(30);
});

test("handles invalid book data gracefully", () => {
  mockedUseGlobalContext.mockReturnValue({
    books: [
      { id: null,
        first_publish_year: null,
        edition_count: null,
        author: null,
        title: null,
        cover_img: null},
    ],
    loading: false,
    resultTitle: "Results",
  });

  render(<BrowserRouter><BookList/></BrowserRouter>);
  expect(screen.getByText("Results")).toBeInTheDocument();
  expect(screen.getByText("Unknown author")).toBeInTheDocument();
  expect(screen.getByAltText("cover")).toHaveAttribute("src", "/img/book-cover.png");
});