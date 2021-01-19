import { gql } from '@apollo/client';

export const COMPANY_LIST = gql`
  {
    companies {
      _id
      name
    }
  }
`;

export const COMPANY_DETAILS = gql`
  query Company($_id: String!) {
    company(_id: $_id) {
      name
    }
  }
`;
