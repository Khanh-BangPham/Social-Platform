import { Dropdown } from '@components/atoms/Dropdown';
import { IconLogout } from '@components/atoms/Icon/IconLogout';
import { IconMessage } from '@components/atoms/Icon/IconMessage';
import { ButtonIconThreeDotAction } from '@components/atoms/Icon/IconThreeDotAction';
import { IconUser } from '@components/atoms/Icon/IconUser';
import { Menu } from '@components/atoms/Menu';
import { Modal, ModalProps } from '@components/atoms/Modal';
import { Tab } from '@components/atoms/Tab';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { UserItem } from '@components/atoms/UserItem';
import { mockUsers } from '@utils/mock';
import { useState } from 'react';

export type ModalGroupChatProps = ModalProps;

export const ModalGroupChat: Atom<ModalGroupChatProps> = ({ ...props }) => {
  const [users] = useState(mockUsers);
  const { t } = useTranslate();
  return (
    <Modal
      {...props}
      overlayCloseable
      width={400}
      height={400}
      title={t('Group member')}
    >
      <Tab
        className="pt-3 justify-around border-b dark:border-slate-700"
        itemClass="pb-3 flex-1"
        items={[
          {
            label: t('Member'),
            children: (
              <div className="flex flex-col gap-4 px-4 py-5 max-h-[400px] overflow-auto">
                {users.map((u) => (
                  <UserItem
                    user={u}
                    key={u.id}
                    action={
                      <>
                        <Dropdown
                          placement="bottomRight"
                          content={
                            <Menu
                              menus={[
                                {
                                  label: 'Xem trang cá nhân',
                                  icon: <IconUser />,
                                },
                                {
                                  label: 'Nhắn tin',
                                  icon: <IconMessage />,
                                },
                                {
                                  label: 'Mời khỏi nhóm',
                                  icon: <IconLogout />,
                                },
                              ]}
                            />
                          }
                        >
                          <ButtonIconThreeDotAction transparent />
                        </Dropdown>
                      </>
                    }
                  />
                ))}
              </div>
            ),
          },
          { label: 'Board of Management' },
        ]}
      />
    </Modal>
  );
};
