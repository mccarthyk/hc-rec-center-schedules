<template>
  <li
    class="list-group-item border-left-0 border-right-0 border-bottom-0 rounded-0"
  >
    <div class="d-flex justify-content-between align-items-center">
      <h6 class="font-weight-bold mb-0">
        {{ fields.activityName[0] }} -
        {{ fields.ages }}
      </h6>
      <a
        v-if="fields.registrationURL"
        :href="fields.registrationURL"
        class=""
        target="_blank"
        >Register</a
      >
    </div>
    <div class="font-italic">
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
    </div>
    {{ fields.activityDescription[0] }} -
    <strong
      >{{ currency(fields.fee) }}
      <span v-if="fields.feeNote">{{ fields.feeNote }}</span></strong
    >
  </li>
</template>

<script>
export default {
  props: ['fields'],

  methods: {
    currency(dec) {
      return `$${dec.toFixed(2)}`
    },
  },
}
</script>
