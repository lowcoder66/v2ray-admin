<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="handleClickNavIcon"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-btn icon href="https://wwww.baidu.com" target="_blank">
      <v-icon>mdi-github</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex"
import {GetPrincipal} from "@/api/admin/auth"

export default {
  methods: {
    ...mapMutations(["openNavDrawer", "setUserInfo"]),
    handleClickNavIcon() {
      this.openNavDrawer(!this.navDrawer)
    }
  },
  computed: {
    ...mapState({
      navDrawer: state => state.navDrawer,
    }),
    ...mapGetters(['existUserInfo']),
  },
  created() {
    if (!this.existUserInfo) {
      GetPrincipal().then(res => {
        this.setUserInfo(res.data)
      })
    }
  }
}
</script>

<style scoped>

</style>