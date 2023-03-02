import React from "react";
import { useApolloClient, gql } from "@apollo/client";

const GET_USER = gql`
  query GetUser {
    user {
      id
      name
    }
  }
`;

const HomePage = () => {
  const { query } = useApolloClient();

  const handleDirectRequest = async () => {
    try {
      const result = await query({
        query: GET_USER,
        fetchPolicy: "no-cache",
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProxyRequest = async () => {
    try {
      const result = await query({
        query: GET_USER,
        fetchPolicy: "no-cache",
        context: {
          useProxy: true,
        },
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      Home Page
      <div style={{ margin: "1em" }}>
        <button onClick={handleDirectRequest}>Execute Direct Request</button>
      </div>
      <div style={{ margin: "1em" }}>
        <button onClick={handleProxyRequest}>Execute Proxy Request</button>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // set sample samesite httpOnly cookie
  ctx.res.setHeader(
    "Set-Cookie",
    "user=John Doe; HttpOnly; sameSite=strict; path=/"
  );

  return { props: {} };
};

export default HomePage;
