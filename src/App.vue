<template>
  <div class="hc-main-text-content">
    <ul
      v-if="programs.length"
      class="list-group list-group-flush"
      :id="`accordion${_uid}`"
    >
      <li
        class="list-group-item rounded-0 p-0"
        v-for="(programs, group, i) in groups"
        :key="i"
      >
        <a
          data-toggle="collapse"
          :href="`#collapse${i}`"
          class="list-group-item border-left-0 border-right-0 border-top-0 rounded-0 list-group-item-action d-flex align-items-center justify-content-between"
          :aria-controls="`collapse${i}`"
          aria-expanded="false"
        >
          <div :id="`heading${i}`" class="font-weight-bold">
            {{ group }}
          </div>
        </a>

        <div
          ref="collapse"
          :id="`collapse${i}`"
          :aria-labelledby="`heading${i}`"
          class="collapse"
        >
          <div class="card-body py-0">
            <ul class="list-group m-0">
              <li
                v-for="program in programs"
                class="list-group-item border-left-0 border-right-0 border-bottom-0 rounded-0"
                :key="program.id"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <h6 class="font-weight-bold mb-0">
                    {{ program.fields.activityName[0] }} -
                    {{ program.fields.ages }}
                  </h6>
                  <a
                    v-if="program.fields.registrationURL"
                    :href="program.fields.registrationURL"
                    class=""
                    target="_blank"
                    >Register</a
                  >
                </div>
                <div class="font-italic">
                  {{ program.fields.days.join(', ') }}
                  {{ program.fields.times }}

                  <br
                    v-if="program.fields.beginDate || program.fields.endDate"
                  />

                  <template v-if="program.fields.beginDate">
                    from
                    {{ program.fields.beginDate }}
                  </template>

                  <template v-if="program.fields.endDate">
                    until
                    {{ program.fields.endDate }}
                  </template>
                </div>
                {{ program.fields.activityDescription[0] }} -
                <strong
                  >{{ currency(program.fields.fee) }}
                  <span v-if="program.fields.feeNote">{{
                    program.fields.feeNote
                  }}</span></strong
                >
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>

    <div v-else class="text-center h4 text-muted">
      <slot>There are no programs at this time.</slot>
    </div>
  </div>
</template>

<script>
import airtable from './airtable'
import _groupBy from 'lodash.groupby'

export default {
  install(Vue) {
    Vue.prototype.$airtable = airtable
    Vue.component('HcRecCenterSchedules', this)
  },

  data: () => ({
    programs: [],
  }),

  mounted() {
    this.fetchPrograms()
  },

  methods: {
    async fetchPrograms() {
      try {
        const { data } = await this.$airtable.get(`/programs`, {
          params: {
            filterByFormula: `AND('${window.sitecoreItemId}' = ARRAYJOIN({locationGUID}), OR({endDate} >= TODAY(), {endDate} = ''))`,
            view: 'Grid view',
          },
        })
        this.programs = data.records
      } catch (error) {
        // error
        // 401 unauth
        // 422 (Unprocessable Entity)
        this.programs = []
      }
    },

    currency(dec) {
      return `$${dec.toFixed(2)}`
    },
  },

  computed: {
    groups() {
      return _groupBy(this.programs, 'fields.group')
    },
  },
}
</script>
