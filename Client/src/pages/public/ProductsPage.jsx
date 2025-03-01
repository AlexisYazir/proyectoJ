import { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const ProductsPage = () => {
    const { getProducts, products } = useProducts();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4; // Puedes ajustar la cantidad de productos por página

    useEffect(() => {
        getProducts();
    }, []);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // Paginación: calcular el índice de inicio y el índice final de los productos para la página actual
    const offset = currentPage * itemsPerPage;
    const currentProducts = products.slice(offset, offset + itemsPerPage);

    return (
        <div className="container">
            <h1 className="my-4 text-center">Productos</h1>
            {products.length === 0 ? (
                <p className="text-center">No hay productos disponibles</p>
            ) : (
                <div>
                    <div className="row">
                        {currentProducts.map((product) => (
                            <div key={product._id} className="col-12 col-md-6 col-lg-3 mb-4">
                                <div className="card product-card">
                                    <div className="card-body">
                                        <img className="product-image" src={product.imagen} alt={product.nombre_producto} />
                                        <div className="product-info">
                                            <h5 className="product-card-title">{product.nombre_producto}</h5>
                                            <p className="product-card-text"><strong>Marca:</strong> {product.marca}</p>
                                            <p className="product-card-price"><strong>Precio:</strong> ${product.precio}</p>
                                        </div>
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={`/view-details/${product._id}`} className="btn btn-custom-cancel mt-2 text-white">Ver</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginación con botones grandes */}
                    <ReactPaginate
                        pageCount={Math.ceil(products.length / itemsPerPage)} // Número total de páginas
                        pageRangeDisplayed={5} // Cuántas páginas mostrar en la paginación
                        marginPagesDisplayed={2} // Páginas de margen a mostrar
                        onPageChange={handlePageChange} // Maneja el cambio de página
                        containerClassName="pagination justify-content-center mb-2"
                        pageClassName="page-item" // Clase para cada página
                        pageLinkClassName="page-link" // Clase para el link de cada página
                        nextClassName="page-item" // Clase para el botón siguiente
                        nextLinkClassName="page-link" // Clase para el link del botón siguiente
                        previousClassName="page-item" // Clase para el botón anterior
                        previousLinkClassName="page-link" // Clase para el link del botón anterior
                        breakClassName="page-item" // Clase para los puntos suspensivos
                        breakLinkClassName="page-link" // Clase para el link de los puntos suspensivos
                        activeClassName="active" // Clase para la página activa
                        activeLinkClassName="bg-primary text-white" // Color de fondo para la página activa
                        nextLabel={">"} // Etiqueta para el botón siguiente
                        previousLabel={"<"} // Etiqueta para el botón anterior
                    />
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
