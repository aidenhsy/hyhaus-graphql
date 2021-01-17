import React from 'react';

import { gql, useQuery } from '@apollo/client';

const COMPANY_LIST = gql`
  {
    companies {
      _id
      name
    }
  }
`;

const CompanyList = () => {
  const { loading, error, data } = useQuery(COMPANY_LIST);

  const renderCompanies = () =>
    data.companies.map((company) => <li key={company._id}>{company.name}</li>);

  return <div>{loading ? <h1>Loading...</h1> : renderCompanies()}</div>;
};

export default CompanyList;
