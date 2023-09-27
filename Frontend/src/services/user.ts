import { gql } from "@apollo/client";
import { api, client } from "../constants/api";

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface VerifyRegisterInput {
  email: string;
  code: string;
}

export interface UpdateLatLngInput {
  lat: number;
  lng: number;
}

export type UpdateUserInfo = Partial<
  Pick<User, "avatar" | "cover" | "name" | "nickname" | "allowFollow">
>;

export const userService = {
  getUser: async () => {
    // return api.get<User>("/user");

    let res = await client.query<{ profile: User }>({
      query: gql`
        query Profile {
          profile {
            avatar
            name
            email
            _id
            nickname
            cover
            hideFriendList
            allowFollow
          }
        }
      `,
    });
    return res.data.profile;
  },
  updateInfo: async (body: UpdateUserInfo) => {
    return api.patch("/user/update-info", body);
  },

  register: async (body: RegisterInput) => {
    return api.post<User>("/user/register", body);
  },

  verify: async (body: VerifyRegisterInput) => {
    return api.post("/user/verify-register", body);
  },

  search: async (q: string) => {
    let res = await client.query<{ users: User[] }>({
      query: gql`
        query SearchUser($q: String!) {
          users(q: $q) {
            name
            _id
            avatar
          }
        }
      `,
      variables: {
        q,
      },
    });
    return res.data.users;
  },
  updateLocation: async (body: UpdateLatLngInput) => {
    return api.post("/user/update-location", body);
  },
  block: async (userId: string) => {
    return api.post(`/user/block/${userId}`);
  },
  unblock: async (userId: string) => {
    return api.post(`/user/unblock/${userId}`);
  },
  follow: async (userId: string) => {
    return api.post(`/user/follow/${userId}`);
  },
  unfollow: async (userId: string) => {
    return api.post(`/user/unfollow/${userId}`);
  },
  getBlockUser: async () => {
    let res = await client.query<{ profile: User }>({
      fetchPolicy: "no-cache",
      query: gql`
        query Profile {
          profile {
            block {
              name
              _id
              avatar
              nickname
            }
          }
        }
      `,
    });
    return res.data.profile.block;
  },
  getFollow: async () => {
    let res = await client.query<{ profile: User }>({
      fetchPolicy: "no-cache",
      query: gql`
        query Profile {
          profile {
            follow {
              name
              _id
              avatar
              nickname
            }
          }
        }
      `,
    });

    return res.data.profile.follow;
  },
};
