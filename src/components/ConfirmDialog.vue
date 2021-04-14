<template>
  <v-dialog persistent v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">{{ options.content }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error darken-1" text @click="handleCancel">{{ options.cancelText || '取消' }}</v-btn>
        <v-btn color="primary darken-1" text @click="handleOk">{{ options.okText || '确认' }}</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    ok: {
      type: Function,
    },
    cancel: {
      type: Function,
    },
    content: {
      type: String,
      default: null,
    }
  },
  data: () => ({
    dialog: false,
    options: {
      content: null,
      ok: null,
      cancel: null,
      okText: null,
      cancelText: null,
    }
  }),
  methods: {
    handleOk() {
      this.options.ok && this.options.ok()
      this.close()
    },
    handleCancel() {
      this.options.cancel && this.options.cancel()
      this.close()
    },
    confirm({content, ok, cancel, okText, cancelText}) {
      this.options.content = content
      this.options.ok = ok
      this.options.cancel = cancel
      this.options.okText = okText
      this.options.cancelText = cancelText

      this.dialog = true
    },
    close() {
      this.dialog = false

      this.options.content = null
      this.options.ok = null
      this.options.cancel = null
      this.options.okText = null
      this.options.cancelText = null

      const c = this
      setTimeout(() => c.$destroy(), 300)
    }
  }
}
</script>

<style scoped>

</style>