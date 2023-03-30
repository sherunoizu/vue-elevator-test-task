import { createStore, createLogger } from "vuex";
import elevatorModule from "./elevatorModule/elevatorModule";

export const store = createStore({
  modules: { elevatorModule },

  plugins: [
    createLogger(),
    (store) => {
      store.subscribe((mutations, state) => {
        localStorage.setItem("vuex-state", JSON.stringify(state));
      });
    },
  ],
});
