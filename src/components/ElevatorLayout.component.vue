<template>
  <div class="elevator-layout">
    //TODO: add elevator UI component
    <FloorsWrapperComponent />
  </div>
</template>

<script>
import FloorsWrapperComponent from "./FloorsWrapper.component.vue";

export default {
  name: "ElevatorLayout",
  components: {
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
