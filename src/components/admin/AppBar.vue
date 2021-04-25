<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="handleClickNavIcon"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-menu bottom min-width="200px" offset-y >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="mr-2"  >
          <v-avatar color="primary" size="36" >
            <span class="white--text headline">{{ userName }}</span>
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <h3>{{ userName }}</h3>
            <p class="caption mt-1">
              {{ userEmail }}
            </p>

            <v-divider class="my-2"></v-divider>
            <v-btn block color="primary darken-1" text to="/profile" >个人设置</v-btn>
            <v-divider class="my-2"></v-divider>
            <v-btn block color="error darken-1" text @click="handleLogout" >退出登录</v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>

  </v-app-bar>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex"
import {GetPrincipal, RevokeToken} from "@/api/admin/auth"
import router from "@/router"

export default {
  methods: {
    ...mapMutations(["openNavDrawer", "setUserInfo", "setToken"]),
    handleClickNavIcon() {
      this.openNavDrawer(!this.navDrawer)
    },
    handleLogout() {
      RevokeToken().finally(() => {
        this.setUserInfo(null)
        this.setToken(null)
        router.push({
          name: "login"
        }, null, null)
      })
    },
  },
  computed: {
    ...mapState({
      navDrawer: state => state.navDrawer,
      userInfo: state => state.user.info,
    }),
    ...mapGetters(['existUserInfo']),
    userName() {
      return this.userInfo ? this.userInfo.name : ""
    },
    userEmail() {
      return this.userInfo ? this.userInfo.email : ""
    },
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