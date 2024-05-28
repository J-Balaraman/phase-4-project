import React from 'react';

function Home() {
  return (
    <div>
      <h1>Welcome to the Library Management System</h1>
      <p>Use the navigation bar above to explore the different features of the system.</p>

      <h2>Features</h2>
      <ul>
        <li><a href="/users">User Management</a> - Manage user accounts, view user details, and add new users.</li>
        <li><a href="/books">Book Management</a> - Browse the book catalog, add new books, and manage existing books.</li>
        <li><a href="/ratings">Ratings</a> - View and manage book ratings.</li>
      </ul>

      <h2>About</h2>
      <p>This application is built using the Flask framework and SQLAlchemy for database management. It supports CRUD operations for users, books, and borrow records, and it uses RESTful APIs to interact with the database.</p>

      <p>For more information, check out the project's documentation and source code on <a href="https://github.com/your-repo">GitHub</a>.</p>
    </div>
  );
}

export default Home;
