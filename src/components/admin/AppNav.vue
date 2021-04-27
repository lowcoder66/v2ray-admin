<template>
  <v-navigation-drawer app v-model="showNavDrawer">
    <v-list slot="prepend">
      <v-list-item class="px-4 py-1">
        <v-list-item-avatar tile>
          <img alt="app-logo" src="@/assets/logo.svg" width="80" height="80"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <span class="title primary--text">{{  title }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <div>
      <v-list nav>
        <v-list-item-group color="primary" mandatory>
          <template v-for="(g, gi) in navs" >
            <div v-if="g.name" :key="gi" class="pa-1 mt-2 overline">{{ g.name }}</div>
            <v-list-item v-for="(item, i) in g.children" :key="`${gi}_${i}`" :to="item.path">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

    </div>


  </v-navigation-drawer>
</template>

<script>
import {mapMutations, mapState, mapGetters} from "vuex"
import {toNavs} from "@/router/routers"

export default {
  data() {
    return {
      navs: [],
    }
  },
  created() {
    this.navs = this.routersNav()
  },
  computed: {
    ...mapState({
      email: state => state.user.email,
      name: state => state.user.name,
      navDrawer: state => state.navDrawer,
    }),
    ...mapGetters(['isAdmin']),
    showNavDrawer: {
      get() {
        return this.navDrawer;
      },
      set(value) {
        this.openNavDrawer(value)
      }
    },
    title() {
      return process.env.VUE_APP_TITLE || 'Vuetify Admin'
    }
  },
  methods: {
    ...mapMutations(["openNavDrawer"]),
    routersNav() {
      return toNavs(this.isAdmin)
    }
  },
  watch: {
    isAdmin() {
      this.navs = this.routersNav()
    }
  }
}
</script>

<style scoped>
>>> .v-navigation-drawer__content {
  background: linear-gradient(#fff 30%, hsla(0, 0%, 100%, 0)), linear-gradient(hsla(0, 0%, 100%, 0), #fff 70%) 0 100%, radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .06), transparent), radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .06), transparent) 0 100%;
  background-repeat: no-repeat;
  background-size: 100% 40px, 100% 40px, 100% 15px, 100% 15px;
  background-attachment: local, local, scroll, scroll;
}
</style>