import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import "./App.css";

// Logic to handle GraphQL and Network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Build link to query the API
const link = from([
  errorLink,
  new HttpLink({
    uri: "https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql",
  }),
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <h3>Ello Coding Challenge</h3>
      </ApolloProvider>
    </div>
  );
}

export default App;
