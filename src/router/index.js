import {createRouter, createWebHistory} from 'vue-router'
import routes from './startroutes'

const router = createRouter({
    history: createWebHistory(), 
    routes
})

export default router
// 前端权限校验
router.beforeEach((to,from,next)=>{
    document.title = "大数据-"+to.meta.title
    const userInfo =  sessionStorage.getItem('token');
    if(to.matched.some(res => res.meta.requireAuth)){
        if (userInfo) { // 在去判断当前用户的信息
            next(); // 如果是 直接渲染
        } else {
            next('/')
        }
    }else{
        next() // 不是就直接去渲染路由
    }
})
