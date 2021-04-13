<template>
  <li class="list-group-item mb-3">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="fw-bold">
        {{ fields.activityName[0] }} -
        {{ fields.ages }}
      </h5>

      <a
        v-if="fields.registrationURL"
        :href="fields.registrationURL"
        target="_blank"
        >Register</a
      >
    </div>

    <p v-if="fields.activityDescription?.[0]">
      {{ fields.activityDescription?.[0] }}
    </p>

    <p class="fst-italic text-muted small">
      {{ fields.days.join(', ') }}
      {{ fields.times }}

      <br v-if="fields.beginDate || fields.endDate" />

      <template v-if="fields.beginDate">
        from
        {{ fields.beginDate }}
      </template>

      <template v-if="fields.endDate">
        until
        {{ fields.endDate }}
      </template>
    </p>

    <p class="fw-bold">
      {{ currency(fields.fee) }}
      <span v-if="fields.feeNote">{{ fields.feeNote }}</span>
    </p>
  </li>
</template>

<script>
export default {
  props: {
    fields: Object,
  },

  methods: {
    currency(dec) {
      return `$${dec.toFixed(2)}`
    },
  },
}
</script>
