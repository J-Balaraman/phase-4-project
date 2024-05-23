import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/ratings">Ratings</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
