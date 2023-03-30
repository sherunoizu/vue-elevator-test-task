<template>
  <div class="info">
    <div class="info-indicator">
      <img
        v-if="moveDirection === 'UP'"
        src="../assets/arrow-up.png"
        width="12"
        height="12"
      />

      <img
        v-if="moveDirection === 'DOWN'"
        src="../assets/arrow-down.png"
        width="12"
        height="12"
      />
      <div class="info-arrival" v-if="moveDirection === ''">
        Floor #{{ targetFloorNumber }}
      </div>
    </div>
    <span class="info-number" v-if="moveDirection !== ''">{{
      targetFloorNumber
    }}</span>
  </div>
</template>

<script>
export default {
  name: "ElevatorInfo",
  props: {
    targetFloorNumber: {
      type: Number,
      required: true,
    },
    moveDirection: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  margin-top: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: #fb6464;
  border-radius: 2px;

  &-number {
    margin-left: 10px;
    color: #000000;
    font-size: 14px;
  }

  &-arrival {
    display: block;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
}
</style>
