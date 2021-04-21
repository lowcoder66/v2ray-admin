<template>
  <v-row dense justify="space-around" >
    <template v-if="this.isAdmin">
    <v-col cols="12" class="pb-2">
      <total-traffic />
    </v-col>
    <v-col cols="12" md="6" class="py-2" >
      <upload-traffic />
    </v-col>
    <v-col cols="12" md="6" class="py-2">
      <download-traffic />
    </v-col>
    </template>

    <v-col cols="12" class="py-2">
      <personal-traffic />
    </v-col>
  </v-row>

</template>

<script>
import TotalTraffic from "@/views/dashboard/components/TotalTraffic"
import UploadTraffic from "@/views/dashboard/components/UploadTraffic"
import DownloadTraffic from "@/views/dashboard/components/DownloadTraffic"
import PersonalTraffic from "@/views/dashboard/components/PersonalTraffic"
import {mapGetters} from "vuex"
export default {
  components: {PersonalTraffic, DownloadTraffic, UploadTraffic, TotalTraffic},
  computed: {
    ...mapGetters(["isAdmin"])
  }
}
</script>

<style scoped>

</style>