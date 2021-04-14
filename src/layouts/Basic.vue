<template>
  <v-app>
    <app-loading />
    <app-alerts />

    <v-main>
      <v-container fluid class="fill-height pa-6 grey lighten-5">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppLoading from "@/components/AppLoading"
import AppAlerts from "@/components/AppAlerts"
export default {
  components: {AppAlerts, AppLoading}
}
</script>

<style scoped>

</style>