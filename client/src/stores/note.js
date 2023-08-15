import { defineStore } from 'pinia'
import axios from "axios"
import Swal from 'sweetalert2';

// const baseUrl = "http://localhost:3000"
const baseUrl = "https://devmemo.sharonrose.dev"

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const useUserNoteStore = defineStore("userNote", {
    state: () => ({
        isLogin: localStorage.getItem('access_token') ? true : false,
        userNotes: [],
        noteOne: [],
        isEdit: false
    }),
    actions: {

        async readUserNote() {
            try {
                const { data } = await axios({
                    url: `${baseUrl}/notes/user`,
                    method: "GET",
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })

                this.userNotes = data.message
            } catch (error) {
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Error!'
                })
            }
        }
        ,
        async addNotes(title, description) {
            try {
                if (this.isEdit === false) {
                    this.isEdit = false
                    console.log(title, description);
                    const { data } = await axios({
                        url: `${baseUrl}/notes`,
                        method: "POST",
                        headers: {
                            access_token: localStorage.getItem("access_token")
                        },
                        data: {
                            title, description
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'New note added successfully'
                    })

                    this.router.push("/")
                } else {
                    this.editNotes(title, description)
                }
            } catch (error) {
                console.log(error);
                // console.log(error.response, "ini errors");
                Swal.fire({
                    title: 'Error!',
                    text: `${error.response.data.message}`,
                    icon: 'error',
                })
            }
        },

        async readDetailNote(id) {
            try {
                // console.log(title, description);
                const { data } = await axios({
                    url: `${baseUrl}/notes/user/${id}`,
                    method: "GET",
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                this.noteOne = data.message
                this.isEdit = true

            } catch (error) {
                console.log(error);
                // console.log(error.response, "ini errors");
                Swal.fire({
                    title: 'Error!',
                    text: `${error.response.data.message}`,
                    icon: 'error',
                })
            }
        },

        async isAdd() {
            this.isEdit = false
        }


        , async editNotes(title, description) {
            try {
                const { data } = await axios({
                    url: `${baseUrl}/notes/user/${this.noteOne.id}`,
                    method: "PUT",
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                    data: {
                        title, description
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Your note edited successfully'
                })
                this.isEdit = false
                this.router.push("/")

            } catch (error) {
                console.log(error);
                // console.log(error.response, "ini errors");
                Swal.fire({
                    title: 'Error!',
                    text: `${error.response.data.message}`,
                    icon: 'error',
                })
            }
        },

        async editStatusNote(status) {
            try {
                const { data } = await axios({
                    url: `${baseUrl}/notes/user/${this.noteOne.id}`,
                    method: "PATCH",
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                    data: {
                        status
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: `Your note status became ${status}`
                })

                this.router.push("/")

            } catch (error) {
                console.log(error);
                // console.log(error.response, "ini errors");
                Swal.fire({
                    title: 'Error!',
                    text: `${error.response.data.message}`,
                    icon: 'error',
                })
            }
        },

        async deleteNote(id) {
            try {
                console.log("masuk delete");
                const { data } = await axios({
                    url: `${baseUrl}/notes/user/${id}`,
                    method: "DELETE",
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                this.readUserNote()
                this.router.push("/")

                Toast.fire({
                    icon: 'success',
                    title: `Your note deleted successfully`
                })



            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: `${error.response.data.message}`,
                    icon: 'error',
                })
            }
        }
    }
})
