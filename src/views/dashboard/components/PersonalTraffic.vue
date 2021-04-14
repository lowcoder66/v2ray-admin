<template>
  <v-card>
    <v-card-title >
      <v-icon large color="error darken-2" >mdi-circle-slice-7</v-icon>
      <span class="ml-2 font-weight-bold red--text text--darken-2">
        已使用89%
      </span>
      <v-spacer />
      <span class="font-weight-bold">500GB</span>
    </v-card-title>

    <div class="d-flex flex-column">
      <!-- 当月数据 -->
      <div class="px-4 d-flex align-end">
        <div>
          <div class="subtitle-1">本月流量</div>
          <span class="text-h5">837,32 GB</span>
        </div>
        <v-spacer />
        <div class="text-right">
          <div class="text-h5">
            <v-icon color="error">mdi-arrow-top-right-thick</v-icon>
            <span>3.2%</span>
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
          auto-draw
          height="20"
          :value="[675, 675, 390, 310, 460, 250, 240, 670]" >
      </v-sparkline>
    </v-sheet>

  </v-card>
</template>

<script>
export default {}
</script>

<style scoped>

</style>