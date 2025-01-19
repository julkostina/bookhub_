import React from 'react'
import Home from './index'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { useGlobalContext } from '../../context';

jest.mock("../../context");
const mockedUseGlobalContext = useGlobalContext as jest.Mock;

test('renders Home component',  () => {
    const setSearchTerm = jest.fn();
    const setResultTitle = jest.fn();
    mockedUseGlobalContext.mockReturnValue({
      setSearchTerm,
      setResultTitle,
    });
  render(<BrowserRouter><Home/></BrowserRouter>);
  expect(screen.getByTestId("header")).toBeInTheDocument();
  expect(screen.getByText(/Find your favorite books here/i)).toBeInTheDocument();
  expect(screen.getByTestId("search-form")).toBeInTheDocument();
});