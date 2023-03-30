<template>
  <div class="elevator-layout">
    <ElevatorWrapperComponent />
    <FloorsWrapperComponent />
  </div>
</template>

<script>
import FloorsWrapperComponent from "./FloorsWrapper.component.vue";
import ElevatorWrapperComponent from "./ElevatorWrapper.component.vue";

export default {
  name: "ElevatorLayout",
  components: {
    ElevatorWrapperComponent,
    FloorsWrapperComponent,
  },
};
</script>

<style lang="scss">
.elevator-layout {
  display: flex;
  border-bottom: 50px solid #2c3e50;
  border-top: 50px solid #2c3e50;
}
</style>
