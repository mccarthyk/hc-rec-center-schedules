<template>
  <div class="hc-main-text-content">

    <ul class="list-group list-group-flush" :id="`accordion${_uid}`">

      <li class="list-group-item rounded-0 p-0" v-for="(models, group, i) in groups" :key="i">

        <a data-toggle="collapse" :href="`#collapse${i}`" class="list-group-item border-left-0 border-right-0 border-top-0 rounded-0 list-group-item-action d-flex align-items-center justify-content-between" :aria-controls="`collapse${i}`" aria-expanded="false">
          <div :id="`heading${i}`" class="font-weight-bold">
            {{ group }}
          </div>
        </a>

        <div ref="collapse" :id="`collapse${i}`" :aria-labelledby="`heading${i}`" class="collapse">
          <div class="card-body py-0">

            <ul class="list-group m-0">
              <li v-for="model in models" class="list-group-item border-left-0 border-right-0 border-bottom-0 rounded-0" :key="model._id">
                <div class="d-flex justify-content-between align-items-center">
                  <h6 class="font-weight-bold mb-0">{{ model.activity }} - {{ model.ages }}</h6>
                  <a v-if="model.registrationlink" :href="model.registrationlink" class="">Register</a>
                </div>
                <div class="font-italic">

                  {{ model.dateStr }}
                  {{ model.starttime }}
                  <template v-if="model.endtime">- {{ model.endtime }}</template>

                  <br v-if="model.begindate || model.enddate">

                  <template v-if="model.begindate">
                    from {{ model.begindate }}
                  </template>

                  <template v-if="model.enddate">
                    until {{ model.enddate }}
                  </template>
                </div> {{ model.description }} - <strong>{{ model.fee }}</strong>
                <!-- <pre>{{ model }}</pre> -->
              </li>
            </ul>


          </div>
        </div>


      </li>

    </ul>

  </div>
</template>

<script>
import GoogleSheetModel from '@hcflgov/vue-google-sheet-model'
import _groupBy from 'lodash.groupby'

export default {
  name: 'hc-rec-center-schedules',
  install (Vue) {

    var Gsheet = Vue.extend(GoogleSheetModel)
    Vue.prototype.$recCenterGsheet = new Gsheet({
      propsData: {
        sheetId: '1y3O38cY5j_AQ2y4fdClK2_HXrdd32HDIjaBI891Zz3c'
      }
    })

    Vue.mixin({
      components: {
        HcRecCenterSchedules: this
      }
    })

  },
  mounted () {
    this.$recCenterGsheet.$mount().$on('success', this.success)
  },
  data: () => ({
    instances: null
  }),
  methods: {
    success (data) {
      this.instances = data.instances.filter(x => x.guid == window.sitecoreItemId).map(x => new ScheduleEvent(x))
    }
  },
  computed: {
    groups () {
      return _groupBy(this.instances, 'group')
    }
  }
}

class ScheduleEvent {
  constructor (x) {
    for	(var k in x) {
      this[k] = x[k]
    }
  }

  get dateStr () {
    if (this.daily == 'TRUE') {
      return 'Daily'
    } else {
      return [
        (this.mon == 'TRUE' ? 'Mon' : null),
        (this.tues == 'TRUE' ? 'Tue' : null),
        (this.weds == 'TRUE' ? 'Wed' : null),
        (this.thurs == 'TRUE' ? 'Thu' : null),
        (this.fri == 'TRUE' ? 'Fri' : null),
        (this.sat == 'TRUE' ? 'Sat' : null),
        (this.sun == 'TRUE' ? 'Sun' : null)
      ].filter(Boolean).join(', ')
    }
  }
}
</script>
