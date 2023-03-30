<template>
  <div class="elevators">
    <ElevatorCabComponent
      v-for="elevator in elevatorsData"
      :key="elevator.id"
      :id="elevator.id"
      :targetFloor="elevator.targetFloor"
      :currentFloor="elevator.currentFloor"
      :status="elevator.status"
      :floorsQue="elevator.floorsQue"
    />
  </div>
</template>

<script>
import ElevatorCabComponent from "./ElevatorCab.component.vue";

import { mapState } from "vuex";

export default {
  name: "ElevatorsWrapper",
  components: {
    ElevatorCabComponent,
  },
  computed: {
    ...mapState({
      elevatorsData: (state) => state.elevatorModule.elevatorsData,
    }),
  },
};
</script>

<style lang="scss">
.elevators {
  display: flex;
}
</style>
