import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 mb-4">
      <Link className="navbar-brand fw-bold" to="/">📷 Oriza POS</Link>
      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/">📦 Orders</Link>
        <Link className="btn btn-outline-light me-2" to="/management">⚙️ Management</Link>
        <Link className="btn btn-outline-light" to="/analytics">📊 Analytics</Link>
      </div>
    </nav>
  );
}