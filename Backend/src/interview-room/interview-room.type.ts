export interface CreateInterviewRoomInput {
    intervieweeId: String,
    interview_templateId: String,
    record: String,
    evaluate: Number
  }
  
export interface BodyCreateInterviewRoom
  extends Omit<CreateInterviewRoomInput, "intervieweeId" | "interview_templateId"> {}
  
  
  