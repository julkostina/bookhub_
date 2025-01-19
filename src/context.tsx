import React, { useState, useContext, useEffect, ReactNode } from "react";
import { useCallback } from "react";

const URL = "https://openlibrary.org/search.json?title=";
const AppContext = React.createContext<any>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("the lost world");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();
      const { docs } = data;
      // console.log(docs);
      if (docs) {
        const newBooks = docs.slice(0, 20).map((bookSingle:any) => {
          const {
            key,
            author_name,
            cover_i,
            title,
            edition_count,
            first_publish_year,
          } = bookSingle;
          return {
            id: key,
            author: author_name,
            title: title,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            cover_id: cover_i,
          };
        });
        setBooks(newBooks);
        console.log(newBooks);
        if(newBooks.length > 1){
          setResultTitle("Your Seach Result");
        }
        else{
          setResultTitle("No Result Found");
        }
      }
      else{
        setBooks([]);
        setResultTitle("No Result Found");
      }
        setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <AppContext.Provider
      value={{ loading, books, setSearchTerm, resultTitle, setResultTitle }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
