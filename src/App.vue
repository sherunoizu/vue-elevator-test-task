<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link
      :to="isSettingsActiveLink"
      class="settings"
      :class="isSettingsActiveClass"
      >Settings</router-link
    >
  </nav>
  <router-view />
</template>

<script>
import { mapGetters } from "vuex";

import elevatorTypes from "./store/elevatorModule/elevatorTypes";
const { GET_STATE_FROM_STORAGE } = elevatorTypes;

import { ELEVATOR_STATUS } from "./store/elevatorModule/elevatorConstants";

export default {
  name: "App",
  beforeCreate() {
    this.$store.commit(GET_STATE_FROM_STORAGE);
  },
  computed: {
    ...mapGetters(["overallElevatorStatus"]),

    isAllElevatorsVacant() {
      const vacantElevators = this.overallElevatorStatus.filter(
        (item) => item === ELEVATOR_STATUS.VACANT
      ).length;

      const allElevators = this.overallElevatorStatus.length;

      return vacantElevators === allElevators;
    },

    isSettingsActiveClass() {
      return this.isAllElevatorsVacant ? "" : "disabled";
    },
    isSettingsActiveLink() {
      return this.isAllElevatorsVacant ? "/settings" : "/";
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.settings {
  &.disabled {
    cursor: default;
    color: rgba(70, 63, 63, 0.133);
  }
}
</style>
