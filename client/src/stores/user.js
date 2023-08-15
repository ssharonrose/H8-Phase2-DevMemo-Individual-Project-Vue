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

export const useUserStore = defineStore("user", {
    state: () => ({
        isLogin: localStorage.getItem('access_token') ? true : false,
    }),
    actions: {
        async loginHandler(email, password) {
            try {
                console.log(email, password);
                const { data } = await axios({
                    url: `${baseUrl}/login`,
                    method: "POST",
                    data: {
                        email, password
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })

                localStorage.setItem('access_token', data.access_token)
                this.isLogin = true


                this.router.push("/")

            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: `${error.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async registerHandler(email, password, username) {
            try {
                console.log(email, password, username);
                const { data } = await axios({
                    url: `${baseUrl}/register`,
                    method: "POST",
                    data: {
                        email, password, username
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Register in successfully'
                })

                this.router.push("/login")
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

        async handleCredentialResponse(response) {
            try {
                const google_token = response.credential;
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/glogin`,
                    data: {
                        google_token: google_token,
                    },
                });

                localStorage.setItem("access_token", data.access_token);
                this.isLogin = true
                this.router.push("/")
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })

            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },

        async logoutHandler() {
            localStorage.clear()
            this.isLogin = false
            Toast.fire({
                icon: 'success',
                title: 'Logout in successfully'
            })
        },


    }
})
