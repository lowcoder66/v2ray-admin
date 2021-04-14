<template>
  <div v-if="alerts && alerts.length > 0" class="d-flex justify-center">
    <template v-if="expand">
      <v-alert dense elevation="2" colored-border border="left" class="app-alerts mt-4 expanded "
               :type="alerts[0].type" :style="{maxWidth: $vuetify.breakpoint.xs ? '100%' : '40%'}">
        <span slot="prepend"/>
        <div class="multiple-alerts">
          <v-alert dense v-for="(a, index) in alerts" :key="index" :type="a.type" >
            <span>{{ a.message }}</span>
            <v-btn small icon slot="close" @click="handleCloseAlert(a)">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </v-alert>
        </div>
        <v-btn class="ml-4" slot="append" icon @click="expand = false">
          <v-icon>mdi-unfold-less-horizontal</v-icon>
        </v-btn>
      </v-alert>
    </template>
    <template v-else >
      <v-alert dense elevation="2" class="app-alerts mt-4" :type="alerts[0].type" :style="{maxWidth: $vuetify.breakpoint.xs ? '100%' : '30%'}">
        <span>{{ alerts[0].message }}</span>
        <v-btn v-if="alerts.length > 1" slot="append" small class="ml-4" icon @click="expand = true">
          <v-icon>mdi-unfold-more-horizontal</v-icon>
        </v-btn>
        <v-btn v-if="alerts.length === 1" slot="close" small class="ml-4" icon @click="handleCloseAlert(alerts[0])">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-alert>
    </template>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"

export default {
  name: "AppAlerts",
  data() {
    return {
      expand: false,
      clearTimer: null,
      step: 500,
    }
  },
  computed: {
    ...mapState({
      alerts: state => state.alerts,
    }),
  },
  watch: {
    alerts(val) {
      if(val) {
        this.addClearTimer()
      } else {
        this.removeClearTimer()
      }

      if (val.length === 1) {
        this.expand = false
      }
    },
    expand(val) {
      if (val) {
        this.removeClearTimer()
      } else {
        this.addClearTimer()
      }
    }
  },
  methods: {
    ...mapMutations(["removeAlert"]),
    handleCloseAlert(alert) {
      this.removeAlert(alert.uid)
    },
    addClearTimer() {
      if(this.alerts && !this.clearTimer && !this.expand) {
        let v = this
        this.clearTimer = setInterval(() => {
          if (v.alerts.length === 0) {
            v.removeClearTimer()
          } else {
            this.alerts.filter(a => a.live >= 0).forEach(a => {
              a.live -= this.step
              if (a.live <= 0) {
                this.handleCloseAlert(a)
              }
            })
          }
        }, this.step)
      }
    },
    removeClearTimer() {
      if (this.clearTimer) {
        clearInterval(this.clearTimer)
        this.clearTimer = null
      }
    }
  },
  destroyed() {
    this.removeClearTimer()
  },
  created() {
    this.addClearTimer()
  }
}
</script>

<style scoped >
  .app-alerts {
    position: absolute;
    z-index: 999;
  }
  .multiple-alerts {
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    max-height: 300px;
  }
  .multiple-alerts::-webkit-scrollbar { width: 0 !important }
</style>