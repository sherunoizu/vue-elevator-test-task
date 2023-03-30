import { ELEVATOR_STATUS } from "./elevatorConstants";

export const addNewElevator = (newId = 0) => [
  {
    id: newId,
    targetFloor: 1,
    currentFloor: 1,
    status: ELEVATOR_STATUS.VACANT,
    floorsQue: [],
  },
];
