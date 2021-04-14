import ConfirmDialog from './ConfirmDialog.vue';

const Install = (Vue, options = {}) => {
    const vuetify = options.vuetify
    delete options.vuetify
    if (!vuetify) {
        console.warn('Module vuetify-confirm needs vuetify instance. Use Vue.use(VuetifyConfirm, { vuetify })')
    }
    const container = document.querySelector('[data-app=true]') || document.body

    function newInstance(opts) {
        const ConfirmVueConstructor = Vue.extend(Object.assign({ vuetify }, ConfirmDialog))
        let instance = new ConfirmVueConstructor({
            destroyed: () => {
                container.removeChild(instance.$el)
            }
        })
        container.appendChild(instance.$mount().$el);

        Vue.nextTick(() => {
            instance.confirm(opts)
        })
    }

    if (options.property) {
        Vue.prototype[options.property] = newInstance
    } else {
        Vue.prototype['$confirm'] = newInstance
    }
}

export default Install