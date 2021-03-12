<template>
  <div class="hc-main-text-content">
    <ul
      v-if="programs.length"
      class="list-group list-group-flush"
      :id="`accordion${_uid}`"
    >
      <Group
        v-for="(groupedPrograms, groupName, i) in groups"
        :key="i"
        :name="groupName"
        :index="i"
      >
        <ul class="list-group m-0">
          <Activity
            v-for="{ id, fields } in groupedPrograms"
            :key="id"
            :fields="fields"
          />
        </ul>
      </Group>
    </ul>

    <div v-else class="text-center h4 text-muted">
      <slot>There are no programs at this time.</slot>
    </div>
  </div>
</template>

<script>
import airtable from './airtable'
import _groupBy from 'lodash.groupby'

import Group from './components/Group'
import Activity from './components/Activity'

export default {
  install(Vue) {
    Vue.prototype.$airtable = airtable
    Vue.component('HcRecCenterSchedules', this)
  },

  components: {
    Group,
    Activity,
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
            filterByFormula: `AND({group} != '', '${window.sitecoreItemId}' = ARRAYJOIN({locationGUID}), OR({endDate} >= TODAY(), {endDate} = ''))`,
            view: 'Grid view',
          },
        })
        this.programs = data.records
        // .filter((p) => p.fields?.group)
      } catch (error) {
        // error
        // 401 unauth
        // 422 (Unprocessable Entity)
        this.programs = []
      }
    },
  },

  computed: {
    groups() {
      return _groupBy(this.programs, 'fields.group')
    },
  },
}
</script>
