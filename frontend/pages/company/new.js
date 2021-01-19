import React, { useState } from 'react';
import styles from './New.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { gql, useMutation } from '@apollo/client';
import { COMPANY_LIST } from '../../queries/company';

const ADD_COMPANY = gql`
  mutation AddCompany($name: String!, $description: String) {
    addCompany(name: $name, description: $description) {
      name
      description
    }
  }
`;

const New = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [addCompany, { loading, error, data }] = useMutation(ADD_COMPANY);

  const submitHandler = (e) => {
    e.preventDefault();
    addCompany({
      variables: { name, description },
      refetchQueries: [{ query: COMPANY_LIST }],
    });
    setName('');
    setDescription('');
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <button>Back to home page</button>
      </Link>
      <h1>Create a new company:</h1>
      {loading ? (
        <h2>Loading....</h2>
      ) : (
        <form className={styles.form} onSubmit={submitHandler}>
          <label>name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <label>description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button>Create</button>
        </form>
      )}
    </div>
  );
};

export default New;
