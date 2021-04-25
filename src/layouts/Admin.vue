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
    items: [ ],
  }),
  watch: {
    '$route'(val) {
      this.buildBreadcrumbs(val)
    }
  },
  created() {
    this.buildBreadcrumbs()
  },
  computed: {
    indexBreadcrumb() {
      let r = this.$router.match("/")
      let b =  {
        to: '/',
        text: '首页',
        icon: 'mdi-view-dashboard-outline',
        disabled: false,
      }
      if (r) {
        b = this.routeToBreadcrumb(r)
        b.text = "首页"
      }

      return b
    }
  },
  methods: {
    buildBreadcrumbs(route) {
      let items = [this.indexBreadcrumb]

      // 目前只考虑两层
      if (route && route.path !== this.indexBreadcrumb.to) {
        items.push(this.routeToBreadcrumb(route))
      }

      this.items = items
    },
    routeToBreadcrumb(route) {
      return {
        text: (route.meta && route.meta.title) || route.name,
        to: route.path,
        icon: (route.meta && route.meta.icon) || 'mdi-chevron-right',
        disabled: false,
      }
    }
  },
}
</script>

<style scoped>

</style>