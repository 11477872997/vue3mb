/**
 *  assets 文件夹
 * @param {*} name  路径名称 文件夹加上图片路径
 */
export const getImgSrc  = (name) =>{
    return new URL(`../assets/${ name }`, import.meta.url).href;
}