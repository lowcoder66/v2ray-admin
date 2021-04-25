<template>
  <v-card class="pa-4">
    <v-card-title>账户信息</v-card-title>
    <v-card-text>
      <v-container class="pb-4 px-0">
        <v-row>
          <v-col cols="12">
            <v-text-field readonly hide-details v-model="infoForm.email" label="邮箱（账户名）" ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field readonly hide-details v-model="infoForm.uid" label="ID" ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field readonly v-model.number="infoForm.limit" label="限额" type="number" suffix=" Bytes" :hint="limitHint"  persistent-hint></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapState} from "vuex"
import {formatSize} from "@/util/numberUtils"

export default {
  data: () => ({
    infoForm: {
      email: null,
      uid: null,
      limit: 0,
    },
  }),
  computed: {
    ...mapState({
      userInfo: state => state.user.info,
    }),
    limitHint() {
      return formatSize(this.infoForm.limit)
    },
  },
  methods: {
    fillInfoForm() {
      if (this.userInfo) {
        this.infoForm = Object.assign(this.infoForm, this.userInfo)
      }
    }
  },
  watch: {
    userInfo() {
      this.fillInfoForm()
    }
  },
  created() {
    this.fillInfoForm()
  },
}
</script>

<style scoped>

</style>