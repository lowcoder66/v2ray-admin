<template>
  <v-card dark color="primary darken-4"  >
    <v-card-title>
      <v-icon large >mdi-swap-horizontal-bold</v-icon>
    </v-card-title>

    <div class="d-flex flex-column">
      <!-- 总流量 -->
      <div class="d-flex px-4 ">
        <div class="mr-xl-16 mr-md-16 mr-sm-8">
          <div class="title">总流量</div>
          <div class="text-h4">{{ formatTraffic(this.total)}}</div>
        </div>
        <div class="mr-xl-16 mr-md-16 mr-sm-8">
          <div class="title">上传</div>
          <div class="text-h4">{{ formatTraffic(this.upLink)}}</div>
        </div>
        <div>
          <div class="title">下载</div>
          <div class="text-h4">{{ formatTraffic(this.downLink)}}</div>
        </div>
      </div>

      <!-- 当月数据 -->
      <div class="px-4 pt-2 d-flex align-end">
        <div>
          <div class="subtitle-1">本月流量</div>
          <span class="text-h5">{{ formatTraffic(this.currentMonth)}}</span>
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
          color="primary lighten-2"
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
import {GetTotalTraffic} from "@/api/admin/management/dashboard"
import trafficChart from "@/views/dashboard/components/trafficChart"

export default {
  mixins: [trafficChart],
  methods: {
    refreshData() {
      GetTotalTraffic().then(res => {
        this.history = res.data.history
        this.upLink = res.data.upLink
        this.downLink = res.data.downLink
      })
    },
    initialize() {
      GetTotalTraffic().then(res => {
        this.history = res.data.history
        this.upLink = res.data.upLink
        this.downLink = res.data.downLink
      }).finally(() => {
        this.initialized = true
      })
    },
  },
  data: () => ({
    upLink: 0,
    downLink: 0,
  }),
  computed: {
    total() {
      return this.upLink + this.downLink
    },
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