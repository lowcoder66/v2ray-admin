<template>
  <v-card>
    <v-card-title >
      <v-icon large :color="usedIconColor" >{{  usedIcon  }}</v-icon>
      <span class="ml-2 font-weight-bold">
        {{ `已使用 ${used}` }}
      </span>
      <v-spacer />
      <span class="font-weight-bold">{{ formatTraffic(this.limit)}}</span>
    </v-card-title>

    <div class="d-flex flex-column">
      <!-- 当月数据 -->
      <div class="px-4 d-flex align-end">
        <div>
          <div class="subtitle-1">本月流量</div>
          <span class="text-h5">{{ formatTraffic(this.traffic)}}</span>
        </div>
        <v-spacer />
        <div class="text-right">
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
    </div>

    <!-- 12月内趋势 -->
    <v-sheet class="mt-2" color="transparent">
      <v-sparkline
          color="primary"
          fill
          smooth
          padding="0"
          :auto-draw="!initialized"
          height="20"
          :value="historyCurve" >
      </v-sparkline>
    </v-sheet>

  </v-card>
</template>

<script>
import {UserTraffic} from "@/api/admin/dashboard"
import trafficChart from "./trafficChart"

export default {
  mixins: [trafficChart],
  methods: {
    refreshData() {
      UserTraffic().then(res => {
        this.limit = res.data.limit
        this.traffic = res.data.upLink + res.data.downLink
        this.history = res.data.history
      })
    },
    initialize() {
      UserTraffic().then(res => {
        this.limit = res.data.limit
        this.traffic = res.data.upLink + res.data.downLink
        this.history = res.data.history
      }).finally(() => {
        this.initialized = true
      })
    },
  },
  data: () => ({
    limit: 0,
    traffic: 0,
  }),
  computed: {
    used() {
      return this.percentage(this.traffic / this.limit, 0)
    },
    usedIcon() {
      let used = Math.round(this.traffic / this.limit * 8)
      let iconIndex = used > 8 ? 8 : used

      return used === 0 ? 'mdi-circle-outline' : 'mdi-circle-slice-' + iconIndex
    },
    usedIconColor() {
      let used = this.traffic / this.limit
      let color = "green"
      if (used > 0.5 && used < 0.8) {
        color = "yellow"
      } else if (used >= 0.8) {
        color = "red"
      }
      return color + " darken-2"
    },
  },
}
</script>

<style scoped>

</style>