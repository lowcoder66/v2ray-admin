<template>
  <v-app>
    <app-loading />
    <app-alerts />

    <!--
    <v-system-bar app>v-system-bar</v-system-bar>
    -->
    <app-nav />

    <app-bar />

    <v-main>
      <v-container fluid class="fill-height pa-6 align-content-start grey lighten-5">
        <v-breadcrumbs class="pt-0 pb-4 px-0" :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.href" :to="item.to" :disabled="item.disabled">
              <v-icon size="14" class="mr-2" >{{ item.icon }}</v-icon>
              <span>{{ item.text }}</span>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
        <router-view />
      </v-container>
    </v-main>

    <!--
    <v-footer app>v-footer</v-footer>
    -->
    <!--
    <v-bottom-navigation app>v-bottom-navigation</v-bottom-navigation>
    -->
  </v-app>
</template>

<script>
import AppLoading from "@/components/AppLoading"
import AppAlerts from "@/components/AppAlerts"
import AppNav from "@/components/admin/AppNav"
import AppBar from "@/components/admin/AppBar"

export default {
  components: {AppBar, AppNav, AppAlerts, AppLoading},
  data: () => ({
    items: [
      {
        text: 'Index',
        disabled: false,
        to: '/',
        icon: 'mdi-view-dashboard-outline',
      },
      {
        text: 'Users',
        disabled: false,
        to: '/management/users',
        icon: 'mdi-account-group-outline',
      },
    ],
  }),
};
</script>

<style scoped>

</style>