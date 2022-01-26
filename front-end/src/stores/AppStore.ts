import { createContext } from "react";
import { observable, action } from "mobx";

class AppStore {
  @observable public text: string = "";

  @action
  update = () => {
    this.text = "开始";
  }
}

export default createContext(new AppStore());