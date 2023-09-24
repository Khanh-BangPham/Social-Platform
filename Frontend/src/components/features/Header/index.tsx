import { ButtonIconArrowDown } from '@components/atoms/Icon/IconArrow';
import { ButtonIconNotification } from '@components/atoms/Icon/IconNotification';
import { ButtonIconPalette } from '@components/atoms/Icon/IconPalette';
import { IconPlus } from '@components/atoms/Icon/IconPlus';
import { IconSearch } from '@components/atoms/Icon/IconSearch';
import { Menu } from '@components/atoms/Menu';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { useAuth } from '@components/features/AuthProvider';
import { useMode } from '@components/features/DarkModeProvider';
import { GeneralInfo } from '@components/features/GeneralInfo';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import { LOGIN_MODAL, setGlobalState } from '../../../store/queryClient';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import { Card } from '../../atoms/Card';
import { Dropdown } from '../../atoms/Dropdown';
import { Icon } from '../../atoms/Icon/Icon';
import { IconClose } from '../../atoms/Icon/IconClose';
import { ButtonIconFeedback } from '../../atoms/Icon/IconFeedback';
import { ButtonIconSetting } from '../../atoms/Icon/IconSetting';
import { ButtonIconThreeDotAction } from '../../atoms/Icon/IconThreeDotAction';
import { Switch } from '../../atoms/Switch';
import { Notification } from '../Notification';
import { ModalCreateNewOrganization } from '../Organization/ModalCreateNewOrganization';
import { ModalLogin } from './ModalLogin';
import { PersonalMenu } from './PersonalMenu';

const mapColor: any = {
  blue: {
    DEFAULT: '#2374e1',
    50: '#f4fafc',
    100: '#cae7f4',
    200: '#a0d5ec',
    300: '#77c3e4',
    400: '#4db1dc',
    500: '#2374e1',
    600: '#1c7fa9',
    700: '#155f7f',
    800: '#0e3f54',
    900: '#071f2a',
    neon: '#00ffe7',
  },
  red: {
    DEFAULT: '#ff0000',
    50: '#fff2f2',
    100: '#ffc1c1',
    200: '#ff9191',
    300: '#ff6060',
    400: '#ff3030',
    500: '#ff0000',
    600: '#c00',
    700: '#900',
    800: '#600',
    900: '#320000',
    neon: '#ff9191',
  },
  orange: {
    DEFAULT: '#ff8000',
    50: '#fff8f2',
    100: '#ffe0c1',
    200: '#ffc891',
    300: '#ffb060',
    400: '#ff9830',
    500: '#ff8000',
    600: '#c60',
    700: '#994c00',
    800: '#630',
    900: '#321900',
    neon: '#ffc891',
  },
  purple: {
    DEFAULT: '#7f00ff',
    50: '#f8f2ff',
    100: '#e0c1ff',
    200: '#c791ff',
    300: '#af60ff',
    400: '#9730ff',
    500: '#7f00ff',
    600: '#6500cc',
    700: '#4c0099',
    800: '#320066',
    900: '#190032',
    neon: '#c791ff',
  },
  green: {
    DEFAULT: '#00ff00',
    50: '#f2fff2',
    100: '#c1ffc1',
    200: '#91ff91',
    300: '#60ff60',
    400: '#30ff30',
    500: '#00ff00',
    600: '#0c0',
    700: '#090',
    800: '#060',
    900: '#003200',
    neon: '#91ff91',
  },
};

const changeTheme = (color: any) => {
  let colors = mapColor[color];

  let root: any = document.querySelector(':root');
  if (root) {
    // let r = getComputedStyle(root);
    if (colors) {
      for (let i in colors) {
        if (i === 'DEFAULT') {
          root.style.setProperty('--primary-color', colors[i]);
        } else {
          root.style.setProperty(`--primary-color-${i}`, colors[i]);
        }
      }
    }
  }
};

