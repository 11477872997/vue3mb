import request from '@/utils/request' 

export function getmajorType() {  
    const url = `/sys/majorType`;
    return request({
        url: url,
        method: 'get',
    })
}
