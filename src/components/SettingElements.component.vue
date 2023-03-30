<template>
  <div>SettingsElements</div>
  <div class="setting-element">
    <p>Floors Quantity: {{ floorsQuantity }}</p>
    <div class="setting-buttons">
      <div>
        <div
          v-show="floorsQuantity > 1"
          class="setting-buttons--item"
          @click="decrementSetting('floorsQuantity')"
        >
          -
        </div>
      </div>
      <div>
        <div
          v-show="floorsQuantity < 15"
          class="setting-buttons--item"
          @click="incrementSetting('floorsQuantity')"
        >
          +
        </div>
      </div>
    </div>
  </div>
  <div class="setting-element">
    <p>Elevators Quantity: {{ elevatorsQuantity }}</p>
    <div class="setting-buttons">
      <div>
        <div
          v-show="this.elevatorsQuantity > 1"
          class="setting-buttons--item"
          @click="decrementSetting('elevatorsQuantity')"
        >
          -
        </div>
      </div>
      <div>
        <div
          v-show="this.elevatorsQuantity < 8"
          class="setting-buttons--item"
          @click="incrementSetting('elevatorsQuantity')"
        >
          +
        </div>
      </div>
    </div>
  </div>
  <div class="setting-element">
    <p>RESET ALL ELVATORS</p>
    <div class="setting-reset" @click="reset()">
      <div>RESET</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SettingElements",
  computed: {
    ...mapState({
      floorsQuantity: (state) => state.elevatorModule.floorsQuantity,
      elevatorsQuantity: (state) => state.elevatorModule.elevatorsQuantity,
    }),
  },
  methods: {
    ...mapActions(["increment"]),
    ...mapActions(["decrement"]),
    ...mapActions(["resetAllElevators"]),

    incrementSetting(settingProp) {
      this.increment(settingProp);
    },
    decrementSetting(settingProp) {
      this.decrement(settingProp);
    },
    reset() {
      this.resetAllElevators();
    },
  },
};
</script>

<style lang="scss">
.setting {
  &-element {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-buttons {
    width: 120px;
    display: flex;
    justify-content: space-between;
    &--item {
      cursor: pointer;
      box-sizing: border-box;
      width: 50px;
      border: 1px solid black;
    }
  }
  &-reset {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100px;
    height: 60px;
    border: 1px solid black;
    background-color: rgba(255, 129, 129, 0.84);
    div {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
