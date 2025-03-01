import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

export const UsersCatalog = () => {
    const { getUsers, users } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // Estado de búsqueda
    const itemsPerPage = 4;

    useEffect(() => {
        getUsers();
    }, []);

    // Filtrar usuarios
    const filteredUsers = Array.isArray(users)
        ? users.filter(user =>
            Object.values(user).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : [];

    // Paginacion
    const currentUsers = filteredUsers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center card-title">Catálogo de Usuarios</h1>
            <div className="input-group mb-3">
                <span className="input-group-text span">
                    <FontAwesomeIcon icon={faSearch} /> 
                </span>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            

            {currentUsers.length === 0 ? (
                <p className="text-center">No hay usuarios disponibles para mostrar</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th className="d-none d-md-table-cell">ID</th>
                                <th>Usuario</th>
                                <th>Nombre</th>
                                <th className="d-none d-md-table-cell">Apellido</th>
                                <th>Rol</th>
                                <th className="d-none d-md-table-cell">Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user._id}>
                                    <td className="d-none d-md-table-cell">{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td className="d-none d-md-table-cell">{user.apellidoP}</td>
                                    <td>{user.rol}</td>
                                    <td className="d-none d-md-table-cell">{user.email}</td>
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
                        pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
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
}

export default UsersCatalog;
