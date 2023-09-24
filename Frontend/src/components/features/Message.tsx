import { Avatar } from '@components/atoms/Avatar';
import { Badge } from '@components/atoms/Badge';
import { Card } from '@components/atoms/Card';
import { Dropdown } from '@components/atoms/Dropdown';
import { IconLockPause } from '@components/atoms/Icon/IconLockPause';
import { IconMessage } from '@components/atoms/Icon/IconMessage';
import { IconMessageChatbot } from '@components/atoms/Icon/IconMessageChatbot';
import { IconSearch } from '@components/atoms/Icon/IconSearch';
import { ButtonIconThreeDotAction } from '@components/atoms/Icon/IconThreeDotAction';
import { IconVolume } from '@components/atoms/Icon/IconVolume';
import { InfinityLoading } from '@components/atoms/InfinityLoading';
import { Menu } from '@components/atoms/Menu';
import { Switch } from '@components/atoms/Switch';
import { Tab } from '@components/atoms/Tab';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { fakeApi, mockUsers } from '@utils/mock';
import { useState } from 'react';

export const Message = () => {
  const [users, setUsers] = useState(() => mockUsers(20));
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  return (
    <Card
      title={t('Message')}
      action={
        <Dropdown
          placement="bottomRight"
          closeWhenScroll
          content={
            <Menu
              menus={[
                {
                  label: t('Sound when someone texts'),
                  icon: <IconVolume off />,
                  suffix: <Switch />,
                },
                {
                  label: t('Automatically open'),
                  description: t('When there is a new message'),
                  icon: <IconMessageChatbot />,
                  suffix: <Switch />,
                },
                { line: true },
                {
                  label: t('Active status'),
                  suffix: <Switch checked />,
                  icon: (
                    <span className="relative flex h-3 w-3 mt-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  ),
                },
                {
                  label: t('Put in waiting message'),
                  description: t('Only for strangers'),
                  icon: <IconLockPause />,
                  suffix: <Switch checked />,
                },
                { label: t('Manage block lists'), icon: <IconMessage off /> },
              ]}
            />
          }
        >
          <ButtonIconThreeDotAction transparent />
        </Dropdown>
      }
      className="h-[calc(100vh-130px)] flex flex-col"
    >
      <div className="flex flex-col flex-1 h-1">
        <div className="dark:bg-slate-800 flex mt-4 bg-gray-100 rounded-full items-center gap-2 px-2 text-gray-600 min-h-7 h-7">
          <IconSearch />

          <input
            placeholder={t('Search messages...')}
            className="text-xs flex-1 placeholder:text-xs outline-none bg-transparent"
          />
        </div>
        <div className="flex-1 flex flex-col h-1">
          <Tab
            className="mt-3 gap-3 [&>a:last-child]:ml-auto"
            itemClass="whitespace-nowrap"
            items={[
              {
                label: t('Private'),
                children: (
                  <InfinityLoading
                    loading={loading}
                    className="mt-4 flex flex-col gap-4 overflow-auto pt-2 flex-1 h-1 custom-scrollbar-behavior"
                    haveNext={true}
                    offset={200}
                    onNext={async () => {
                      setLoading(true);
                      const res = await fakeApi(mockUsers);
                      setUsers([...users, ...res]);
                      setLoading(false);
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      {users.map((user, i) => (
                        <div
                          key={i}
                          className="flex gap-2 items-center px-[1px]"
                        >
                          <Badge count={user.messageCount}>
                            <Avatar
                              showStatus
                              size={36}
                              src={user.avatar}
                              online={user.online}
                              border={user.story ? {} : undefined}
                            />
                          </Badge>
                          <div className="flex-1 ">
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                              {user.fullName}
                            </h4>
                            <p className="text-xs text-gray-500">
                              Active 30m ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </InfinityLoading>
                ),
              },
              { label: t('Group'), children: 'Nhóm' },
              {
                label: (
                  <div className="ml-auto">
                    <span className="dark:text-primary-400 text-primary-800 text-xs font-semibold">
                      {t('Request')} (2)
                    </span>
                  </div>
                ),
                children: 'Request',
              },
            ]}
          />
          {/* <div className="flex justify-between items-baseline"></div> */}
        </div>
      </div>
    </Card>
  );
};
