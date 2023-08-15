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

export const useNewsStore = defineStore("news", {
    state: () => ({
        isLogin: localStorage.getItem('access_token') ? true : false,
        news: [],
        totalPage: 0,
    }),
    actions: {

        async readNews(page = 1, perPage = 10) {
            try {
                const { data } = await axios({
                    url: `${baseUrl}/news?page=${page}`,
                    method: "GET",
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })

                this.news = data.message
                this.totalPage = data.totalPages

                // Slice the news array to display the desired number of cards per page
                const startIndex = (page - 1) * perPage
                const endIndex = startIndex + perPage
                this.news = this.news.slice(startIndex, endIndex)

            } catch (error) {
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Error!'
                })
            }
        }



    }
})
