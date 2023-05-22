const env = import.meta.env
export const  environment  = () =>{
    // 本地环境
    if(env.MODE == 'development'){
        return '/api'
    }else{
        return '/api'
    }
    console.log(env)
}