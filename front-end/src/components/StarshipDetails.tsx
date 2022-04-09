import { useContext } from "react";
import { Text, View } from "react-native";
import { Button, Toast } from '@ant-design/react-native';
import { observer } from "mobx-react";
import ExpoLogo from "../assets/svgs/expo.svg";
import tailwind from "tailwind-rn";
import { Link } from "../../react-router.native";
import AppStore from "../stores/AppStore";

const StarshipDetails = ({ styles, starship }) => {
  const { text, update } = useContext(AppStore);
  return (
    <>
      <Button onPress={() => {
        update();
        Toast.info('This is a toast tips');
      }}>
        {text}
      </Button>
      <ExpoLogo width={120} height={120} fill="black" />
      <Link to="/" style={tailwind("bg-blue-500 px-5 py-3 rounded-full")}>
        <Text>Home</Text>
      </Link>
      <Link to="/about">
        <Text>About</Text>
      </Link>
      <View style={styles.section}>
        <Text style={styles.starshipName}>{starship.name}</Text>
        <Text style={styles.starshipModel}>{starship.model}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Operational abilities</Text>
        <Text>- {starship.crew} crew members</Text>
        <Text>- {starship.consumables} without restocking</Text>
      </View>

      <View>
        <Text style={styles.label}>Ship attributes</Text>
        <Text>- {starship.length}m long</Text>
        <Text>- {starship.costInCredits} credits</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Manufacturers</Text>
        {starship.manufacturers.map((manufacturer) => (
          <Text key={manufacturer}>- {manufacturer}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Appeared in</Text>
        {starship.filmConnection.films.map((film) => (
          <Text key={film.id}>- {film.title}</Text>
        ))}
      </View>
    </>
  );
}

export default observer(StarshipDetails);