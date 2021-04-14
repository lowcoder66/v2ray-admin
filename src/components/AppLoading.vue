<template>
  <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      style="z-index: 999"
  ></v-progress-linear>
</template>

<script>
import {mapState} from "vuex"

export default {
  name: "AppStatus",
  computed: {
    ...mapState({
      loading: state => state.loading,
    }),
  }
}
</script>

<style scoped>

</style>