export const Header = () => {
  const { t } = useTranslate();
  const { mode, toggleMode } = useMode();
  const [openLogin] = useState(false);
  const { user } = useAuth();
  const [org, setOrg] = useState({
    logo: 'https://spacedev.vn/images/LOGO-image-full.svg',
    name: 'Fucinsrule',
    description: 'Platform mạng xã hội doanh nghiệp và cá nhân',
  });
  const [openCreateNewOrganization, setOpenCreateNewOrganization] =
    useState(false);

  return (
    <>
      <ModalLogin
        open={openLogin}
        onCancel={() => setGlobalState(LOGIN_MODAL, false)}
      />
      <ModalCreateNewOrganization
        open={openCreateNewOrganization}
        onCancel={() => setOpenCreateNewOrganization(false)}
      />
      <header className="shadow dark:bg-slate-900 bg-white h-header px-4 flex sticky top-0 z-10 border-b border-base">
        <div className="flex items-center gap-4 w-full">
          <div className="w-sidebar text-left">
            <Link
              to={PATH.Home}
              className="dark:text-white text-slate-800 text-2xl flex items-center gap-1"
            >
              <img src={org.logo} className="w-[25px]" />
              <span className="font-bold">{org.name}</span>
              <Dropdown
                popupClassName="-translate-x-4"
                getPopupContainer={(node) => node.parentNode as HTMLDivElement}
                autoClose
                content={
                  <Menu
                    menus={[
                      {
                        className: '',
                        label: (
                          <div className="flex items-center gap-3">
                            <img
                              src="https://spacedev.vn/images/LOGO-image-full.svg"
                              className="w-[25px]"
                            />
                            <div className="flex flex-col gap-1 flex-1">
                              <span className="font-bold">Spacedev</span>
                              <span className="text-xs !text-opacity-70 text-black dark:text-white">
                                Nền tảng học lập trình online
                              </span>
                            </div>
                            <div className="bg-red-600 text-white font-bold rounded-full w-5 h-5 text-xs flex items-center justify-center">
                              10
                            </div>
                          </div>
                        ),
                        onClick: () =>
                          setOrg({
                            logo: 'https://spacedev.vn/images/LOGO-image-full.svg',
                            name: 'Spacedev',
                            description: 'Nền tảng học lập trình online',
                          }),
                      },
                      {
                        className: '',
                        label: (
                          <div className="flex items-center gap-3">
                            <img
                              src="https://spacedev.vn/images/LOGO-image-full.svg"
                              className="w-[25px]"
                            />
                            <div className="flex flex-col gap-1">
                              <span className="font-bold">Fucinsrule</span>
                              <span className="text-xs !text-opacity-70 text-black dark:text-white">
                                Platform mạng xã hội doanh nghiệp và cá nhân
                              </span>
                            </div>
                          </div>
                        ),

                        onClick: () =>
                          setOrg({
                            logo: 'https://spacedev.vn/images/LOGO-image-full.svg',
                            name: 'Fucinsrule',
                            description:
                              'Platform mạng xã hội doanh nghiệp và cá nhân',
                          }),
                      },
                      {
                        className: '',
                        label: (
                          <div className="flex items-center gap-3">
                            <img
                              className="w-[25px]"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
                            />
                            <div className="flex flex-col gap-1">
                              <span className="font-bold">CMS Bingong</span>
                              <span className="text-xs !text-opacity-70 text-black dark:text-white">
                                Nền tảng quản lý nội dung chuyên nghiệp{' '}
                              </span>
                            </div>
                          </div>
                        ),
                        onClick: () =>
                          setOrg({
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
                            name: 'CMS Bingong',
                            description:
                              'Nền tảng quản lý nội dung chuyên nghiệp',
                          }),
                      },
                      {
                        className: '!p-0 w-full !bg-transparent',
                        label: (
                          <>
                            <Button
                              iconPrefix={<IconPlus />}
                              type="primary"
                              className="w-[320px] mt-2"
                              onClick={() => setOpenCreateNewOrganization(true)}
                            >
                              {t('Create new organization')}
                            </Button>
                          </>
                        ),
                      },
                    ]}
                  />
                }
              >
                <ButtonIconArrowDown transparent />
              </Dropdown>
            </Link>
          </div>
          <Dropdown
            className="flex-1 relative max-w-main-content mx-auto"
            allowToggle={false}
            arrow={false}
            content={
              <Card
                title="Recent searches"
                className="dark:!bg-slate-800"
                action={
                  <a
                    href="#"
                    className="dark:hover:bg-slate-700 text-blue-500 hover:bg-gray-100 rounded px-3 py-0.5"
                  >
                    {t('See all')}
                  </a>
                }
              >
                <div className="mt-3">
                  <div className="flex gap-3 items-center hover:bg-black hover:bg-opacity-20 p-2 -ml-2 rounded cursor-pointer">
                    <Avatar />
                    <p className="font-semibold flex-1">Loretta Copeland</p>
                    <IconClose size={17} transparent />
                  </div>
                  <div className="flex gap-3 items-center hover:bg-black hover:bg-opacity-20 p-2 -ml-2 rounded cursor-pointer">
                    <Avatar />
                    <p className="font-semibold flex-1">Gussie Mack</p>
                    <IconClose size={17} transparent />
                  </div>
                  <div className="flex gap-3 items-center hover:bg-black hover:bg-opacity-20 p-2 -ml-2 rounded cursor-pointer">
                    <Avatar />
                    <p className="font-semibold flex-1">Bernice Underwood</p>
                    <IconClose size={17} transparent />
                  </div>
                  <div className="flex gap-3 items-center hover:bg-black hover:bg-opacity-20 p-2 -ml-2 rounded cursor-pointer">
                    <Avatar />
                    <p className="font-semibold flex-1">Maggie Jenkins</p>
                    <IconClose size={17} transparent />
                  </div>
                  <div className="flex gap-3 items-center hover:bg-black hover:bg-opacity-20 p-2 -ml-2 rounded cursor-pointer">
                    <Avatar />
                    <p className="font-semibold flex-1">Flora Larson</p>
                    <IconClose size={17} transparent />
                  </div>
                  <div className="flex gap-3 items-center hover:bg-black hover:bg-opacity-20 p-2 -ml-2 rounded cursor-pointer">
                    <Avatar />
                    <p className="font-semibold flex-1">Agnes Chambers</p>
                    <IconClose size={17} transparent />
                  </div>
                </div>
              </Card>
            }
            popupClassName="max-w-full w-full !left-0"
            getPopupContainer={(parentNode) => parentNode}
          >
            <div className="dark:bg-slate-800 flex flex-1 bg-gray-100 rounded-full items-center gap-2 px-2 text-gray-600 h-7">
              <IconSearch />

              <input
                onClick={() => {}}
                placeholder={t('Search for everything....')}
                className="placeholder:text-sm outline-none bg-transparent flex-1 text-black dark:text-white"
              />
            </div>
          </Dropdown>
          <div className="flex gap-3 w-sidebar justify-end h-full items-center [&>*]:h-full">
            {user ? (
              <>
                <div className="flex items-center">
                  <Dropdown
                    placement="bottomRight"
                    content={
                      <div className="flex flex-wrap w-[200px] gap-2">
                        <div
                          onClick={() => changeTheme('blue')}
                          className="bg-blue-600 w-8 h-8 cursor-pointer"
                        ></div>
                        <div
                          onClick={() => changeTheme('red')}
                          className="bg-red-600 w-8 h-8 cursor-pointer"
                        ></div>
                        <div
                          onClick={() => changeTheme('orange')}
                          className="bg-orange-600 w-8 h-8 cursor-pointer"
                        ></div>

                        <div
                          onClick={() => changeTheme('purple')}
                          className="bg-purple-600 w-8 h-8 cursor-pointer"
                        ></div>
                        <div
                          onClick={() => changeTheme('green')}
                          className="bg-green-500 w-8 h-8 cursor-pointer"
                        ></div>
                      </div>
                    }
                  >
                    <ButtonIconPalette />
                  </Dropdown>
                </div>
                <div className="flex items-center">
                  <Dropdown
                    getPopupContainer={(parentNode) => parentNode}
                    content={<Notification />}
                    arrow={false}
                    placement="bottomRight"
                  >
                    <Badge count={10}>
                      <ButtonIconNotification />
                    </Badge>
                  </Dropdown>
                </div>
                <Dropdown
                  getPopupContainer={(parentNode) => parentNode}
                  placement="bottomRight"
                  content={<PersonalMenu />}
                >
                  <div className="active:scale-95 relative flex items-center">
                    <Avatar />
                    <ButtonIconArrowDown
                      size={10}
                      className="absolute !p-1 right-0 -bottom-1 !pointer-events-auto bg-gray-300 dark:!bg-slate-600"
                    />
                  </div>
                </Dropdown>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  type="red"
                  onClick={() => setGlobalState(LOGIN_MODAL, true)}
                >
                  {t('Signin')}
                </Button>
                <Dropdown
                  getPopupContainer={(parentNode) => parentNode}
                  placement="bottomRight"
                  content={
                    <div className="w-[300px]">
                      <div className="mt-3">
                        <a
                          onClick={(ev) => {
                            ev.preventDefault();
                            toggleMode();
                          }}
                          href="#"
                          className="px-2 py-2 rounded hover:bg-black font-semibold hover:bg-opacity-20 flex gap-3 items-center text-gray-900 dark:text-white"
                        >
                          <Icon className="dark:bg-slate-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-moon"
                              width={17}
                              height={17}
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                            </svg>
                          </Icon>
                          <p className="flex-1">{t('Dark mode')}</p>
                          <Switch checked={mode === 'dark'} />
                        </a>

                        <a
                          href=""
                          className=" px-2 py-2 rounded hover:bg-black font-semibold hover:bg-opacity-20 flex gap-3 items-center text-gray-900 dark:text-white"
                        >
                          <ButtonIconFeedback />
                          <p>{t('Leave feedback')}</p>
                        </a>
                        <a
                          href=""
                          className=" px-2 py-2 rounded hover:bg-black font-semibold hover:bg-opacity-20 flex gap-3 items-center text-gray-900 dark:text-white"
                        >
                          <ButtonIconSetting />
                          <p>{t('Setting')}</p>
                        </a>
                        <GeneralInfo />
                      </div>
                    </div>
                  }
                >
                  <div className="relative flex items-center">
                    <ButtonIconThreeDotAction />
                  </div>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
