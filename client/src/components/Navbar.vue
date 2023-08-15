<script>

import { useUserStore } from '../stores/user';
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia';

export default {
    name: "Navbar",
    methods: {
        ...mapActions(useUserStore, ['logoutHandler']),
    },
    computed: {
        ...mapState(useUserStore, ['isLogin'])
    },

}

</script>

<template>
    <!-- Nav Bar -->
    <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <ul
                class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <li>
                    <RouterLink to="/public"
                        class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">
                        Public Notes</RouterLink>
                </li>
                <li>
                    <RouterLink to="/news"
                        class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">
                        News</RouterLink>
                </li>
            </ul>
            <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                <ul
                    class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                    <li>
                        <RouterLink to="/"
                            class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">
                            My Notes</RouterLink>
                    </li>
                    <li>
                        <RouterLink @click.prevent="logoutHandler" to="/login"
                            class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">
                            Logout </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Nav Bar -->
</template>

<style scoped></style>
