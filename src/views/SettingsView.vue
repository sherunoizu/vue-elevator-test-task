<template>
  <div class="about">
    <h1>This is a settings page</h1>
    <SettingsElementsComponent />
  </div>
</template>

<script>
import SettingsElementsComponent from "@/components/SettingElements.component.vue";

export default {
  name: "SettingsView",
  components: { SettingsElementsComponent },
};
</script>
