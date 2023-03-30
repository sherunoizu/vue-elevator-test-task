import elevatorTypes from "./elevatorTypes";
const { CHANGE_ELEVATOR_CURRENT_FLOOR, CHANGE_ELEVATOR_BUSY_STATUS } =
  elevatorTypes;

import { ELEVATOR_STATUS, CHILL_TIME } from "./elevatorConstants";

export const addNewElevator = (newId = 0) => [
  {
    id: newId,
    targetFloor: 1,
    currentFloor: 1,
    status: ELEVATOR_STATUS.VACANT,
    floorsQue: [],
  },
];

export const getLessBusyElevatorId = (elevatorsData, floorNumber) => {
  const vacantElevators = elevatorsData.filter(
    (elevator) => elevator.status === ELEVATOR_STATUS.VACANT
  );

  if (vacantElevators.length !== 0) {
    let id = 0;
    let oldVal = elevatorsData.length + 1;

    vacantElevators.forEach((elevator) => {
      const newVal = Math.abs(elevator.targetFloor - floorNumber);

      if (newVal <= oldVal) {
        oldVal = newVal;
        id = elevator.id;
      }
    });

    return id;
  }

  let id;
  const targetFloorDistances = elevatorsData.map((elevator) =>
    elevator.floorsQue.reduce(
      (prev, curr) => prev + Math.abs(elevator.targetFloor - curr) + 3,
      0
    )
  );

  id = targetFloorDistances.indexOf(Math.min(...targetFloorDistances));

  return id;
};

export const timeoutElevatorOperationCommits = (
  commit,
  { currentFloor, targetFloor, elevatorId }
) => {
  let i = currentFloor;
  const timeout = Math.abs(targetFloor - currentFloor) * 1000;

  commit(CHANGE_ELEVATOR_CURRENT_FLOOR, { elevatorId, floorNumber: i });
  i < targetFloor ? i++ : i--;

  const interval = setInterval(() => {
    commit(CHANGE_ELEVATOR_CURRENT_FLOOR, { elevatorId, floorNumber: i });
    i < targetFloor ? i++ : i--;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    commit(CHANGE_ELEVATOR_BUSY_STATUS, {
      elevatorId,
      status: ELEVATOR_STATUS.CHILL,
    });
  }, timeout);

  setTimeout(() => {
    commit(CHANGE_ELEVATOR_BUSY_STATUS, {
      elevatorId,
      status: ELEVATOR_STATUS.VACANT,
    });
  }, timeout + CHILL_TIME - 1);
};
