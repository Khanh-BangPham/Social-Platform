import { gql } from '@apollo/client';
import { api, client } from '../constants/api';

export const interviewRoomService = {
  addInterviewRoom(body: InterviewRoom) {
    return api.post<InterviewRoom>('/interview-room/add-room', body);
  },

  async getRoom() {
    let res = await client.query<{ getRoom: InterviewRoom[] }>({
      query: gql`
        query {
          getRoom {
            _id
            intervieweeId
            interview_templateId
            record
            evaluate
          }
        }
      `,
    });

    return res.data.getRoom;
  },
};
