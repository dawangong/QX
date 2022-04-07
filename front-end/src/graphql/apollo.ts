import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, from } from '@apollo/client';
import { onError } from "@apollo/link-error";
import { setContext } from '@apollo/link-context';

// see: https://github.com/graphql/swapi-graphql
const GRAPHQL_API_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

const TOKEN = '';
const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      Authorization: TOKEN,
    },
  };
});

const middleWare = new ApolloLink((operation, forward): any => {
  // request时对请求进行处理
  console.log('middleWare', operation, forward)
})

const afterWare = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // 服务器返回数据
    console.log('afterWare--response', response)
    return response
  })
})

const errorLink: any = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([httpLink, asyncAuthLink, middleWare, afterWare, errorLink]),
  // link: httpLink,
  // link: asyncAuthLink.concat(httpLink),
});
