import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { LIST_STARSHIPTS, GET_STARSHIP } from "../graphql/index";

const StarshipPicker = (props) => {
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
};

export default StarshipPicker;