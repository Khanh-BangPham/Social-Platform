import { Card } from '@components/atoms/Card';
import { Dropdown } from '@components/atoms/Dropdown';
import { ButtonIconAddFriend } from '@components/atoms/Icon/IconAddFriend';
import { ButtonIconThreeDotAction } from '@components/atoms/Icon/IconThreeDotAction';
import { Menu } from '@components/atoms/Menu';
import { Switch } from '@components/atoms/Switch';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { UserItem } from '@components/atoms/UserItem';
import { mockUsers } from '@utils/mock';
import { useState } from 'react';

export const SuggestedForYou = () => {
  const [enabled, setEnabled] = useState(true);
  const [users] = useState(mockUsers);
  const { t } = useTranslate();
  return (
    <Card
      title={t('People nearby')}
      action={
        <Dropdown
          placement="bottomLeft"
          autoClose={false}
          content={
            <Menu
              menus={[
                {
                  label: (
                    <div
                      onClick={(ev) => {
                        ev.preventDefault();
                        setEnabled(!enabled);
                      }}
                      className="flex items-center gap-5"
                    >
                      {t('Enable/disable location sharing')}
                      <Switch checked={enabled} />
                    </div>
                  ),
                },
              ]}
            />
          }
        >
          <ButtonIconThreeDotAction transparent />
        </Dropdown>
      }
    >
      <div className="mt-4 flex flex-col gap-4">
        {enabled ? (
          users.map((u) => (
            <UserItem
              key={u.id}
              sub="3km"
              user={u}
              action={<ButtonIconAddFriend />}
            />
          ))
        ) : (
          <p className="text-sm text-center">
            {t('Please share your location to use this feature')}
          </p>
        )}
      </div>
    </Card>
  );
};
