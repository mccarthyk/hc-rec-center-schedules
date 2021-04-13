import { reactive } from 'vue'
import airtable from './airtable'

export const locations = reactive({
  error: '',
  loading: false,
  data: [],
})

export async function fetchLocations() {
  locations.loading = true
  try {
    const { data } = await airtable.get(`/locations`, {
      params: {
        view: 'Grid view',
      },
    })
    locations.data = data.records
  } catch (error) {
    locations.error = error.message
  } finally {
    locations.loading = false
  }
}
