import Vue from 'vue/dist/vue'
import HcRecCenterSchedules from './App.vue'

Vue.config.productionTip = false

// test appolo beach
window.sitecoreItemId = '{355759F1-C827-4242-887D-1736F4383263}'

Vue.use(HcRecCenterSchedules)

new Vue({
  data: () => ({
    compKey: 0,
    locations: [],
  }),
  async mounted() {
    const { data } = await Vue.prototype.$airtable.get(`/locations`, {
      params: {
        view: 'Grid view',
      },
    })
    this.locations = data.records
  },
  methods: {
    setActiveLocation(guid) {
      this.compKey = Date.now()
      window.sitecoreItemId = guid
    },
  },
}).$mount('#app')
