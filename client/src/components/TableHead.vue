<script>
export default {
  name: "TableHead",
  data() {
    return {
      tableHead: ["#", "Title", "Notes", "Last Update", "Status", "Action"],
      tableHeadPublic: ["#", "Title", "Notes", "Last Update", "Author", "Action"],
    };
  }
};
</script>

<template>
  <th v-for="title in $route.name === 'public' ? tableHeadPublic : tableHead " scope="col"
    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ title }}</th>
</template>

<style scoped></style>