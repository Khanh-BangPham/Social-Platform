import { gql } from '@apollo/client';
import { api, client } from '../constants/api';

export const interviewQuestionService = {
  addInterviewQuestion(body: InterviewQuestion) {
    return api.post<InterviewQuestion>('/interview-Question/add-Question', body);
  },

  async getQuestion() {
    let res = await client.query<{ getQuestion: InterviewQuestion[] }>({
      query: gql`
        query {
          getQuestion {
            _id
            templateId
            content
            similarQuestion
            sampleAnswer
            keyword
            format
            kind
          }
        }
      `,
    });

    return res.data.getQuestion;
  },
};
