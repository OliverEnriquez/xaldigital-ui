import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Categoria",
    href: "/categoria",
    icon: "bi bi-card-list",
  },
  {
    title: "Proveedor",
    href: "/proveedor",
    icon: "bi bi-truck",
  },
  {
    title: "Producto",
    href: "/producto",
    icon: "bi-box-seam  ",
  },
  {
    title: "Compras",
    href: "/compra",
    icon: "bi bi-wallet2",
  },
  {
    title: "Ventas",
    href: "/venta",
    icon: "bi bi-cash",
  },
  {
    title: "Usuarios",
    href: "/usuario",
    icon: "bi bi-user",
  },
  ,
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const closeMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                onClick={closeMobilemenu}
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
