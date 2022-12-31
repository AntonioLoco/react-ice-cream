import React, { useEffect, useState } from "react";
import Gelato from "./Gelato";
import navLinks from "../navigationMenu";
import axios from "axios";
const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";

const Menu = () => {
  const [menuGelati, setMenuGelati] = useState([]);
  const [navigationMenu, setNavigationMenu] = useState(navLinks);
  const [activeNavigation, setActiveNavigation] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(url);
      setMenuGelati(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <LoaderPage />;
  }

  if (isError) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <div className="container wrapper-menu mt-5">
      <h2 className="text-center">Le nostre scelte</h2>
      <NavigationBar
        links={navigationMenu}
        activeNavigation={activeNavigation}
        setActiveNavigation={setActiveNavigation}
      />
      {/* Menu List */}
      <div className="row row-cols-1 row-cols-sm-2 g-5">
        {menuGelati.map((el) => {
          if (activeNavigation == "all" || activeNavigation == el.categoria) {
            return (
              <div className="col px-4">
                <Gelato {...el} key={el.id} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export const NavigationBar = (props) => {
  return (
    <div className="row row-cols-4 mt-5 mb-4">
      {props.links.map((el) => {
        return (
          <div className="col text-center" key={el.id}>
            <a
              className={el.name == props.activeNavigation ? "active" : ""}
              onClick={() => {
                props.setActiveNavigation(el.name);
              }}
            >
              {el.name}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export const LoaderPage = () => {
  return (
    <div className="loader">
      <h1>Loading...</h1>
    </div>
  );
};

export const ErrorPage = (props) => {
  return (
    <div className="loader">
      <h1>{props.message}!!! Ricarica la pagina</h1>
    </div>
  );
};

export default Menu;
