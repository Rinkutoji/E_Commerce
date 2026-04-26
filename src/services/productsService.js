import request from "./api";
export const getProducts = ()=> request('/products')
export const getProduct = (id) => request('/products/' +id)
export const getByCategory = (cat) => request('/products/category/' + cat)
export const getCategories = () => request('/products/categories')