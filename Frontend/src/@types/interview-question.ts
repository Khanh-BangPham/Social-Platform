interface InterviewQuestion {
    _id?: string,
    templateId: string,
    content: string,
    similarQuestion?: string[],
    sampleAnswer?: string[],
    keyword?: string[],
    format: string,
    kind?: string
}