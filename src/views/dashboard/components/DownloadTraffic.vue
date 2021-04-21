<template>
  <v-card >
    <v-card-title>
      <v-icon color="pink darken-2" large >mdi-arrow-down-bold</v-icon>
    </v-card-title>

    <!-- 本月下载 -->
    <div class="px-4 d-flex align-end">
      <div>
        <div class="subtitle-1">本月下载</div>
        <span class="text-h5">{{ formatTraffic(this.currentMonth)}}</span>
      </div>
      <v-spacer />
      <div class="text-right ">
        <div class="text-h5">
          <template v-if="trend === 0" >
            <v-icon>mdi-trending-neutral</v-icon>
            <span>-</span>
          </template>
          <template v-else-if="trend > 0" >
            <v-icon color="error">mdi-trending-up</v-icon>
            <span>{{ percentage(this.trend) }}</span>
          </template>
          <template v-else >
            <v-icon color="success">mdi-trending-down</v-icon>
            <span>{{ percentage(Math.abs(this.trend)) }}</span>
          </template>
        </div>
      </div>
    </div>

    <!-- 12月内趋势 -->
    <v-sheet class="mt-2" color="transparent">
      <v-sparkline
          color="pink darken-2"
          fill
          smooth="16"
          padding="0"
          :auto-draw="!initialized"
          height="20"
          :value="historyCurve" >
      </v-sparkline>
    </v-sheet>

  </v-card>
</template>

<script>
import trafficChart from "./trafficChart"
import {GetDownTraffic} from "@/api/admin/management/dashboard"

export default {
  mixins: [trafficChart],
  methods: {
    refreshData() {
      GetDownTraffic().then(res => {
        this.history = res.data.history
      })
    },
    initialize() {
      GetDownTraffic().then(res => {
        this.history = res.data.history
      }).finally(() => {
        this.initialized = true
      })
    },
  },
  data: () => ({
  }),
  computed: {
    currentMonth() {
      if (this.history && this.history.length > 0) {
        return this.history[this.history.length - 1]
      }
      return 0
    },
  },
}
</script>

<style scoped>

</style>