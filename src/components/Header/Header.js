import "./Header.scss";
import SearchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/exposhare-logo.png";
import Favorites from "../../assets/icons/likes.svg";

function Header() {
  return (
    <>
      <header className="header-container">
        <div className="header">
          <Link to="/">
            <img className="header__logo" src={Logo} alt="exposhare logo" />
          </Link>
          <nav className="header__nav-bar">
            <form className="header__label">
              <input
                type="search"
                className="header__search header__search--active"
                placeholder="Search"
              ></input>
              <button type="submit"className="header__button"><img
                className="header__search-icon"
                src={SearchIcon}
                alt="search icon"
              /></button>
            </form>
            <div className="header__wrapper">
              <Link to="/favorites">
                <img
                  src={Favorites}
                  alt="favorites"
                  className="header__likes-icon"
                ></img>
              </Link>
              <div className="header__avatar"></div>
            </div>
          </nav>
        </div>
      </header>
      <section className="nav-container">
        <nav className="nav">
          <a href="#" className="nav__link nav__link--current">
            SHOP
          </a>
          <a href="#" className="nav__link">
            SELL
          </a>
          <a href="#" className="nav__link">
            TRADE
          </a>
          <a href="#" className="nav__link">
            FORUM
          </a>
          <a href="#" className="nav__link">
            NEWS
          </a>
        </nav>
      </section>
    </>
  );
}

export default Header;
