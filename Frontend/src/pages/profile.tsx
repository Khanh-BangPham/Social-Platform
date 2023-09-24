import { Contenteditable } from '@components/atoms/Contenteditable';
import { DropFile } from '@components/atoms/DropFile';
import { IconAddressBook } from '@components/atoms/Icon/IconAddressBook';
import { IconArrowDown } from '@components/atoms/Icon/IconArrow';
import { IconTie } from '@components/atoms/Icon/IconTie';
import { IconWorld } from '@components/atoms/Icon/IconWorld';
import { Menu } from '@components/atoms/Menu';
import { Sticky } from '@components/atoms/Sticky';
import { UploadFile, UploadfileRef } from '@components/atoms/UploadFile';
import { CardGroup } from '@components/features/CardGroup';
import { GeneralInfo } from '@components/features/GeneralInfo';
import { useTitle } from '@hooks/useTitle';
import { cn } from '@utils';
import { convertFileToImage } from '@utils/file';
import { mockUser } from '@utils/mock';
import { useId, useRef, useState } from 'react';
import { Avatar } from '../components/atoms/Avatar';
import { Button } from '../components/atoms/Button';
import { Card } from '../components/atoms/Card';
import { Dropdown } from '../components/atoms/Dropdown';
import { ButtonIconCamera } from '../components/atoms/Icon/IconCamera';
import { ButtonIconThreeDotAction } from '../components/atoms/Icon/IconThreeDotAction';
import { ModalAbout } from '../components/features/About';
import { ModalFriends } from '../components/features/ModalFriends';
import { NewPost } from '../components/features/NewPost';
import { Post } from '../components/features/Post';
import { useTranslate } from '@components/atoms/TranslateProvider';

