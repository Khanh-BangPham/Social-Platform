import { api } from "../constants/api";

export const hideContentService = {
  hidePost(id: string) {
    return api.post(`/hide-content/${id}`, { type: "Post" });
  },
  hideComment(id: string) {
    return api.post(`/hide-content/${id}`, { type: "Comment" });
  },
};
