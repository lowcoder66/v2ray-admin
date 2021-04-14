<template>
  <v-card >
    <v-card-title>
      <v-icon color="teal darken-2" large >mdi-arrow-up-bold</v-icon>
    </v-card-title>

    <!-- 当月数据 -->
    <div class="px-4 d-flex align-end">
      <div>
        <div class="subtitle-1">本月上传</div>
        <span class="text-h5">837,32 GB</span>
      </div>
      <v-spacer />
      <div class="text-right ">
        <div class="text-h5">
          <v-icon  color="error">mdi-arrow-top-right-thick</v-icon>
          <span>3.2%</span>
        </div>
      </div>
    </div>

    <!-- 12月内趋势 -->
    <v-sheet class="mt-2" color="transparent">
      <v-sparkline
          color="teal darken-2"
          fill
          smooth="16"
          padding="0"
          auto-draw
          height="20"
          :value="[670, 410, 390, 310, 460, 650, 740]" >
      </v-sparkline>
    </v-sheet>

  </v-card>
</template>

<script>
export default {}
</script>

<style scoped>

</style>