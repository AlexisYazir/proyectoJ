import { createContext, useContext, useState } from "react";
import { createMisionVisionRequest } from "../api/company";

const CompanyContext = createContext();

export const useCompany = () => {
    const context = useContext(CompanyContext);

    if (!context) {
        throw new Error('Error: useCompany must be used within a CompanyProvider');
    }
    return context;
};


export function CompanyProvider({ children }) {
    const [companys, setCompanys] = useState([]);
    const [errors, setErrors] = useState([]);

    const createMisionVision = async (companyData) => {
        try {
            await createMisionVisionRequest(companyData);
            //await getProducts(); // Se llama a getProducts() para actualizar la lista después de crear
            setErrors([]); // Limpiar errores en caso de éxito
            return true;
        } catch (error) {
            setErrors([error.response.data]);
            console.error("Error al crear el producto:", error);
            return false;
        }
    };

    const clearErrors = () => {
        setErrors([]);
    };

    return (
        <CompanyContext.Provider value={{ errors, clearErrors, createMisionVision,companys }}>
            {children}
        </CompanyContext.Provider>
    );
}