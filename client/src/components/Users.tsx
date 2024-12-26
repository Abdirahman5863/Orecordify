import { useEffect } from 'react';

const saveUser = async () => {
  const response = await fetch('/api/auth/new-user', {
    method: 'GET',
  });

  if (response.ok) {
    const user = await response.json();
    console.log('User saved:', user);
  } else {
    console.error('Failed to save user');
  }
};

const Users = () => {
  useEffect(() => {
    saveUser();
  }, []);

  return <div>Welcome to the application!</div>;
};

export default Users;
