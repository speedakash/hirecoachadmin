import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./override.scss";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import RouterAdmin from "./router/router";

import { createUploadLink } from "apollo-upload-client";

// const client = new ApolloClient({
//   //uri: "https://powerful-brushlands-87241.herokuapp.com/graphql",
//   //uri: "http://192.168.1.106:3001/graphql",
//   uri: "http://localhost:3001/graphql",
// });

// const uploadLink = createUploadLink({
//   uri: "http://localhost:3001", // Apollo Server is served from port 4000
//   headers: {
//     "keep-alive": "true",
//   },
// });

const client = new ApolloClient({
  link: createUploadLink({
    uri: "https://powerful-brushlands-87241.herokuapp.com/graphql",
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterAdmin></RouterAdmin>
    </ApolloProvider>
  );
}

export default App;