export const Profile = () => {
  const { t } = useTranslate();
  const [open, setOpen] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [cover, setCover] = useState('https://unsplash.it/2000/700');
  const [user, setUser] = useState(mockUser);
  const uploadFileAvatarRef = useRef<UploadfileRef>(null);

  useTitle('Đặng Thuyền Vương');
  const [isEditBio, setIsEditBio] = useState(false);

  return (
    <>
      <ModalFriends open={open} onCancel={() => setOpen(false)} />
      <ModalAbout open={openAbout} onCancel={() => setOpenAbout(false)} />
      <div>
        <div className="bg-white dark:bg-slate-900">
          <div className="relative">
            <DropFile
              className="h-[500px] w-full"
              includes={{
                files: async ([file]) => {
                  const img = await convertFileToImage(file);
                  setCover(img);
                },
              }}
            >
              <img className="object-cover w-full h-full" src={cover} />
            </DropFile>
            <div className="container relative mx-auto">
              <UploadFile
                onChange={async ([file]) => {
                  const img = await convertFileToImage(file);
                  setCover(img);
                }}
              >
                <Button className="cursor-pointer absolute bottom-2 right-2 text-white  text-sm flex items-center !bg-black !bg-opacity-30 hover:!bg-opacity-40">
                  <ButtonIconCamera
                    transparent
                    className="text-white hover:bg-transparent"
                  />
                  {t('Change cover photo')}
                </Button>
              </UploadFile>
            </div>
          </div>
          <div className="container mx-auto px-4">
            <div className="flex gap-6 -mt-8 pb-8 border-b border-solid border-gray-300 px-4 dark:border-slate-700">
              <Dropdown
                autoClose
                content={
                  <Menu
                    menus={[
                      {
                        label: t('View profile picture'),
                        onClick: () => {},
                      },
                      {
                        label: t('Update profile picture'),
                        onClick: () => uploadFileAvatarRef.current?.trigger(),
                      },
                      {
                        label: t('Protect your profile picture'),
                      },
                    ]}
                  />
                }
              >
                <div className="active:scale-95 relative shadow-[0_0_0_3px] shadow-white rounded-full dark:shadow-slate-900">
                  <DropFile
                    backdropClassName="rounded-full"
                    includes={{
                      files: async ([file]) => {
                        const img = await convertFileToImage(file);
                        setUser({ ...user, avatar: img });
                      },
                    }}
                  >
                    <Avatar
                      className="select-none"
                      size={180}
                      src={user.avatar}
                    />
                  </DropFile>
                  <UploadFile
                    ref={uploadFileAvatarRef}
                    onChange={async ([file]) => {
                      const img = await convertFileToImage(file);
                      setUser({ ...user, avatar: img });
                    }}
                  >
                    <ButtonIconCamera className="absolute bottom-1 right-5" />
                  </UploadFile>
                </div>
              </Dropdown>

              {/* <div className="mt-auto">
                <h1 className="text-3xl font-bold">
                  Vương Đặng Thuyền <span className="font-normal">(Nar)</span>
                </h1>
                <p className="text-gray-600 font-semibold">543 Friends</p>
                <div className="flex [&>*]:-ml-1 [&>*]:shadow-[0_0_0_2px] [&>*]:shadow-gray-200 [&>*]:rounded-full dark:[&>*]:shadow-slate-900 mt-2">
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </div>
              </div> */}
            </div>
          </div>

          <div className="container mx-auto flex px-4 pt-1 items-center">
            <div className="flex">
              <a
                href="#"
                className="flex items-center pb-4 font-bold text-blue-500 border-b-2 border-solid border-blue-500 px-3 pt-4"
              >
                {t('Posts')}
              </a>
              <a
                href="#"
                className="flex items-center dark:border-slate-900 dark:hover:bg-slate-800 pb-4 text-gray-700 dark:text-gray-400 px-3 border-b-2 border-solid border-white hover:bg-gray-100 rounded pt-4"
                onClick={(ev) => {
                  ev.preventDefault();
                  setOpenAbout(true);
                }}
              >
                {t('Account')}
              </a>
              <a
                onClick={(ev) => {
                  ev.preventDefault();
                  setOpen(true);
                }}
                href="#"
                className="flex items-center dark:border-slate-900 dark:hover:bg-slate-800 pb-4 text-gray-700 dark:text-gray-400 px-3 border-b-2 border-solid border-white hover:bg-gray-100 rounded pt-4"
              >
                {t('Friends')}
              </a>
              <a
                href="#"
                className="flex items-center dark:border-slate-900 dark:hover:bg-slate-800 pb-4 text-gray-700 dark:text-gray-400 px-3 border-b-2 border-solid border-white hover:bg-gray-100 rounded pt-4"
              >
                {t('Image')}
              </a>
              <Dropdown
                content={
                  <div className="w-[200px]">
                    <div className="p-2 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer rounded">
                      Followers
                    </div>
                    <div className="p-2 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer rounded">
                      Manage sections
                    </div>
                  </div>
                }
                className="dark:border-slate-900 dark:hover:bg-slate-800 pb-4 text-gray-700 dark:text-gray-400 px-3 border-b-2 border-solid border-white hover:bg-gray-100 rounded pt-4 cursor-pointer"
              >
                {t('See more')}
                <IconArrowDown />
              </Dropdown>
            </div>
            <div className="ml-auto">
              <ButtonIconThreeDotAction />
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 flex gap-4">
          <div className="relative">
            <Sticky top={66} bottom={16}>
              <div className="text-sm flex flex-col gap-4 w-[400px] sticky bottom-6 self-start">
                <Card title="Giới thiệu">
                  {/* <Textarea
                  placeholder="Mô tả về bạn"
                  maxLength={150}
                  isTextarea={isEditBio}
                  className={cn(
                    'border-b-slate-700 border-transparent border font-bold text-center mt-4 mb-4 w-full bg-transparent px-3 py-4 resize-none overflow-hidden select-none cursor-text',
                    {
                      'focus:!border-primary-500 !border-slate-700 rounded bg-black bg-opacity-10 h-[70px]':
                        isEditBio,
                    },
                  )}
                  disabled={!isEditBio}
                >
                  There's no victory without sacrifice
                </Textarea> */}
                  <Contenteditable
                    placeholder="Thêm mô tả về bạn"
                    maxLength={125}
                    id={useId()}
                    className={cn(
                      ' after:left-1/2 after:-translate-x-1/2 text-center dark:border-b-slate-700 border-gray-200 border-transparent border font-bold  mt-4 mb-4 w-full bg-transparent px-3 py-4 resize-none overflow-hidden cursor-text min-h-[54px]',
                      {
                        'focus:!caret-primary-500 focus:!border-primary-500 dark:border-slate-700 border-gray-200 rounded bg-white dark:bg-black !bg-opacity-5 ':
                          isEditBio,
                      },
                    )}
                    disabled={!isEditBio}
                  >
                    There's no victory without sacrifice
                  </Contenteditable>
                  {/* <hr className="my-4" /> */}
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex gap-2 items-center">
                      <IconTie size={20} />
                      Lập trình viên Fullstack
                    </div>
                    <div className="flex gap-2 items-center">
                      <IconTie size={20} />
                      Lập trình Backend
                    </div>
                    <div className="flex gap-2 items-center">
                      <IconTie size={20} />
                      Lập trình viên Frontend
                    </div>
                    <div className="flex gap-2 items-center">
                      <IconAddressBook size={20} />
                      Hồ Chí Minh
                    </div>
                    <div className="flex gap-2 items-center">
                      <IconWorld size={20} />
                      <a href="#" target="_blank" className="text-blue-500">
                        spacedev.vn
                      </a>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setIsEditBio(!isEditBio)}
                    type={isEditBio ? 'primary' : 'default'}
                  >
                    {isEditBio ? 'Cập nhật' : 'Chỉnh sửa'}
                  </Button>
                </Card>
                <CardGroup />
                <Card
                  title="Photos"
                  action={
                    <a
                      href="#"
                      className="dark:hover:bg-slate-800 text-blue-500 hover:bg-gray-100 rounded px-3 py-0.5"
                    >
                      Xem tất cả
                    </a>
                  }
                >
                  <div className="mt-3 gap-3 grid grid-cols-3 flex-wrap">
                    {[...new Array(9)].map((_, i) => (
                      <a key={i} href="#" className="">
                        <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                          <img
                            className="object-cover w-full h-full"
                            src={`https://unsplash.it/150/150?t=${Math.random()}`}
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </Card>
                <GeneralInfo />
              </div>
            </Sticky>
          </div>

          <div className="flex-1 rounded-lg flex gap-4 flex-col">
            <NewPost />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </>
  );
};
