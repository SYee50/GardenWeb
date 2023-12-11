import { Outlet, Link } from "react-router-dom";

// Navigation Bar placed on top of each page
const Layout = () => {
  return (
    <div>
      {/* <nav className="navbar navbar-light bg-light"> */}
      <nav className="navbar">
        <h3>GardenWeb</h3>
        <button className="navbar-brand home-button">
            <Link to="/">Home</Link>
        </button>
      </nav>
      
      {/* Outlet is where subsequent components will be placed on page layout */}
      <Outlet />
    </div>
  );
};

export default Layout;