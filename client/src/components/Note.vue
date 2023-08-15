<script>

import Navbar from './Navbar.vue';
import { mapActions, mapState } from 'pinia'
import { useUserNoteStore } from '../stores/note';

export default {
    name: "FormNote",
    components: { Navbar },
    data() {
        return {
            title: this.$route.noteOne ? this.noteOne.title : "",
            description: this.$route.noteOne ? this.noteOne.description : "",
            status: "Private",
        };
    },
    methods: {
        ...mapActions(useUserNoteStore, ["addNotes", "readDetailNote", "isAdd", "editStatusNote"]),
        handleAddNotes() {
            this.addNotes(this.title, this.description)
        },
        handleEditStatus(status) {
            this.editStatusNote(status)
        }

    },
    watch: {
        noteOne(oldValue, newValue) {
            this.title = this.noteOne.title;
            this.description = this.noteOne.description;
            this.status = this.noteOne.status;
        }
    },
    computed: {
        ...mapState(useUserNoteStore, ["noteOne", "isEdit"]),
    },
    async created() {
        if (this.$route.params.id) {
            await this.readDetailNote(this.$route.params.id);
        } else {
            await this.isAdd()
        }
    },
};
</script>

<template>
    <!-- {{ isEdit }} -->
    <Navbar />
    <div class="lg:flex lg:items-center lg:justify-between" style="
    margin-left: 15px;
    margin-right: 15px;">
        <div class="min-w-0 flex-1">
            <input type="text" v-model="title"
                class=" border-gray-300 text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title...">
        </div>
        <div class="mt-5 flex lg:ml-4 lg:mt-0">
            <span class="hidden sm:block">
                <button type="button" @click.prevent="handleAddNotes"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    style=" margin-right: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>
                    Save
                </button>
            </span>
            <span v-if="isEdit && status === 'Public'" class="sm:ml-3">
                <button type="button" @click.prevent="handleEditStatus('Private')"
                    class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Public
                </button>
            </span>
            <span v-else-if="isEdit && status === 'Private'" class="sm:ml-3">
                <button type="button" @click.prevent="handleEditStatus('Public')"
                    class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Private
                </button>
            </span>
        </div>
    </div>
    <div style="margin-left: 15px; margin-right: 15px;">
        <textarea v-model="description"
            class="mt-3 border-gray-300 text-base leading-6 text-gray-900 sm:text-lg sm:leading-7 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            style="height: 600px;" placeholder="Write your note here..."></textarea>
    </div>
</template>
  
<style scoped></style>