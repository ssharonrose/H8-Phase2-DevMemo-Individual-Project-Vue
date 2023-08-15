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

export const usePublicStore = defineStore("public", {
    state: () => ({
        isLogin: localStorage.getItem('access_token') ? true : false,
        publicNotes: [],
        isPublic: true
    }),
    actions: {

        async readPublicNotes() {
            try {
                const { data } = await axios({
                    url: `${baseUrl}/public`,
                    method: "GET",
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })

                this.publicNotes = data.message

            } catch (error) {
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Error!'
                })
            }
        }
        ,
        async copyPublicNotes(id) {
            try {
                const { data } = await axios({
                    url: `${baseUrl}/public/${id}`,
                    method: "POST",
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Copy to my notes successfully'
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
