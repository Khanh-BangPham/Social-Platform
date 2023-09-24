import { Avatar } from '@components/atoms/Avatar';
import { Button } from '@components/atoms/Button';
import { Dropdown } from '@components/atoms/Dropdown';
import { IconAddFriend } from '@components/atoms/Icon/IconAddFriend';
import { IconExclamation } from '@components/atoms/Icon/IconExclamation';
import { IconForward } from '@components/atoms/Icon/IconForward';
import { IconMessage } from '@components/atoms/Icon/IconMessage';
import { ButtonIconThreeDotAction } from '@components/atoms/Icon/IconThreeDotAction';
import { IconTie } from '@components/atoms/Icon/IconTie';
import { IconUser } from '@components/atoms/Icon/IconUser';
import { IconUserGroup } from '@components/atoms/Icon/IconUserGroup';
import { IconPhoneCall } from '@components/atoms/Icon/iconPhoneCall';
import { Menu } from '@components/atoms/Menu';
import { Tag } from '@components/atoms/Tag';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { IUser } from '@utils/mock';
import { Link } from 'react-router-dom';

export interface PopoverUserProp {
  user: IUser;
  children?: any;
}

export const PopoverUser: Atom<PopoverUserProp> = ({ children, user }) => {
  const { t } = useTranslate();
  return (
    <Dropdown
      delay={300}
      placement="bottomLeft"
      trigger={['click', 'contextmenu']}
      content={
        <div className="w-[500px] pb-3">
          <div className="h-[100px] rounded-lg overflow-hidden border border-base">
            <img src={user.cover} className="object-cover w-full h-full" />
          </div>
          <div className="-mt-10 flex gap-2 pr-2">
            <div className="rounded-full border-[5px] border-white dark:border-slate-800 border-solid  ">
              <Avatar
                className="w-[150px]"
                size={150}
                src={user.avatar}
                online
              />
            </div>
            <div className="flex gap-0.5 flex-col mt-10 flex-1 text-black dark:text-white">
              <Link
                to="#"
                className="text-md font-bold dark:text-white text-black"
              >
                {user.fullName}
              </Link>
              <div className="dark:text-white text-black !text-opacity-75 flex flex-col gap-1 mt-1">
                <p className="flex gap-1 items-center text-sm">
                  <IconTie /> {user.jobTitle}
                </p>
                <p className="flex gap-1 items-center text-sm">
                  <IconPhoneCall /> <span>0949816596</span>
                </p>
              </div>
              <p className="text-sm mt-2 dark:text-white text-black !text-opacity-90">
                {user.bio}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 px-2">
            <Button
              iconPrefix={<IconAddFriend />}
              type="primary"
              className="flex-1"
            >
              {t('Add friend')}
            </Button>
            <Button iconPrefix={<IconMessage />} className="flex-1">
              {t('Send Message')}
            </Button>
            <Dropdown
              content={
                <Menu
                  menus={[
                    {
                      label: t('Go to personal page'),
                      icon: <IconForward />,
                    },
                    {
                      label: t('Invite to the group'),
                      icon: <IconUserGroup />,
                    },
                    {
                      label: t('Block this user'),
                      icon: <IconUser off />,
                    },
                    {
                      label: t('Report this user'),
                      icon: <IconExclamation />,
                    },
                  ]}
                />
              }
            >
              <ButtonIconThreeDotAction />
            </Dropdown>
          </div>
          <div className="text-sm mt-4 flex flex-col gap-2  px-2">
            <div className="">
              <div>
                <b>{t('Participating groups')}</b>
              </div>
              <div className="flex gap-1 mt-3">
                <Tag className="dark:!bg-slate-700 leading-8">
                  Nhóm Spacedev khóa 1
                </Tag>
                <Tag className="dark:!bg-slate-700 leading-8">Học Python</Tag>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </Dropdown>
  );
};
