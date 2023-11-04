import { databaseConfig } from "@/common/config/database";
import { errorMiddleware } from "@/common/config/error.middleware";
import { AppDecorator, BaseApp } from "@core/decorator/AppDecorator";
import { config } from "dotenv";
import { FriendController } from "./friend/friend.controller";
import { UserController } from "./user/user.controller";
import { JwtMiddleware } from "@/common/config/jwt.middlware";
import { AuthController } from "./auth/auth.controller";
import { FileController } from "./file/file.controller";
import { GraphQLApp } from "./graphql";
import { PostController } from "./post/post.controller";
import express from "express";
import { ReportController } from "./report/report.controller";
import { CommentController } from "./comment/comment.controller";
import { HideContentController } from "./hide-content/hide-content.controller";
import { SocketApp } from "./socket";
import { PostLikeController } from "./post-like/post-like.controller";
import { InterviewQuestionController } from "./interview-question/interview-question.controller";
import { InterviewTemplateController } from "./interview-template/interview-template.controller";
import { InterviewRoomController } from "./interview-room/interview-room.controller";
import { InterviewAnswersController } from "./interview-answers/interview-answers.controller";

config();
let port = process.env.PORT;

@AppDecorator({
  controllers: [
    UserController,
    FriendController,
    AuthController,
    PostController,
    FileController,
    ReportController,
    CommentController,
    PostLikeController,
    HideContentController,
    InterviewQuestionController,
    InterviewTemplateController,
    InterviewRoomController,
    InterviewAnswersController
  ],
  database: databaseConfig,
  guard: JwtMiddleware,
  modules: [GraphQLApp, SocketApp],
})
class App extends BaseApp {}

let app = new App();

const main = async () => {
  app.use(errorMiddleware);
  app.use("/upload", express.static("upload"));
  // await server.start();
  // app.use("/graphql", expressMiddleware(server));
  app.listen(port, () => {
    console.log(`Server runing at http://localhost:${port}`);
  });
};

main();
