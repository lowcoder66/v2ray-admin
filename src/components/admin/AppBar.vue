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
import {mapMutations, mapState} from "vuex"

export default {
  methods: {
    ...mapMutations(["openNavDrawer"]),
    handleClickNavIcon() {
      this.openNavDrawer(!this.navDrawer)
    }
  },
  computed: {
    ...mapState({
      navDrawer: state => state.navDrawer,
    }),
  },
}
</script>

<style scoped>

</style>