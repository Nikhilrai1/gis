import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";

const navLink = [
  {
    path: "/overview",
    name: "Overview",
  },
  {
    path: "/pricing",
    name: "Pricing",
  },
  {
    path: "/map",
    name: "Map",
  },
  {
    path: "/service",
    name: "Service",
  },
];

const LandingNavbar = () => {

  return (
    <nav className="absolute text-white z-[999] flex justify-between items-center px-16 w-full">
      <Link to="/home">
        <img
          src="/nep-gis-logo.png"
          alt="Nep Gis logo"
          className="h-[123px] w-[156px]"
        />
      </Link>

      <ul className="flex justify-between items-center gap-4 ">
        {navLink.map((link, idx) => (
          <li
            key={idx}
            className="hover:bg-slate-200 p-2 hover:text-black rounded transition-all duration-300 ease-in"
          >
            <NavLink to={link.path}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
      {/* <Button.Group>
        {!token && !id ? (
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Button>
        )}
        <Button variant="ghost" onClick={handleNavItemClick}>
          Get in touch
        </Button>
      </Button.Group> */}
      <Button
        className="border border-slate-200 hover:bg-slate-200 hover:text-black p-2 px-6"
      >
        Get in touch
      </Button>
    </nav>
  );
};

export default LandingNavbar;
