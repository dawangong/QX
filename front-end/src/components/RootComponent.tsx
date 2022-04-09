import { useContext, useEffect } from "react";
import { observer } from "mobx-react";

import AppStore from "../stores/AppStore";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

import StarshipDetails from "../components/StarshipDetails";
import StarshipPicker from "../components/StarshipPicker";

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

const RootComponent = () => {
  const { getStarShip, data, loading } = useContext(AppStore);

  useEffect(() => {
    // getStarShip();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <StarshipPicker />
        <Text>111</Text>
      </View>
      {loading ? (
        <ActivityIndicator color="#333" />
      ) : (
        <StarshipDetails styles={styles} starship={data.starship} />
      )}
    </View>
  );
};

export default observer(RootComponent);