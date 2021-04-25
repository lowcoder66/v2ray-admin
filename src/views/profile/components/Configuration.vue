<template>
  <v-card class="pa-4">
    <v-card-title>
      <span>连接信息</span>
      <v-spacer />
      <v-btn color="primary" @click="getConfTpl" outlined>
        <v-icon left  >mdi-refresh</v-icon>
        <span>推荐配置</span>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form >
        <v-container class="pb-4 px-0">
          <v-row>
            <v-col cols="12">
              <v-text-field hide-details v-model="conf.remark" label="配置别名" ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field hide-details v-model="conf.address" label="地址（address）" ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field hide-details v-model="conf.port" label="端口（port）" ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field hide-details v-model="conf.id" label="用户ID（id）" ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field hide-details v-model="conf.alterId" label="额外ID（alterId）" ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select hide-details v-model="conf.security" label="加密方式（security）" :items="securityItems"></v-select>
            </v-col>
            <v-col cols="6">
              <v-select hide-details v-model="conf.network" label="传输协议（network）" :items="networkItems"></v-select>
            </v-col>
            <v-col cols="6">
              <v-select hide-details v-model="conf.type" label="伪装类型（type）" :items="typeItems"></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field hide-details v-model="conf.host" label="伪装域名（host）" ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field hide-details v-model="conf.path" label="路径（path）" ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select hide-details v-model="conf.tls" label="底层传输安全（tls）" :items="tlsItems"></v-select>
            </v-col>
            <v-col v-if="conf.tls && conf.tls ==='tls' " cols="6">
              <v-select hide-details v-model="conf.allowInsecure" label="跳过证书验证（allowInsecure）" :items="allowInsecureItems"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-dialog v-model="qrDialog" width="323" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary lighten-1" v-bind="attrs" @click="showQrCode" >生成二维码</v-btn>
        </template>

        <v-card class="pa-2">
          <img width="300" height="300" alt="qr" :src="qcCodeDataUrl" />
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import {GetUserConfTemplate} from "@/api/admin/configuration"
import {mapMutations, mapState} from "vuex"
import {fromByteArray} from "base64-js"
import QRCode from "qrcode"

export default {
  data: () => ({
    conf: {
      remark: "",
      address: "",
      port: "",
      id: "",
      alterId: 4,
      security: "auto",
      network: "ws",
      type: "none",
      host: [],
      path: "",
      tls: "",
      allowInsecure: "",
    },
    securityItems: ["aes-128-gcm", "chacha20-poly1305", "auto", "none"],
    networkItems: ["tcp", "kcp", "ws", "h2", "quic", "grpc"],
    typeItems: ["none", "http"],
    tlsItems: ["", "tls"],
    allowInsecureItems: ["", "false", "true"],

    qrDialog: false,
    qcCodeDataUrl: null,
  }),
  created() {
    this.getConfTpl()
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.info,
    }),
  },
  methods: {
    ...mapMutations(["errAlert"]),
    showQrCode() {
      QRCode.toDataURL(this.confToQrContent()).then(url => {
        this.qcCodeDataUrl = url
        this.qrDialog = true
      }).catch(() => {
        this.errAlert("生成二维码失败")
      })
    },
    getConfTpl() {
      GetUserConfTemplate().then(res => {
        this.conf = Object.assign(this.conf, res.data)
        this.conf.id = this.userInfo.uid
        this.conf.remark = `v-${this.conf.address}-${this.userInfo.email}`
      })
    },
    confToQrContent() {
      let content = {
        v: "2",
        ps: this.conf.remark,
        add: this.conf.address,
        port: this.conf.port,
        id: this.conf.id,
        aid: this.conf.alterId,
        net: this.conf.network,
        type: this.conf.type,
        host: this.conf.host,
        path: this.conf.path,
        tls: this.conf.tls,
        snl: ""
      }

      return "vmess://" + fromByteArray(new Buffer(JSON.stringify(content)))
    }
  },
}
</script>

<style scoped>

</style>