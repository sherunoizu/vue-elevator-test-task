<template>
  <div class="elevator-shaft">
    <div
      v-for="floorNumber in stateFloorsQuantity"
      :key="floorNumber"
      class="elevator-floor"
      :class="
        getActiveFloorClass(floorNumber) +
        ' ' +
        getMoveDirectionClass(floorNumber) +
        ' ' +
        getElevatorWaitingClass(floorNumber)
      "
    >
      <ElevatorInfoComponent
        v-if="isActiveElevator(floorNumber)"
        :targetFloorNumber="targetFloor"
        :moveDirection="moveDirection"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import {
  ELEVATOR_STATUS,
  ELEVATOR_MOVING_DIRECTION,
} from "@/store/elevatorModule/elevatorConstants";

import ElevatorInfoComponent from "./ElevatorInfo.component.vue";

export default {
  name: "ElevatorCab",
  components: { ElevatorInfoComponent },
  props: {
    id: {
      type: Number,
      required: true,
    },
    targetFloor: {
      type: [Number, null],
    },
    currentFloor: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    floorsQue: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      elevatorState: (state) =>
        state.elevatorModule.elevatorsData.map((item) => item),
      stateFloorsQuantity: (state) => state.elevatorModule.floorsQuantity,
      statusState: (state) =>
        state.elevatorModule.elevatorsData.map((item) => item.status),
    }),

    moveDirection() {
      const floorDifference = this.targetFloor - this.currentFloor;

      return floorDifference === 0
        ? ""
        : floorDifference > 0
        ? ELEVATOR_MOVING_DIRECTION.UP
        : ELEVATOR_MOVING_DIRECTION.DOWN;
    },
  },
  methods: {
    ...mapActions(["processFloor", "continueOperations"]),

    getActiveFloorClass(floorNumber) {
      return floorNumber === this.currentFloor ? "elevator-floor--active" : "";
    },
    getMoveDirectionClass(floorNumber) {
      if (
        this.status !== ELEVATOR_STATUS.VACANT &&
        floorNumber === this.currentFloor
      ) {
        return this.targetFloor - this.currentFloor >= 0
          ? "elevator-floor--moving-up"
          : "elevator-floor--moving-down";
      }

      return "";
    },
    isActiveElevator(floorNumber) {
      return this.status !== ELEVATOR_STATUS.VACANT &&
        floorNumber === this.currentFloor
        ? true
        : false;
    },
    getElevatorWaitingClass(floorNumber) {
      return this.status === ELEVATOR_STATUS.CHILL &&
        floorNumber === this.targetFloor
        ? "elevator-floor--chill"
        : "";
    },
  },
  watch: {
    statusState() {
      const currentElevator = this.elevatorState.map((item) => item.status);
      if (
        this.floorsQue.length !== 0 &&
        currentElevator[this.id] === ELEVATOR_STATUS.VACANT
      ) {
        this.processFloor(this.floorsQue[0]);
      }
    },
  },
  mounted() {
    if (this.status !== ELEVATOR_STATUS.VACANT) {
      this.continueOperations({
        id: this.id,
        targetFloor: this.targetFloor,
        currentFloor: this.currentFloor,
        status: this.status,
        floorsQue: this.floorsQue,
      });
    }
  },
};
</script>

<style lang="scss">
.elevator-shaft {
  display: flex;
  flex-direction: column-reverse;
  margin-right: 10px;
  border: 2px solid #2c3e50;
  border-bottom: none;
  border-top: none;

  &:last-child {
    margin-right: 0;
  }
}
.elevator-floor {
  width: 100px;
  height: 100px;
  &--active {
    background-color: #42b983;
  }

  &--moving-up {
    @keyframes float-up {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-100px);
      }
    }

    animation: float-up 1s linear;
  }

  &--moving-down {
    @keyframes float-down {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(100px);
      }
    }

    animation: float-down 1s linear;
  }

  &--chill {
    @keyframes blink {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    animation: blink 3s linear;
  }
}
</style>
