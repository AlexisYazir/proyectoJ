export function Button({ onClick, children }) {
    return (
      <button
        className="btn btn-danger btn-sm"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }