import {formatPercentage, formatSize} from "@/util/numberUtils"

export default {
    created() {
        const that = this
        that.initialize()

        this.refreshTimer = setInterval(() => {
            that.refreshData()
        }, 60000)
    },
    destroyed() {
        if (this.refreshTimer) {
            window.clearInterval(this.refreshTimer)
        }
    },
    methods: {
        refreshData() {

        },
        initialize() {

        },
        formatTraffic(s) {
            return formatSize(s)
        },
        percentage(vale, d) {
            return formatPercentage(vale, d)
        }
    },
    data: () => ({
        initialized: false,
        history: [],
        refreshTimer: null,
    }),
    computed: {
        historyCurve() {
            let curve = this.history

            if (curve == null || curve.length === 0) {
                curve = [0]
            } else if (curve.length === 1) {
                curve.splice(0, 0, 0)
            }

            return curve
        },
        trend() {
            if (this.history && this.history.length >= 2) {
                let curr = this.history[this.history.length - 1]
                let last = this.history[this.history.length - 2]

                if (last) {
                    return (curr - last) / last
                }
            }

            return 0
        }
    },
}
