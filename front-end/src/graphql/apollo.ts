import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, from } from '@apollo/client';
import { onError } from "@apollo/link-error";
import { setContext } from '@apollo/link-context';

// see: https://github.com/graphql/swapi-graphql
const GRAPHQL_API_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

const TOKEN = '598ffa46592d1c7f57ccf8173e47290c6db0d549';
const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      Authorization: TOKEN,
    },
  };
});

const middleWare = new ApolloLink((operation, forward): any => {
  return forward(operation).map(response => {
    // request时对请求进行处理
    // console.log('middleWare', operation, forward)
    return response;
  })
})

const afterWare = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // 服务器返回数据
    console.log('afterWare--response', response)
    return response;
  })
})

const errorLink: any = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([asyncAuthLink, middleWare, afterWare, errorLink, httpLink]),
  // link: httpLink,
  // link: asyncAuthLink.concat(httpLink),
});
