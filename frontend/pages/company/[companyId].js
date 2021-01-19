import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './CompanyId.module.css';
import components from '../../components/';

import { useLazyQuery } from '@apollo/client';
import { COMPANY_DETAILS } from '../../queries/company';

const CompanyDetails = () => {
  const router = useRouter();

  const [getCompany, { loading, data }] = useLazyQuery(COMPANY_DETAILS);

  useEffect(() => {
    if (router.query.companyId) {
      getCompany({ variables: { _id: router.query.companyId } });
    }
  }, [router.query]);

  if (loading) return <h1>Loading....</h1>;

  return (
    <div className={styles.container}>
      {data && <h1>{data.company.name}</h1>}
      <h1>Create New User</h1>
      <components.UserCreate />
    </div>
  );
};

export default CompanyDetails;
