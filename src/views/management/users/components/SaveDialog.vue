<template>
  <v-dialog persistent v-model="dialog" max-width="450px" >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :attrs="attrs" :on="on"></slot>
    </template>

    <v-card>
      <v-card-title>{{ formTitle }}</v-card-title>

      <v-card-text>
        <v-form v-model="valid" ref="saveForm" >
          <v-container class="py-4 px-0">
            <v-row>
              <v-col cols="12">
                <v-text-field :readonly="editMode" v-model="form.email" label="邮箱（账户名）" :rules="rules.email" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field :readonly="editMode" v-model="form.uid" label="ID" :rules="rules.uid" >
                  <template #append>
                    <v-icon :disabled="editMode" color="primary" @click="handleRefreshUid" >mdi-refresh</v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-slider v-model="form.level" label="等级" :max="10" :min="1"  thumb-label ticks tick-size="1" ></v-slider>
              </v-col>
              <v-col cols="6">
                <v-slider v-model="form.alterId" label="AlterId" :max="64" :min="4"  thumb-label ticks tick-size="1" ></v-slider>
              </v-col>
              <v-col cols="5">
                <v-text-field v-model="form.name" label="姓名" :rules="rules.name" ></v-text-field>
              </v-col>
              <v-col cols="7">
                <v-text-field v-model="form.phone" label="电话" ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-switch v-model="form.enabled" :label="form.enabled ? '已启用' : '未启用'"></v-switch>
              </v-col>
              <v-col cols="6">
                <v-switch v-model="form.locked" :label="form.locked ? '已锁定' : '未锁定' "></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="handleCancel" >取消</v-btn>
        <v-btn :disabled="!initialized" color="primary darken-1" text @click="handleSubmit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {AddUser, EditUser, GetUser} from "@/api/admin/management/users"
import {randomUUIDStr} from "@/util/stringUtils"

export default {
  props: {
    itemId: [String, Number],
    saveDialog: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      initialized: false,
      form: {
        email: null,
        uid: null,
        level: 1,
        alterId: 4,
        name: null,
        phone: null,
        enabled: true,
        locked: false,
      },
      valid: false,
      rules: {
        email: [
          v => !!v || '邮箱必须输入',
          v => /.+@.+\..+/.test(v) || '请输入正确的邮箱',
        ],
        uid: [
          v => !!v || 'ID必须输入',
          v => !v || /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/.test(v.toLowerCase()) || 'ID为UUID格式',
        ],
        name: [
          v => !!v || '姓名必须输入',
        ],
      },
    }
  },
  computed: {
    formTitle () {
      return this.itemId ? '编辑用户' : '新增用户'
    },
    dialog: {
      get() {
        return this.saveDialog
      },
      set(value) {
        this.$emit("update:save-dialog", value)
      }
    },
    editMode() {
      return !!this.itemId
    }
  },
  created() {
    this.initialize()
  },
  watch: {
    dialog(val) {
      if (val) {
        this.initialize()
      }
    }
  },
  methods: {
    initialize() {
      this.initialized = false
      if (this.itemId) {
        this.form.uid = null
        GetUser(this.itemId).then(res => {
          this.form = Object.assign(this.form, res.data)
        }).finally(() => {
          this.initialized = true
        })
      } else {
        this.form.uid = randomUUIDStr()
        this.form.enabled = true
        this.form.locked = false
        this.initialized = true
      }
    },
    handleCancel() {
      this.closeDialog()
    },
    handleSubmit() {
      this.$refs.saveForm.validate()
      if (this.valid) {
        if (this.itemId) {
          EditUser(this.itemId, this.form).then(() => {
            this.$emit("saved", Object.assign({id: this.itemId}, this.form))
            this.closeDialog()
          })
        } else {
          AddUser(this.form).then(res => {
            this.$emit("saved", Object.assign({id: res.data.id}, this.form))
            this.closeDialog()
          })
        }
      }
    },
    handleRefreshUid() {
      this.form.uid = randomUUIDStr()
    },
    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.$refs.saveForm.reset()
      })
    }
  },
}
</script>

<style scoped>

</style>