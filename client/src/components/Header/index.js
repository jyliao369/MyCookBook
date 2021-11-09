import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="">
      <div className="header">

        <Link className="" to="/">
          <h1 className="appTitle">MyCookBook</h1>
        </Link>

        <p className="tagline">
          Let's Turn Up the Heat!!
        </p>

        <div className="dashboard">
          <Link className="" to="/recipes">
            Recipes
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link className="" to="/add">
                Add New Recipe
              </Link>
              <Link className="" to="/myprofile">
                My Cookbook
              </Link>
              <Link className="" onClick={logout} to="/">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="" to="/login">
                Login
              </Link>
              <Link className="" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
