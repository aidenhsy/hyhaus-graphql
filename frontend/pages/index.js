import styles from '../styles/Home.module.css';
import Link from 'next/link';

import { gql, useQuery, useMutation } from '@apollo/client';
import { COMPANY_LIST } from '../queries/company';

const DELETE_COMPANY = gql`
  mutation DeleteCompany($_id: String!) {
    deleteCompany(_id: $_id) {
      _id
    }
  }
`;

const Home = () => {
  const { loading: loadingList, data: dataList } = useQuery(COMPANY_LIST);

  const [deleteCompany, { loading: loadingDelete }] = useMutation(
    DELETE_COMPANY
  );

  return (
    <div className={styles.container}>
      {loadingList || loadingDelete ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {dataList.companies.map((company) => (
            <li key={company._id}>
              <Link href={`/company/${company._id}`}>{company.name}</Link>
              <button
                onClick={() => {
                  deleteCompany({
                    variables: { _id: company._id },
                    refetchQueries: [{ query: COMPANY_LIST }],
                  });
                }}
              >
                delete
              </button>
            </li>
          ))}
          <Link href="/company/new">
            <button>Create a new company</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
