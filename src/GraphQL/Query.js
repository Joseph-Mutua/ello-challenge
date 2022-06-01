import { gql } from "@apollo/client";

export const GET_BOOK_CONTENT = gql`
  query {
    book {
      pages {
        content
        tokens {
          position
          value
        }
      }
    }
  }
`;