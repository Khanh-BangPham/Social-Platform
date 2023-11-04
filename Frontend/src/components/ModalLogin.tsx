import { ServerEvent } from '@constants/event';
import { socket } from '@socket';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authService } from '../services/auth';
import { userService } from '../services/user';
import { USER_LOGIN, setGlobalState } from '../store/queryClient';
import { tokenStorage, userStorage } from '../utils/createStorage';
import { updateUserLocation } from '../utils/getLocation';
import { useAuth } from './AuthProvider';
import { Button } from './Button';
import { IconFacebook } from './Icon/IconFacebook';
import { IconInstagram } from './Icon/IconInstagram';
import { IconQR } from './Icon/IconQR';
import { IconTwitter } from './Icon/IconTwitter';
import { ButtonIconUser } from './Icon/IconUser';
import { Input } from './Input';
import { Modal, ModalProps } from './Modal';
import { ModalRegister } from './ModalRegister';

export const ModalLogin: FC<ModalProps> = ({ ...props }) => {
  const { login } = useAuth();
  const [openNormalLogin, setOpenNormalLogin] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  let [open, setOpen] = useState<boolean | null>(null);

  return (
    <>
      <ModalLoginNormal
        open={openNormalLogin}
        onCancel={() => {
          setOpenNormalLogin(false);
          setOpen(null);
        }}
        width={450}
        onSuccess={() => {
          updateUserLocation();
          setOpenNormalLogin(false);
          setOpen(null);
          props.onCancel?.();
        }}
      />
      <ModalRegister
        open={openRegisterModal}
        onCancel={() => {
          setOpenRegisterModal(false);
          setOpen(null);
        }}
        width={450}
        onSuccess={() => {
          setOpenRegisterModal(false);
          setOpenNormalLogin(true);
        }}
      />
      <Modal
        {...props}
        open={typeof open === 'boolean' ? open : props.open}
        title="Log in to B"
        width={450}
      >
        <div className="flex flex-col pt-10 pb-10 px-10 gap-3">
          <a
            onClick={(ev) => {
              ev.preventDefault();
              login({ password: 'asdfasdf', username: 'asdfasdf' });
              props.onCancel?.();
            }}
            href="#"
            className="relative p-2.5 hover:bg-gray-100 border dark:hover:bg-slate-800 dark:border-slate-700 border-solid rounded text-center text-gray-900 dark:text-white font-bold flex items-center justify-center"
          >
            <IconQR
              transparent
              className="text-gray-900 dark:text-white absolute left-1"
            />
            Use QR Code
          </a>
          <a
            href="#"
            className="relative p-2.5 hover:bg-gray-100 border dark:hover:bg-slate-800 dark:border-slate-700 border-solid rounded text-center text-gray-900 dark:text-white font-bold flex items-center justify-center"
            onClick={(ev) => {
              ev.preventDefault();
              setOpenNormalLogin(true);
              setOpen(false);
            }}
          >
            <ButtonIconUser
              transparent
              className="text-gray-900 dark:text-white absolute left-1"
            />
            Use phone / email / username
          </a>
          <a
            href="#"
            className="relative p-2.5 hover:bg-gray-100 border dark:hover:bg-slate-800 dark:border-slate-700 border-solid rounded text-center text-gray-900 dark:text-white font-bold flex items-center justify-center"
          >
            <IconFacebook
              transparent
              className="text-gray-900 dark:text-white absolute left-1"
            />
            Continue with Facebook
          </a>
          <a
            href="#"
            className="relative p-2.5 hover:bg-gray-100 border dark:hover:bg-slate-800 dark:border-slate-700 border-solid rounded text-center text-gray-900 dark:text-white font-bold flex items-center justify-center"
          >
            <IconInstagram
              transparent
              className="text-gray-900 dark:text-white absolute left-1"
            />
            Continue with Instagram
          </a>
          <a
            href="#"
            className="relative p-2.5 hover:bg-gray-100 border dark:hover:bg-slate-800 dark:border-slate-700 border-solid rounded text-center text-gray-900 dark:text-white font-bold flex items-center justify-center"
          >
            <IconTwitter
              transparent
              className="text-gray-900 dark:text-white absolute left-1"
            />
            Continue with Twitter
          </a>
          {/* <a
          href="#"
          className="relative p-2.5 hover:bg-gray-100 border dark:hover:bg-slate-800 dark:border-slate-700 border-solid rounded text-center text-gray-900 dark:text-white font-bold flex items-center justify-center"
        >
          <IconQR transparent className="text-gray-900 dark:text-white absolute left-1" />
          Continue with LINE
        </a>
        <a
          href="#"
          className="relative p-2.5 hover:bg-gray-100 border dark:hover:bg-slate-800 dark:border-slate-700 border-solid rounded text-center text-gray-900 dark:text-white font-bold flex items-center justify-center"
        >
          <IconQR transparent className="text-gray-900 dark:text-white absolute left-1" />
          Continue with KakaoTalk
        </a>
        <a
          href="#"
          className="relative p-2.5 hover:bg-gray-100 border dark:hover:bg-slate-800 dark:border-slate-700 border-solid rounded text-center text-gray-900 dark:text-white font-bold flex items-center justify-center"
        >
          <IconQR transparent className="text-gray-900 dark:text-white absolute left-1" />
          Continue with Apple
        </a>
        <a
          href="#"
          className="relative p-2.5 hover:bg-gray-100 border dark:hover:bg-slate-800 dark:border-slate-700 border-solid rounded text-center text-gray-900 dark:text-white font-bold flex items-center justify-center"
        >
          <IconQR transparent className="text-gray-900 dark:text-white absolute left-1" />
          Continue with KakaoTalk
        </a> */}
        </div>
        <p className="px-10 pb-5 text-gray-400 text-xs text-center hover:[&_a]:underline [&_a]:text-gray-800">
          By continuing, you agree to B's{' '}
          <a href="#" className="dark:text-white">
            Terms of Service
          </a>{' '}
          and confirm that you have read B's{' '}
          <a href="#" className="dark:text-white">
            Privacy Policy
          </a>
        </p>
        <div className="py-4 text-center px-3 text-gray-900 border-t border-solid border-gray-300 dark:text-white dark:border-slate-700">
          Don't have an account?{' '}
          <a
            onClick={(e) => {
              e.preventDefault();
              setOpenRegisterModal(true);
              setOpen(false);
            }}
            href="#"
            className="font-bold hover:underline text-red-500"
          >
            Sign up
          </a>
        </div>
      </Modal>
    </>
  );
};

