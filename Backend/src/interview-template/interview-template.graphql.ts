import { AuthContext } from "@/common/@types/type";
import { Auth, GraphQL, Resolve } from "@/common/core/decorator";
import { User } from "@/user/user.model";
import { InterviewTemplate } from "./interview-template.model";
import mongoose from "mongoose";

@GraphQL(
  `InterviewTemplate`,
  `
  _id: String!
  managerId: String!
  status: String!
`
)
  export class InterviewTemplateSchema {
    @Resolve("getTemplate: [InterviewTemplate]")
    @Auth
    async getTemplate(parent: any, args: any, context: AuthContext) {
      return await InterviewTemplate.aggregate([
        {
          $match: {
                  managerId: {
                  $in: [new mongoose.mongo.ObjectId(context.user)],
                },
          },
        },
      ]).limit(6);
    }
    @Resolve("getTemplateById(_id: String): [InterviewTemplate]")
    @Auth
    async getTemplateById(parent: any, args: any, context: AuthContext) {
      return await InterviewTemplate.aggregate([
        {
          $match: {
                  _id: {
                  $in: [new mongoose.mongo.ObjectId(args._id)],
                },
          },
        },
      ]).limit(6);
    }
  }
