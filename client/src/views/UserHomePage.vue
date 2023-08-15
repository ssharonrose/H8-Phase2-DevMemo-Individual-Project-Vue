<script>
import Navbar from "../components/Navbar.vue"
import Note from "../components/Note.vue";
import TableHead from "../components/TableHead.vue";
import { mapState, mapActions } from "pinia";
import { useUserNoteStore } from "../stores/note"
import { usePublicStore } from "../stores/public"

export default {
    name: "UserHomePage",
    components: { Navbar, Note, TableHead },
    data() {
        return {
            flag: 0,
            page: ""
        }
    },
    // beforeMount() {
    //     if (this.$router.path === "/public") {
    //         // alert("masuk iffff")
    //         this.readPublicNotes()
    //     } else {
    //         console.log("masuk sini")
    //         this.readUserNote()
    //         // this.page = "myNote"
    //     }
    // },
    created() {
        if (this.$route.name === "public") {
            this.readPublicNotes()
        } else {
            console.log("masuk sini")
            this.readUserNote()
        }
    },
    methods: {
        ...mapActions(useUserNoteStore, ["readUserNote", "deleteNote"]),
        ...mapActions(usePublicStore, ["readPublicNotes", "copyPublicNotes"]),
        handleEdit(id) {
            this.$router.push({ name: `editForm`, params: { id: id } })
        },
        handleDelete(id) {
            this.deleteNote(id)
            this.flag += 1
            // alert(id)
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
        handlecopyNote(id) {
            this.copyPublicNotes(id)
        }
    },
    computed: {
        ...mapState(useUserNoteStore, ["userNotes"]),
        ...mapState(usePublicStore, ["publicNotes"])
    },
    watch: {
        flag(oldValue, newValue) {
            if (this.$route.name === "public") {
                this.readPublicNotes();
            } else {
                this.readUserNote();
            }
        },
        $route(to, from) {
            if (to.name === "public") {
                this.readPublicNotes();
            } else {
                this.readUserNote();
            }
        }
    }
}
</script>

<template>
    <!-- {{ userNotes }}
    {{ publicNotes }}
    {{ flag }} -->
    <Navbar />
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">{{ $route.name === 'public' ? 'Public Notes' : 'My Note' }}</h1>
        <RouterLink v-if="$route.name !== 'public'" to="/note" class="flex items-center">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span class="ml-2">Add Note</span>
            </button>
        </RouterLink>


        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                    <tr>
                        <TableHead />
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(note, index) in $route.name === 'public' ? publicNotes : userNotes " :key="note.id">
                        <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ note.title }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ note.description }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(note.updatedAt) }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ $route.name === 'public' ? note.User.username :
                            note.status }}</td>
                        <td v-if="$route.name !== 'public'" class="px-6 py-4 whitespace-nowrap">
                            <button class="text-blue-500 hover:text-blue-700 font-medium"
                                @click.prevent="handleEdit(note.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                            <button class="text-blue-500 hover:text-blue-700 font-medium"
                                @click.prevent="handleDelete(note.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    style=" margin-left: 10px;" stroke="red" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </td>
                        <td v-else class="px-6 py-4 whitespace-nowrap flex items-center">
                            <button class="text-blue-500 hover:text-blue-700 font-medium flex items-center"
                                @click.prevent="handlecopyNote(note.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                </svg>
                                <span class="ml-2">Copy To My Notes</span>
                            </button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<style scoped></style>