import { gql } from "graphql-request";

export const DELETE_POST = gql`
  mutation ($id: ID!) {
    deletePost(id: $id)
  }
`;
