  import { FcPaid } from "react-icons/fc";
  import {
    Avatar,
    Badge,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
  } from "flowbite-react";
  import imgLogo from "../assets/photos.png";
  import { Route, useNavigate } from "react-router-dom";
  import Products from "../pages/Products";
  import { Link } from "react-router-dom";
  import { useState, useEffect, useContext } from "react";
  import { Spinner } from "flowbite-react";
  import { AuthContext } from "../context/AuthContext";
  import { CartContext } from "../context/CartContext";

  export default function NavbarComponets() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isLogin, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    async function getDataUsers() {
      const url = "https://api.escuelajs.co/api/v1/users/1";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setUser(result);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      getDataUsers();
    }, []);

    function hadleLogout() {
      logout();
      navigate("/");
    }

    const { cart } = useContext(CartContext);
    return (
      <div>
        {loading == true ? (
          <div className="flex justify-center"></div>
        ) : (
          <Navbar fluid rounded>
            <NavbarBrand href="">
              <img
                src={imgLogo}
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite React Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Fake store app
              </span>
            </NavbarBrand>
            <div className="flex md:order-2">
              <Link to="/cart">
                <Badge
                  color="failure"
                  style={{
                    marginRight: "35px",
                    marginTop: "-5px",
                    zIndex: "1",
                    borderRadius: "50%",
                  }}
                >
                  {cart.length}
                </Badge>
              <FcPaid className="text-5xl me-2 pt-2" />
              </Link>
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="User settings" img={user.avatar} rounded />}
              >
                <DropdownHeader>
                  <span className="block text-sm">{user.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </DropdownHeader>
                <DropdownItem>
                  <Link to="/User">Profil</Link>
                </DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Earnings</DropdownItem>
                <DropdownDivider />
                <DropdownItem>
                  {isLogin ? (
                    <Button color="red" className="ms-3" onClick={hadleLogout}>
                      Logout
                    </Button>
                  ) : (
                    <Button
                      color="blue"
                      className="ms-3"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  )}
                </DropdownItem>
              </Dropdown>
              <NavbarToggle />
            </div>
            <ul className="flex flex-row gap-2">
              <li>
                <Link to="/" className="text-gray-900 dark:text-white">
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link to="/Products" className="text-gray-900 dark:text-white">
                  Products{" "}
                </Link>
              </li>
            </ul>
          </Navbar>
        )}
      </div>
    );
  }
