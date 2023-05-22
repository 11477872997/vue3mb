
const routes = [
    {
        path: '/',
        name: "index",
        redirect: '/home',
        component:()=>import("@/views/index.vue"),
        children:[
            {
                path:"home",
                name:"home",
                component:()=>import("@/views/home/index.vue"),
                meta:{
                    title:"网站首页"
                }
              },
            {
                path:"training",
                name:"training",
                component:()=>import("@/views/training/index.vue"),
                meta:{
                    title:"实训中心"
                }
              },
            {
                path:"mockexams",
                name:"mockexams",
                component:()=>import("@/views/mockexams/index.vue"),
                meta:{
                    title:"模考中心"
                }
              },
            {
                path:"individual",
                name:"individual",
                component:()=>import("@/views/individual/index.vue"),
                meta:{
                    title:"个人中心",
                    requireAuth: true // 添加需要权限的标记
                }
              },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'err',
        meta:{
          title:'页面不存在',
        },
        component: () => import('@/views/404/index.vue')
      }

];

export default routes
