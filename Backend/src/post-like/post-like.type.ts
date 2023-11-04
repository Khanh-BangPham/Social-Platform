export interface CreatePostLikeInput {
  createdBy: string,
  refId: string
}

export interface BodyCreatePostLike
extends Omit<CreatePostLikeInput, "createdBy"> {}

export interface DeletePostLikeInput {
  createdBy: string,
  refId: string
}

export interface BodyDeletePostLike
extends Omit<DeletePostLikeInput, "createdBy"> {}

