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
          <div class="text-h4">593,512 GB</div>
        </div>
        <div class="mr-xl-16 mr-md-16 mr-sm-8">
          <div class="title">上传</div>
          <div class="text-h4">293,512 GB</div>
        </div>
        <div>
          <div class="title">下载</div>
          <div class="text-h4">393,512 GB</div>
        </div>
      </div>

      <!-- 当月数据 -->
      <div class="px-4 pt-2 d-flex align-end">
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
          color="primary lighten-2"
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