import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom"; 
import Logo from "../../assets/img/logo.png";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.textContent === 'Home') {
      navigate('/');
    } else {
      navigate('/about');
    }
  };

  return (
    <div className="header" data-testid="header">
      <div className="header__left">
        <img src={Logo} alt="logo" />
        <h1>BookHub</h1>
      </div>
      <div className="header__right">
        <button onClick={handleNavigate}>Home</button>
        <button onClick={handleNavigate}>About</button>
      </div>
    </div>
  );
};

export default Header;