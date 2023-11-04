export interface CreateInterviewQuestionInput {
    templateId: string,
    content: string,
    similarQuestion?: string[],
    sampleAnswer?: string[],
    keyword?: string[],
    format: 'multiple-choice' | 'essay' | 'orally' | 'files',
    kind?: string
  }
  
// export interface BodyCreateInterviewQuestion
//   extends Omit<CreateInterviewQuestionInput, "templateId"> {}
  
  
  