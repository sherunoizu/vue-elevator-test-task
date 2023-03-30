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
  actions: {},
  mutations: {
    [ADD_FLOOR_TO_ELEVATOR_QUE]() {},

    [PASS_FLOOR_TO_ELEVATOR]() {},

    [CHANGE_ELEVATOR_CURRENT_FLOOR]() {},

    [CHANGE_ELEVATOR_BUSY_STATUS]() {},

    [GET_STATE_FROM_STORAGE]() {},

    [INCREMENT_SETTING_PROP]() {},

    [DECREMENT_SETTING_PROP]() {},

    [RESET_ALL_ELEVATORS]() {},
  },
};
