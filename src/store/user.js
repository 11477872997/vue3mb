import { defineStore } from 'pinia'


// 第一个参数是应用程序中 store 的唯一 id
export const userStore = defineStore('userInformation', {
    state: () => {
        return {
            userData: null,
        };
    },
    getters: {},
    actions: {
        setUserData(value) {
            this.userData = value;
        }
    }
})