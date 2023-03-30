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

import { ELEVATOR_STATUS } from "./elevatorConstants";

import {
  addNewElevator,
  getLessBusyElevatorId,
  timeoutElevatorOperationCommits,
} from "./helpFunctions";

export default {
  state() {
    return {
      elevatorsData: [...addNewElevator()],
      floorsQuantity: 5,
      elevatorsQuantity: 1,
    };
  },
  getters: {
    overallFloorsQue: (state) =>
      state.elevatorsData.map((elevator) => elevator.floorsQue).flat(),

    overallTargetFloors: (state) =>
      state.elevatorsData.map((elevator) => elevator.targetFloor),

    overallCurrentFloors: (state) =>
      state.elevatorsData.map((elevator) => elevator.currentFloor),

    overallElevatorStatus: (state) =>
      state.elevatorsData.map((elevator) => elevator.status),

    vacantElevatorIdByCurrentFloor: (state) => (floor) =>
      state.elevatorsData.findIndex(
        (elevator) =>
          elevator.currentFloor === floor &&
          elevator.status !== ELEVATOR_STATUS.BUSY
      ),

    elevatorIdExecutingFloor: (state) => (floor) =>
      state.elevatorsData.findIndex(
        (elevator) =>
          elevator.targetFloor === floor &&
          elevator.status === ELEVATOR_STATUS.BUSY
      ),
  },
  actions: {
    processFloor({ commit, state, getters }, floorNumber) {
      if (getters.elevatorIdExecutingFloor(floorNumber) !== -1) return;

      if (getters.vacantElevatorIdByCurrentFloor(floorNumber) !== -1) return;

      const lessBusyElevatorId = getLessBusyElevatorId(
        state.elevatorsData,
        floorNumber
      );

      commit(ADD_FLOOR_TO_ELEVATOR_QUE, {
        floorNumber,
        elevatorId: lessBusyElevatorId,
      });

      if (
        state.elevatorsData[lessBusyElevatorId].status ===
        ELEVATOR_STATUS.VACANT
      ) {
        commit(PASS_FLOOR_TO_ELEVATOR, {
          floorNumber,
          elevatorId: lessBusyElevatorId,
        });

        let currentFloor = state.elevatorsData[lessBusyElevatorId].currentFloor;
        let targetFloor = state.elevatorsData[lessBusyElevatorId].targetFloor;

        timeoutElevatorOperationCommits(commit, {
          currentFloor,
          targetFloor,
          elevatorId: lessBusyElevatorId,
        });
      }
    },
    continueOperations({ commit }, data) {
      const elevatorId = data.id;
      let currentFloor = data.currentFloor;
      let targetFloor = data.targetFloor;

      timeoutElevatorOperationCommits(commit, {
        currentFloor,
        targetFloor,
        elevatorId,
      });
    },

    increment({ commit }, settingProp) {
      commit(INCREMENT_SETTING_PROP, settingProp);
    },
    decrement({ commit }, settingProp) {
      commit(DECREMENT_SETTING_PROP, settingProp);
    },
    resetAllElevators({ commit }) {
      commit(RESET_ALL_ELEVATORS);
    },
  },
  mutations: {
    [ADD_FLOOR_TO_ELEVATOR_QUE](state, { floorNumber, elevatorId }) {
      if (state.elevatorsData[elevatorId].floorsQue.includes(floorNumber)) {
        return;
      }

      state.elevatorsData[elevatorId].floorsQue.push(floorNumber);
    },

    [PASS_FLOOR_TO_ELEVATOR](state, { floorNumber, elevatorId }) {
      const floorsQue = { ...state.elevatorsData[elevatorId] }.floorsQue;

      floorsQue.splice(0, 1);

      state.elevatorsData[elevatorId] = {
        ...state.elevatorsData[elevatorId],
        floorsQue,
        targetFloor: floorNumber,
        status: ELEVATOR_STATUS.BUSY,
      };
    },

    [CHANGE_ELEVATOR_CURRENT_FLOOR](state, { elevatorId, floorNumber }) {
      state.elevatorsData[elevatorId] = {
        ...state.elevatorsData[elevatorId],
        currentFloor: floorNumber,
      };
    },

    [CHANGE_ELEVATOR_BUSY_STATUS](state, { elevatorId, status }) {
      state.elevatorsData[elevatorId] = {
        ...state.elevatorsData[elevatorId],
        status: status,
      };
    },

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

    [RESET_ALL_ELEVATORS](state) {
      state.elevatorsData = state.elevatorsData.map((elevator) => ({
        ...elevator,
        targetFloor: 1,
        currentFloor: 1,
      }));
    },
  },
};
