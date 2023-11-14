import { Outlet, Link } from "react-router-dom";

// Navigation Bar placed on top of each page
const Layout = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <h3 style={{margin: "0 20px"}}>GardenWeb</h3>
        <button className="navbar-brand">
            <Link style={{ color: "black" }} to="/">Home</Link>
        </button>
      </nav>
      {/* Outlet is where subsequent components will be placed on page layout */}
      <Outlet />
    </div>
  );
};

export default Layout;