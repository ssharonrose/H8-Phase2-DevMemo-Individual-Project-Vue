<script>
export default {
  name: "TableItem",
  props: ["allNews", "indexNews"],
};
</script>

<template>
  <div class="overflow-x-auto">
    <tr>
      <td v-for="data in allNews" :key="data.id">
        {{ data }}
      </td>
    </tr>
  </div>
</template>

<style scoped></style>
