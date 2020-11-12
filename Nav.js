import React,{useEffect,useState} from "react";
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
            handleShow(true);
        }
     else handleShow(false);
        
});

return () => {
    window.removeEventListener("scroll");
};
    }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="//upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        src="https://avatars0.githubusercontent.com/u/33469024?s=460&u=ad53475403cec48b674151dda2c4e6af187922e0&v=4"
        alt="Avatar Logo"
      />
    </div>
  );
}

export default Nav;
