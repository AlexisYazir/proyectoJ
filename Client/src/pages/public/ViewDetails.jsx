import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';

export const ViewDetails = () => {
    const { id } = useParams(); // Obtén el id del producto desde la URL
    const { getDetails, productDetails } = useProducts();

    // Llama a getDetails cuando el componente se monte
    useEffect(() => {
        getDetails(id);
    }, []);

    if (!productDetails) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center gap-2 mb-3">
                <Link to={`/catalog`} className="btn btn-custom-cancel mt-2 text-white">Volver</Link>
            </div>
            <div className="card product-card">
                <div className="card-body product-card-body">
                    <img className="product-image" src={productDetails.imagen} alt={productDetails.nombre_producto} />
                    <div className="product-info">
                        <h5 className="product-card-title">{productDetails.nombre_producto}</h5>
                        <p className="product-card-text">
                            <strong>Descripción:</strong> {productDetails.descripcion}
                        </p>
                        <p className="product-card-text"><strong>Marca:</strong> {productDetails.marca}</p>
                        <p className="product-card-text"><strong>Precio:</strong> ${productDetails.precio}</p>
                        <p className="product-card-text"><strong>Existencias:</strong> {productDetails.stock}</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ViewDetails;