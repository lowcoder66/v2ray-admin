<template>
  <v-row>
    <v-col cols="12" lg="6" xs="12" sm="12" md="12">
      <account />
    </v-col>
    <v-col cols="12" lg="6" xs="12" sm="12" md="12">
      <user-info />
    </v-col>
    <v-col cols="12" lg="6" xs="12" sm="12" md="12">
      <configuration />
    </v-col>
  </v-row>
</template>

<script>
import UserInfo from "./components/UserInfo"
import Configuration from "./components/Configuration"
import Account from "@/views/profile/components/Account"
export default {
  components: {Account, Configuration, UserInfo}
}
</script>

<style scoped>

</style>