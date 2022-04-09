import { createContext } from "react";
import { observable, action } from "mobx";
import { LIST_STARSHIPTS, GET_STARSHIP } from "../graphql/index";

class AppStore {
  @observable public text: string = "";
  @observable public id: string = "c3RhcnNoaXBzOjM=";
  @observable public data: any = {
    detail: {},
  };
  @observable public loading: any = {
    detail: false,
  }

  @action
  update = () => {
    this.text = "开始";
  }

  @action
  getStarShip = () => {
    const { data, error, loading } = GET_STARSHIP({
      variables: { id: this.id },
    });

    return { data, loading };

    if (error) {
      console.log("Error fetching starship", error);
    } else {
      this.data.detail = data;
      this.loading.detail = loading;
    }
  }
}

export default createContext(new AppStore());