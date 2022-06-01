import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_CONTENT } from "../GraphQL/Query";

const GetBookContent = () => {
  const { error, loading, data } = useQuery(GET_BOOK_CONTENT);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (data) {
      setPages(data.book.pages);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container">
      <div>{JSON.stringify(pages)}</div>
    </div>
  );
};

export default GetBookContent;
