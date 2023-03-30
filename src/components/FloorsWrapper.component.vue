<template>
  <div class="floors">
    <FloorsLevelComponent
      v-for="floorNumber in stateFloorsQuantity"
      :key="floorNumber"
      :floorNumber="floorNumber"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FloorsLevelComponent from "./FloorsLevel.component.vue";

export default {
  name: "FloorsWrapper",
  components: {
    FloorsLevelComponent,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      stateFloorsQuantity: (state) => state.elevatorModule.floorsQuantity,
    }),
  },
};
</script>

<style lang="scss">
.floors {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
</style>
