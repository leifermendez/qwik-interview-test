import { gql } from "graphql-request";

export const GET_POST = gql`
  query ($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;
