import { reactive, computed } from 'vue'
import airtable from './airtable'
import _groupBy from 'lodash.groupby'

export const programs = reactive({
  error: '',
  loading: false,
  data: [],
})

export const groupedPrograms = computed(() =>
  _groupBy(programs.data, 'fields.group')
)

export async function fetchPrograms(sitecoreItemId) {
  programs.loading = true
  try {
    const { data } = await airtable.get(`/programs`, {
      params: {
        filterByFormula: `AND({published}, {group} != '', '${sitecoreItemId}' = ARRAYJOIN({locationGUID}), OR({endDate} >= TODAY(), {endDate} = ''))`,
        view: 'Grid view',
      },
    })

    programs.data = data.records
  } catch (error) {
    // error
    // 401 unauth
    // 422 (Unprocessable Entity)

    programs.error = error.message
  } finally {
    programs.loading = false
  }
}
