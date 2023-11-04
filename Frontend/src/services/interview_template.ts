import { gql } from '@apollo/client';
import { api, client } from '../constants/api';

export const interviewTemplateService = {
  addInterviewTemplate(status: string) {
    return api.post<Friend>('/interview-template/add-template', { status });
  },

  async getTemplate() {
    let res = await client.query<{ getTemplate: InterviewTemplate[] }>({
      query: gql`
        query {
            getTemplate {
            _id
            managerId
            status
          }
        }
      `,
    });

    return res.data.getTemplate;
  },
};
