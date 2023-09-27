import { gql } from "@apollo/client";
import { client } from "../constants/api";

export interface GetProfileType {
  user: User;
  checkFriend: Friend | null;
}

export const getUserProfile = async (_id: string) => {
  let res = await client.query<GetProfileType>({
    fetchPolicy: "no-cache",
    query: gql`
      query GetProfile($q: String!) {
        user(_id: $q) {
          name
          _id
          avatar
          cover
          hideFriendList
          nickname
          allowFollow
        }
        checkFriend(user: $q) {
          receiver {
            _id
          }
          sender {
            _id
          }
          confirm
        }
      }
    `,
    variables: {
      q: _id,
    },
  });

  return res.data;
};
