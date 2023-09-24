import { Avatar } from '@components/atoms/Avatar';
import { Button } from '@components/atoms/Button';
import { Card } from '@components/atoms/Card';
import { Dropdown } from '@components/atoms/Dropdown';
import { IconBellOff } from '@components/atoms/Icon/IconBellOff';
import { IconCheckList } from '@components/atoms/Icon/IconChecklist';
import { IconEyeClose } from '@components/atoms/Icon/IconEyeClose';
import { IconNotification } from '@components/atoms/Icon/IconNotification';
import { ButtonIconSetting } from '@components/atoms/Icon/IconSetting';
import { ButtonIconThreeDotAction } from '@components/atoms/Icon/IconThreeDotAction';
import { IconTrash } from '@components/atoms/Icon/IconTrash';
import { InfinityLoading } from '@components/atoms/InfinityLoading';
import { Menu } from '@components/atoms/Menu';
import { Skeleton } from '@components/atoms/Skeleton';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { cn } from '@utils';
import { INotification, fakeApi, mockNotifications } from '@utils/mock';
import moment from 'moment';
import { useMemo, useState } from 'react';

interface RenderFunc {
  content(data: INotification): JSX.Element | undefined;
  action?(data: INotification): JSX.Element | undefined;
}

export const Notification = () => {
  const { t } = useTranslate();
  const [notifications, setNotifications] = useState(() =>
    mockNotifications(20),
  );
  const [loading, setLoading] = useState(false);

  const NotificationType: { [k: string]: RenderFunc } = useMemo(
    () => ({
      AddFriend: {
        content: (noti) => (
          <>
            <b>{noti.user.fullName}</b> {t('sent you a friend request')}
          </>
        ),
        action: () => (
          <div className="flex gap-2 mt-2">
            <Button type="primary" className="min-w-[100px]">
              {t('Confirm')}
            </Button>
            <Button className="min-w-[100px]">{t('Delete')}</Button>
          </div>
        ),
      },
      Tag: {
        content: (noti) => (
          <>
            <b>{noti.user.fullName}</b> {t('mentioned you in an article')}
          </>
        ),
      },
      Follow: {
        content: (noti) => (
          <>
            <b>{noti.user.fullName}</b> {t('has started following you')}
          </>
        ),
      },
      Like: {
        content: (noti) => (
          <>
            <b>{noti.user.fullName}</b> {t('liked your post')}
          </>
        ),
      },
      TagStory: {
        content: (noti) => (
          <>
            <b>{noti.user.fullName}</b> {t('mentioned you in a story')}
          </>
        ),
      },
    }),
    [],
  );

  return (
    <Card
      title={t('Notifications')}
      titleClassName="pl-2"
      action={
        <Dropdown
          placement="bottomRight"
          content={
            <Menu
              menus={[
                {
                  label: t('Mark all as read'),
                  icon: <IconCheckList />,
                },
                {
                  label: t('Settings to receive notifications'),
                  icon: <IconNotification />,
                },
                {
                  label: t('Temporarily turn off notifications'),
                  icon: <IconBellOff />,
                },
              ]}
            />
          }
        >
          <ButtonIconSetting />
        </Dropdown>
      }
      className="shadow-none dark:!bg-transparent !px-0 max-h-[calc(100vh-100px)]"
    >
      <InfinityLoading
        haveNext
        offset={300}
        loading={loading}
        loadingRender={
          <div>
            <NotificationItemLoading />
            <NotificationItemLoading />
          </div>
        }
        onNext={async () => {
          setLoading(true);
          setNotifications([
            ...notifications,
            ...(await fakeApi(mockNotifications)),
          ]);
          setLoading(false);
        }}
        className="w-[400px] overflow-auto custom-scrollbar-behavior"
      >
        <div className="mt-3 max-h-full flex-1 overflow-auto">
          {notifications.map((e) => (
            <NotificationItem
              isRead={e.isRead}
              key={e.id}
              content={NotificationType?.[e.type]?.content?.(e)}
              action={NotificationType?.[e.type].action?.(e)}
              time={moment(e.createdAt).fromNow()}
            />
          ))}
        </div>
      </InfinityLoading>
    </Card>
  );
};

const NotificationItemLoading = () => {
  return (
    <div className="pl-4 dark:text-white text-black rounded-lg flex gap-4 items-center  p-2 -ml-2">
      <Skeleton avatar width={40} />
      <div className="flex flex-col flex-1 gap-1">
        <p className="text-sm">
          <Skeleton text width="100%" />
        </p>
        <time className="text-sm text-blue-400">
          <Skeleton text width="50%" />
        </time>
      </div>
    </div>
  );
};

const NotificationItem = (props: {
  content: any;
  time: any;
  action?: any;
  isRead?: boolean;
}) => {
  const { t } = useTranslate();
  return (
    <a
      href="#"
      className="pl-4 [&:hover_.icon-action]:opacity-100 dark:text-white text-black rounded-lg flex gap-4 items-center hover:bg-black hover:bg-opacity-10 p-2 -ml-2"
    >
      <Avatar size={40} />
      <div className="flex flex-col flex-1">
        <p className="text-sm">{props.content}</p>
        <time className="text-sm text-blue-400">{props.time}</time>
        {props.action}
      </div>
      <div className="flex gap-1 items-center">
        <div className="icon-action opacity-0">
          <Dropdown
            placement="bottomRight"
            content={
              <Menu
                menus={[
                  { label: t('Mark unread'), icon: <IconEyeClose /> },
                  { label: t('Delete this notification'), icon: <IconTrash /> },
                  {
                    label: t('Hide notifications from this person'),
                    icon: <IconBellOff />,
                  },
                  {
                    label: t('Do not receive notifications from this post'),
                    icon: <IconBellOff />,
                  },
                ]}
              />
            }
          >
            <ButtonIconThreeDotAction />
          </Dropdown>
        </div>
        <span
          className={cn('rounded-full w-3 h-3 bg-blue-500', {
            'opacity-0': props.isRead,
          })}
        ></span>
      </div>
    </a>
  );
};