export interface LoginInput {
  email: string;
  password: string;
}

interface ModalLoginModalProps extends ModalProps {
  onSuccess?: () => void;
}

const ModalLoginNormal: FC<ModalLoginModalProps> = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<LoginInput>({ mode: 'onChange' });
  const { mutate, isLoading } = useMutation({
    mutationFn: authService.login,
    onError: (err: ApiErrorResponse) => {
      message.error(err.message);
    },
    onSuccess: async (data) => {
      tokenStorage.set(data);
      const user = await userService.getUser();
      setGlobalState(USER_LOGIN, user);
      socket.emit(ServerEvent.Login, user._id);
      userStorage.set(user);
      props?.onSuccess?.();
    },
  });

  const submit: SubmitHandler<LoginInput> = (values) => {
    mutate(values);
  };

  return (
    <Modal title="Use phone / email / username" {...props}>
      <form
        className="py-12 px-8 flex flex-col gap-3"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          label="Email"
          {...register('email', {
            required: 'Trường này là trường bắt buộc',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Vui lòng nhập đúng Email',
            },
          })}
          error={errors?.email?.message}
        />
        <Input
          label="Mật khẩu"
          {...register('password', {
            required: 'Trường này là trường bắt buộc',
          })}
          type="password"
          error={errors?.password?.message}
        />
        <Button
          disabled={!isValid}
          className="w-full mt-8"
          size="large"
          type="primary"
          loading={isLoading}
        >
          Đăng nhâp
        </Button>
      </form>
    </Modal>
  );
};
