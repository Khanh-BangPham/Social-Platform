import { api } from "../constants/api";
import { ReporType } from "../@types/report";

export const reportService = {
  createReport(id: string, type: ReporType) {
    return api.post(`/report/${id}`, { type });
  },
  reportComment(id: string) {
    return api.post(`/report/${id}`, { type: "Comment" });
  },
};
