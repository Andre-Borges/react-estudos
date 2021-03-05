import React, { useContext } from 'react';
import {LoginContext} from '../../contexts/LoginContext';
import './Home.css';

const PagesHome = () => {
  const { setToken } = useContext(LoginContext);
  return (
    <div className="pages-home">
      Parabéns, você conseguiu
      <br />
      <button type="button" onClick={() => setToken(null)}>
        Sair
      </button>
    </div>
  );
};

export default PagesHome;