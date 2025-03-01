import { useEffect, useState } from "react";
import { useProducts } from "../../../../context/ProductsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

export const ProductCatalog = () => {
    const { getProducts, products } = useProducts();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 4;

    useEffect(() => {
        getProducts();
    }, []);

    // Filtrar productos
    const filteredProducts = Array.isArray(products)
        ? products.filter(product =>
            Object.values(product).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : [];

    const currentProducts = filteredProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center card-title">Catálogo de Productos</h1>

            {/* Barra de búsqueda */}
            <div className="input-group mb-3">
                <span className="input-group-text span">
                    <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-center">No hay productos disponibles</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered rounded text-center">
                        <thead className="table-dark">
                            <tr>
                                <th className="d-none d-md-table-cell">ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th className="d-none d-md-table-cell">Stock</th>
                                <th>Marca</th>
                                <th className="d-none d-md-table-cell">Categoría</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => (
                                <tr key={product._id}>
                                    <td className="d-none d-md-table-cell">{product._id}</td>
                                    <td>{product.nombre_producto}</td>
                                    <td>${product.precio}</td>
                                    <td className="d-none d-md-table-cell">{product.stock}</td>
                                    <td>{product.marca}</td>
                                    <td className="d-none d-md-table-cell">{product.categoria}</td>
                                    <td>
                                        <img
                                            src={product.imagen}
                                            alt={product.nombre_producto}
                                            className="img-fluid rounded"
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <button className="btn btn-warning btn-sm">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button className="btn btn-danger btn-sm">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <ReactPaginate
                        pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                        containerClassName="pagination justify-content-center mt-3"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        activeClassName="active"
                        nextLabel=">"
                        previousLabel="<"
                    />
                </div>
            )}
        </div>
    );
};

export default ProductCatalog;
