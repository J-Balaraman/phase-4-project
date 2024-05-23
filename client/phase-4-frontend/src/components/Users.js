import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const addUser = (user) => {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(newUser => setUsers([...users, newUser]));
  };

  return (
    <div>
      <h2>Users</h2>
      <UserForm onSubmit={addUser} />
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
