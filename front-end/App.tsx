
import { Provider } from '@ant-design/react-native';
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./src/graphql/apollo";
import { Router, Switch } from "./react-router.native";
import ProjectRoute from "./src/routes";
import RootComponent from "./src/components/RootComponent";

export default function App() {
  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <Provider>
          <Switch>
            <ProjectRoute />
          </Switch>
          <RootComponent />
        </Provider>
      </ApolloProvider>
    </Router>
  );
}
