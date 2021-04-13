<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="`heading${index}`">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapse${index}`"
        aria-expanded="false"
        :aria-controls="`collapse${index}`"
      >
        {{ name }}
      </button>
    </h2>
    <div
      :id="`collapse${index}`"
      class="accordion-collapse collapse"
      :aria-labelledby="`heading${index}`"
    >
      <div class="accordion-body">
        <ul class="list-group list-group-flush">
          <slot></slot>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    index: Number,
  },
}
</script>
