import { createStore, createLogger } from "vuex";
import elevatorModule from "./elevatorModule/elevatorModule";

export const store = createStore({
  modules: { elevatorModule },

  plugins: [
    createLogger(),
    // TODO: add store sub to set state in localStor
  ],
});
