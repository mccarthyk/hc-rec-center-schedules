<template>
  <li class="list-group-item rounded-0 p-0">
    <a
      data-toggle="collapse"
      :href="`#collapse${index}`"
      class="list-group-item border-left-0 border-right-0 border-top-0 rounded-0 list-group-item-action d-flex align-items-center justify-content-between"
      :aria-controls="`collapse${index}`"
      aria-expanded="false"
    >
      <div :id="`heading${index}`" class="font-weight-bold">
        {{ name }}
      </div>
    </a>

    <div
      ref="collapse"
      :id="`collapse${index}`"
      :aria-labelledby="`heading${index}`"
      class="collapse"
    >
      <div class="card-body py-0">
        <!-- programs slot -->
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['name', 'index'],
}
</script>
