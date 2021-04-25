<template>
  <v-card class="pa-4">
    <v-card-title>更新信息</v-card-title>
    <v-card-text>
      <v-form v-model="infoFormValid" ref="infoForm" >
        <v-container class="pb-4 px-0">
          <v-row>
            <v-col cols="12" lg="5" sm="12">
              <v-text-field v-model="infoForm.name" label="姓名" :rules="rules.name" ></v-text-field>
            </v-col>
            <v-col cols="12" lg="5" sm="12">
              <v-text-field v-model="infoForm.phone" label="电话" ></v-text-field>
            </v-col>
            <v-col cols="12" lg="2" sm="12" align-self="center" class="text-right">
              <v-btn color="primary darken-1"  @click="handleSubmitInfoForm">更新</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-form v-model="passwdFormValid" ref="passwdForm" >
        <v-container class="pb-4 px-0">
          <v-row>
            <v-col cols="12" lg="3" sm="12">
              <v-text-field v-model="passwdForm.current" label="当前密码" :rules="rules.current" ></v-text-field>
            </v-col>
            <v-col cols="12" lg="3" sm="12">
              <v-text-field v-model="passwdForm.password" label="新密码" :rules="rules.password"></v-text-field>
            </v-col>
            <v-col cols="12" lg="3" sm="12">
              <v-text-field v-model="passwdForm.confirm" label="确认密码" :rules="[v => !!v || '再次输入密码', v => v === this.passwdForm.password || '两次输入密码不一致']"></v-text-field>
            </v-col>
            <v-col cols="12" lg="3" sm="12" align-self="center" class="text-right">
              <v-btn color="warning darken-1"  @click="handleSubmitPasswdForm">修改密码</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapMutations, mapState} from "vuex"
import {formatSize} from "@/util/numberUtils"
import {GetPrincipal} from "@/api/admin/auth"
import {ModifyPassword, ModifyUserInfo} from "@/api/admin/user"

export default {
  data: () => ({
    infoFormValid: false,
    passwdFormValid: false,
    rules: {
      name: [
        v => !!v || '姓名必须输入',
      ],
      current: [v => !!v || '输入当前密码'],
      password: [v => !!v || '输入新的密码'],
    },
    levelRange: [1, 10],
    infoForm: {
      name: null,
      phone: null,
    },
    passwdForm: {
      current: null,
      password: null,
      confirm: null,
    },
  }),
  computed: {
    ...mapState({
      userInfo: state => state.user.info,
    }),
    limitHint() {
      return formatSize(this.userInfo.limit)
    },
  },
  watch: {
    userInfo() {
      this.fillForm()
    }
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    fillForm() {
      if (this.userInfo) {
        this.infoForm.name = this.userInfo.name
        this.infoForm.phone = this.userInfo.phone
      }
    },
    handleSubmitInfoForm() {
      this.$refs.infoForm.validate()
      if (this.infoFormValid) {
        ModifyUserInfo(this.userInfo.id, this.infoForm).then(() => {
          GetPrincipal().then(res => {
            this.setUserInfo(res.data)
          })
        })
      }
    },
    handleSubmitPasswdForm() {
      this.$refs.passwdForm.validate()
      if (this.passwdFormValid) {
        ModifyPassword(this.userInfo.id, this.passwdForm).then(() => {
          this.$refs.passwdForm.reset()
        })
      }
    },
  },
  created() {
    this.fillForm()
  },
}
</script>

<style scoped>

</style>