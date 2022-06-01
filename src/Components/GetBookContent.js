import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_CONTENT } from "../GraphQL/Query";

const GetBookContent = () => {
  const { error, loading, data } = useQuery(GET_BOOK_CONTENT);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPages(data.book.pages);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  pages.forEach((page, index) => {
    
    //TOKENS
    let allTokensOnEachPage = page.tokens;
    // console.log("WORD TOKENS ON EACH PAGE", allTokensOnEachPage);

    // VALUES AND POSITIONS fo each individual words
    let wordValues = [];
    let tokensArray = [];
    allTokensOnEachPage.forEach((token) => {
      // VALUES
      wordValues.push(token.value);

      //POSITIONS
      tokensArray.push(token.position);
    });

    for (let i = 0; i < allTokensOnEachPage.length; i++) {
      let startidx = tokensArray[i][0];
      let endidx = tokensArray[i][1];

      let wordContent = page.content.slice(startidx, endidx);
      console.log(
        "WORD CONTENT",
        wordContent,
        "WORD VALUE",
        wordValues[i],
        "WORD VALUE POSITION",
        tokensArray[i],
      );
    }
  });

  return (
    <div className="container">
      {/* <div>{JSON.stringify(pages)}</div> */}
      {pages.map((page, index) => {
        return <h1 key={page.content + index}>{page.content}</h1>;
      })}
    </div>
  );
};

export default GetBookContent;
