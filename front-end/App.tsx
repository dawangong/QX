import { ApolloProvider } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Router, Switch } from "./react-router.native";
import ProjectRoute from "./src/routes";

import { ActivityIndicator, StyleSheet, View } from "react-native";

import { apolloClient } from "./src/graphql/apollo";
import { LIST_STARSHIPTS, GET_STARSHIP } from "./src/graphql/index";

import { Provider } from '@ant-design/react-native';
import StarshipDetails from "./StarshipDetails";


// Imperial I-class Star Destroyer
const defaultStarshipId = "c3RhcnNoaXBzOjM=";


function RootComponent() {
  const [starshipId, setStarshipId] = useState(defaultStarshipId);
  const { data, error, loading } = GET_STARSHIP({
    variables: { id: starshipId },
  });

  if (error) {
    console.log("Error fetching starship", error);
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <StarshipPicker
          starshipId={starshipId}
          onStarshipChange={setStarshipId}
        />
      </View>
      {loading ? (
        <ActivityIndicator color="#333" />
      ) : (
        <StarshipDetails styles={styles} starship={data.starship} />
      )}
    </View>
  );
}

function StarshipPicker(props) {
  const { data, error, loading } = LIST_STARSHIPTS();

  if (error) {
    console.log("Error listing starships", error);
  }
  if (loading) return null;

  const { starships } = data.allStarships;

  return (
    <Picker
      selectedValue={props.starshipId}
      onValueChange={props.onStarshipChange}
    >
      {starships.map((starship) => (
        <Picker.Item
          key={starship.id}
          label={starship.name}
          value={starship.id}
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  label: {
    marginBottom: 2,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  section: {
    marginVertical: 12,
  },
  starshipName: {
    fontSize: 32,
    fontWeight: "bold",
  },
  starshipModel: {
    fontStyle: "italic",
  },
});

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
