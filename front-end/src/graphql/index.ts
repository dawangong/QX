import { gql, useQuery } from "@apollo/client";

export const LIST_STARSHIPTS = () => useQuery(gql`
  query listStarships {
    allStarships {
      starships {
        id
        name
      }
    }
  }
`);

export const GET_STARSHIP = (variables: any) => useQuery(gql`
  query getStarship($id: ID!) {
    starship(id: $id) {
      id
      name
      model
      starshipClass
      manufacturers
      length
      crew
      costInCredits
      consumables
      filmConnection {
        films {
          id
          title
        }
      }
    }
  }
`, variables);