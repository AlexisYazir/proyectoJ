import { createContext, useContext, useState } from "react";
import { getProductsRequest, getViewDetails, createProductRequest, getMarcasRequest, getCategoriasRequest } from "../api/products";

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('Error: useProducts must be used within a ProductProvider');
    }
    return context;
};


export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null); 
    const [errors, setErrors] = useState([]);

    const createProduct = async (productData) => {
        try {
            await createProductRequest(productData);
            await getProducts(); // Se llama a getProducts() para actualizar la lista después de crear
            setErrors([]); // Limpiar errores en caso de éxito
            return true;
        } catch (error) {
            setErrors([error.response.data]);
            console.error("Error al crear el producto:", error);
            return false;
        }
    };
    
    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [marcas, setMarcas] = useState([]);

    const getMarcas = async () => {
        try {
            const res = await getMarcasRequest();
            setMarcas(res.data);
            return res.data;
        } catch (error) {
            console.error("Error al obtener las marcas:", error);
            return [];
        }
    };

    const [categorias, setCategorias] = useState([]);

    const getCategorias = async () => {
        try {
            const res = await getCategoriasRequest();
            setCategorias(res.data);
            return res.data;
        } catch (error) {
            console.error("Error al obtener las categorias:", error);
            return [];
        }
    };
    const getDetails = async (id) => { // Recibe el id del producto
        try {
            const res = await getViewDetails(id); // Pasa el id a la API
            setProductDetails(res.data); // Almacena los detalles del producto
        } catch (error) {
            console.log(error);
        }
    };

    const clearErrors = () => {
        setErrors([]);
    };

    return (
        <ProductContext.Provider value={{errors,clearErrors, getProducts, products, getDetails, productDetails, createProduct, getCategorias, categorias, getMarcas, marcas }}>
            {children}
        </ProductContext.Provider>
    );
}