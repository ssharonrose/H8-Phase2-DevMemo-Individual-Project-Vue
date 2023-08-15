<script>
import Navbar from "../components/Navbar.vue"
import { mapState, mapActions } from "pinia";
import { useNewsStore } from "../stores/news"
import Card from "../components/Card.vue"

export default {
    name: "NewsPage",
    components: { Navbar, Card },
    computed: {
        ...mapState(useNewsStore, ["news", "totalPage"]),
    },
    methods: {
        ...mapActions(useNewsStore, ["readNews"]),
    },
    async created() {
        await this.readNews(1, 10)
    },

}
</script>


<template>
    <Navbar />
    <h1 class="text-3xl font-bold mb-4 text-center">Global Tech Updates</h1>

    <div class="lg:col-span-3" style="margin-left: 15px; margin-right: 15px;">
        <div class="grid grid-cols-5 gap-4 h-full">
            <Card v-for="data in news" :key="data.id" :data="data" />
        </div>
    </div>
    <br />
    <!-- pagination -->
    <div class="flex justify-center mt-8" style="
    margin-bottom: 50px;
    border-bottom-width: 0px;
">
        <nav class="flex items-center">
            <ul class="inline-flex items-center -space-x-px">
                <li v-for="page in totalPage" :key="page">
                    <a href="#" @click.prevent="readNews(page, 10)"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {{ page }}
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
  


<style scoped></style>