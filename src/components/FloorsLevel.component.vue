<template>
  <div class="floor">
    <div class="floor-wrapper">
      <p class="floor-label">{{ floorNumber }}</p>

      <div
        class="floor-button-container"
        :class="floorButtonContainerClass"
        @click="floorButtonClickHandler(floorNumber)"
      >
        <span class="floor-button-decoration" :class="buttonDecorationClass" />
        <button class="button" type="button" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "FloorsLevel",
  props: {
    floorNumber: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState({
      elevatorsData: (state) => state.elevatorModule.elevatorsData,
    }),
    ...mapGetters(["overallFloorsQue"]),

    isActiveFloor() {
      return (
        this.overallFloorsQue.includes(this.floorNumber) ||
        this.elevatorsData
          .filter((elevator) => elevator.currentFloor !== elevator.targetFloor)
          .findIndex(
            (elevator) => elevator.targetFloor === this.floorNumber
          ) !== -1
      );
    },
    floorButtonContainerClass() {
      return this.isActiveFloor ? "floor-button-container--active" : "";
    },
    buttonClass() {
      return this.isActiveFloor ? "button--active" : "";
    },
    buttonDecorationClass() {
      return this.isActiveFloor ? "floor-button-decoration--active" : "";
    },
  },
  methods: {
    floorButtonClickHandler(floorNumber) {
      console.log(floorNumber);
      // TODO: add action to change floor
    },
  },
};
</script>

<style lang="scss">
.floor {
  width: 50px;
  height: 100px;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  &-wrapper {
    display: flex;
    gap: 15px;
    flex-direction: row;
    position: relative;
  }
  &-label {
    cursor: pointer;
    pointer-events: none;
    font-size: 12px;
    margin: 0;
    position: absolute;
    left: 6px;
    top: 3px;
    z-index: 10;
  }
  &-button {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: 0;
    padding: 0;
    height: 13px;
    width: 13px;
    border: 0px solid #2c3e50;
    border-radius: 50%;
    translate: -50% -50%;

    &-container {
      position: relative;
      width: 20px;
      height: 20px;
      background-color: #2c3e50;
      border-radius: 2px;
      &:active,
      &:hover {
        cursor: pointer;
        background-color: #2c3e50;
        & .floor-button {
          background-color: #2c3e50;
          &-decoration {
            background-color: #e5ff00;
          }
        }
      }
    }
    &-decoration {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      display: block;
      width: 14px;
      height: 14px;
      background-color: #adb942;
      translate: -50% -50%;
    }
  }
}

.floor-button-decoration--active {
  cursor: default;
  background-color: #e5ff00;
}
</style>
