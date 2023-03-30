import elevatorTypes from "./elevatorTypes";
const {
  ADD_FLOOR_TO_ELEVATOR_QUE,
  PASS_FLOOR_TO_ELEVATOR,
  CHANGE_ELEVATOR_CURRENT_FLOOR,
  CHANGE_ELEVATOR_BUSY_STATUS,
  GET_STATE_FROM_STORAGE,
  INCREMENT_SETTING_PROP,
  DECREMENT_SETTING_PROP,
  RESET_ALL_ELEVATORS,
} = elevatorTypes;

import { addNewElevator } from "./helpFunctions";

export default {
  state() {
    return {
      elevatorsData: [...addNewElevator()],
      floorsQuantity: 5,
      elevatorsQuantity: 1,
    };
  },
  getters: {},
  actions: {
    increment({ commit }, settingProp) {
      commit(INCREMENT_SETTING_PROP, settingProp);
    },
    decrement({ commit }, settingProp) {
      commit(DECREMENT_SETTING_PROP, settingProp);
    },
  },
  mutations: {
    [ADD_FLOOR_TO_ELEVATOR_QUE]() {},

    [PASS_FLOOR_TO_ELEVATOR]() {},

    [CHANGE_ELEVATOR_CURRENT_FLOOR]() {},

    [CHANGE_ELEVATOR_BUSY_STATUS]() {},

    [GET_STATE_FROM_STORAGE]() {},

    [INCREMENT_SETTING_PROP](state, propName) {
      if (propName === "elevatorsQuantity") {
        const newElevator = addNewElevator(state.elevatorsData.length);

        state.elevatorsData = [...state.elevatorsData, ...newElevator];
      }

      state[propName]++;
    },

    [DECREMENT_SETTING_PROP](state, propName) {
      if (propName === "elevatorsQuantity") {
        state.elevatorsData = state.elevatorsData.slice(0, -1);
      }

      state[propName]--;
    },

    [RESET_ALL_ELEVATORS]() {},
  },
};
