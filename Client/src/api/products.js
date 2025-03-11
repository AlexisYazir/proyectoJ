import axios from './axios';

//OK
export const getProductsRequest = () => axios.get("/product")
//OK
export const getMarcasRequest = () => axios.get("/marcas")
//OK
export const getCategoriasRequest = () => axios.get("/categorias")

//OK
export const getProductRequest = (id) => axios.get(`/add-product/${id}`)

//OK
export const createProductRequest = (product) => axios.post("/producto", product)
//ok
export const updateProductRequest = (id, product) => axios.put(`/products/${id}`, product)
//AUN NO
export const deleteProductRequest = (id) => axios.delete(`products/${id}`)


//OK
//para la vista detalle, AQUI NO SE LE PONEN LOS DOS PUNTOA PARA RECIBIR EL DETALLE, SI SE LE PONEN SE VA TODO A LA SKDLDBNSEAFDAFdf
export const getViewDetails = (id) => axios.get(`/view-details/${id}`)

