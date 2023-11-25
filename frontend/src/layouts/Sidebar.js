import { Button, Nav, NavItem , ListGroup, ListGroupItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useDataContext } from "../data/DataContext";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  }
];

const Sidebar = () => {

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  const { data } = useDataContext();
  const { refetchData } = useDataContext();

  const handleButtonClick = () => {
    refetchData();
  };
  
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
      {/* <h2 class="display-4"><strong>Smart</strong> <span class="text-secondary">Casa</span></h2> */}
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-1 mt-2">
        <Nav vertical className="sidebarNav">
          {data.map((data, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navigation[0].href + '/' + index}
                className={
                  location.pathname === navigation[0].href + '/' + index
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navigation[0].icon}></i>
                <span className="ms-3 d-inline-block">
                  {"Sensor " + data.ID}
                </span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="danger"
            className="mt-3"
            onClick={handleButtonClick}
          >
            Refresh
          </Button>
        </Nav>
      </div>
      <div className="mt-5">
      <h5>Team B3</h5>
      <ListGroup flush>
        <ListGroupItem>Devika Baid 207221</ListGroupItem>
        <ListGroupItem>Antony Thoppil 207208</ListGroupItem>
        <ListGroupItem>Akshat Choudhary 207204</ListGroupItem>
      </ListGroup>
    </div>
    </div>
  );
};

export default Sidebar;
