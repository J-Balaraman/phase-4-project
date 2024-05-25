import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => {
        console.error('There was an error fetching the users:', error);
        setError(error);
      });
  }, []);

  const addUser = (user) => {
    fetch('http://127.0.0.1:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(newUser => setUsers([...users, newUser]))
    .catch(error => {
      console.error('There was an error adding the user:', error);
      setError(error);
    });
  };

  return (
    <div>
      <h2>Users</h2>
      {error && <div className="error">{error.message}</div>}
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
