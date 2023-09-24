import { faker } from '@faker-js/faker';
import _, { uniqueId } from 'lodash';
import { convertFileToImage } from './file';

export const mock =
  <T>(callback: () => T) =>
  (count = 10) =>
    Array.from(new Array(Math.round(count))).map(callback);

export const fakeApi = <T>(callback: () => T) =>
  new Promise<T>((res) => {
    setTimeout(() => {
      res(callback());
    }, Math.random() * 1500);
  });

export const mockMedia = () => ({
  id: uniqueId(),
  thumbnail: faker.image.url({ height: 200, width: 200 }),
  original: faker.image.url(),
});

export const mockUser = () => ({
  id: uniqueId(),
  fullName: faker.person.fullName(),
  avatar: faker.internet.avatar(),
  online: Math.random() < 0.5,
  messageCount: faker.number.int({ min: 0, max: 10 }),
  story: Math.random() < 0.2,
  jobTitle: faker.person.jobTitle(),
  cover: faker.image.url({ width: 1900, height: 500 }),
  bio: 'Không có chiến thắng nào không có sự hy sinh',
});

export const mockComment = () => ({
  id: uniqueId(),
  user: mockUser(),
  content: faker.lorem.sentence({ min: 1, max: 10 }),
  createdAt: faker.date.past(),
  replyCount: faker.number.int({ min: 0, max: 100 }),
  replies:
    Math.random() > 0
      ? [
          {
            user: mockUser(),
            content: faker.lorem.sentence({ min: 1, max: 10 }),
            createdAt: faker.date.past(),
            replyCount: faker.number.int({ min: 0, max: 100 }),
          },
        ]
      : [],
});

export const mockMessage = () => ({
  content: faker.lorem.paragraph(1),
  sender: mockUser(),
  myMessage: Math.random() > 0.5,
  id: uniqueId(),
  img:
    Math.random() < 0.1
      ? mock(() => ({
          id: uniqueId(),
          thumbnail: faker.image.url({ height: 500, width: 500 }),
        }))(Math.round(Math.random() * 10) + 1)
      : undefined,
  url:
    Math.random() < 0.05
      ? {
          title: faker.lorem.lines(2),
          image: faker.image.url({ width: 500, height: 500 }),
          link: faker.internet.url(),
        }
      : undefined,
});

export const mockPost = () => ({
  id: uniqueId(),
  content: faker.lorem.lines(2),
  user: mockUser(),
  country: faker.location.country(),
  city: faker.location.city(),
  createdAt: faker.date.past(),
  heartCount: faker.number.int({ min: 0, max: 10000 }),
  commentCount: faker.number.int({ min: 0, max: 100 }),
  shareCount: faker.number.int({ min: 0, max: 100 }),
  image: faker.image.url(),
  images: mock(mockMedia)(Math.random() * 10 + 1),
  like: Math.random() > 0.5,
  comments: mockComments(Math.random() * 10),
});

export const mockStory = () => ({
  id: uniqueId(),
  src: faker.image.url({ height: 500, width: 500 }),
  user: mockUser(),
});

export const mockUploadImage = (file: File) => {
  return new Promise<{ path: string; id: string }>(async (res) => {
    const imgSrc = await convertFileToImage(file);
    res({ path: imgSrc, id: uniqueId() });
  });
};

export const mockNotification = () => ({
  id: uniqueId(),
  user: mockUser(),
  createdAt: faker.date.past(),
  type: _.sample(['AddFriend', 'Tag', 'Follow', 'Like', 'TagStory']) as any,
  isRead: Math.random() > 0.3,
});

export const mockMessages = mock(mockMessage);
export const mockPosts = mock(mockPost);
export const mockStories = mock(mockStory);
export const mockUsers = mock(mockUser);
export const mockComments = mock(mockComment);
export const mockNotifications = mock(mockNotification);

export interface IPost extends ReturnType<typeof mockPost> {}
export interface IComment extends ReturnType<typeof mockComment> {}
export interface IUser extends ReturnType<typeof mockUser> {}
export interface INotification extends ReturnType<typeof mockNotification> {}
export interface IMessage extends ReturnType<typeof mockMessage> {}
