import { AuthContext } from "@/common/@types/type";
import { Auth, GraphQL, Resolve } from "@/common/core/decorator";
import { User } from "@/user/user.model";
import { InterviewRoom } from "./interview-room.model";
import mongoose from "mongoose";

@GraphQL(
  `InterviewRoom`,
  `
  _id: String!,
  intervieweeId: String!,
  interview_templateId: String!,
  record: String,
  evaluate: String
`
)
  export class InterviewRoomSchema {
    @Resolve("getRoom: [InterviewRoom]")
    @Auth
    async getRoom(parent: any, args: any, context: AuthContext) {
      return await InterviewRoom.aggregate([
        {
          $match: {
            intervieweeId: {
                  $in: [new mongoose.mongo.ObjectId(context.user)],
                },
          },
        },
      ]).limit(6);
    }

  }
