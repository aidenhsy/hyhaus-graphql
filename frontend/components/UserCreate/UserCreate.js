import React, { useState } from 'react';

const UserCreate = () => {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(typeof parseInt(age));
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserCreate;
