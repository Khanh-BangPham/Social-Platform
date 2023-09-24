import { useAuth } from "@components/features/AuthProvider";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LOGIN_MODAL, useGLobalState } from "../../../store/queryClient";
import { Button } from "../../atoms/Button";
import { IconFacebook } from "../../atoms/Icon/IconFacebook";
import { IconInstagram } from "../../atoms/Icon/IconInstagram";
import { IconQR } from "../../atoms/Icon/IconQR";
import { IconTwitter } from "../../atoms/Icon/IconTwitter";
import { ButtonIconUser } from "../../atoms/Icon/IconUser";
import { Input } from "../../atoms/Input";
import { Modal, ModalProps } from "../../atoms/Modal";

export const ModalLogin: FC<ModalProps> = ({ ...props }) => {
  const { login } = useAuth();
  const _open = useGLobalState(LOGIN_MODAL, false);

  const [openNormalLogin, setOpenNormalLogin] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [open, setOpen] = useState<boolean | null>(null);
  return (
    <>
      <ModalLoginNormal
        open={openNormalLogin}
        onCancel={() => {
          setOpenNormalLogin(false);
          setOpen(null);
        }}
        width={450}
      />
      <ModalRegister
        open={openRegisterModal}
        onCancel={() => {
          setOpenRegisterModal(false);
          setOpen(null);
        }}
        width={450}
      />
      <Modal
        {...props}
        open={typeof open === "boolean" ? open : _open}
        title="Log in to Facinsrule"
        width={450}
      >
        <div className="flex flex-col pt-10 pb-10 px-10 gap-3">
          <a
            onClick={(ev) => {
              ev.preventDefault();
              login({ password: "asdfasdf", username: "asdfasdf" });
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
          By continuing, you agree to TikTok’s{" "}
          <a href="#" className="dark:text-white">
            Terms of Service
          </a>{" "}
          and confirm that you have read TikTok’s{" "}
          <a href="#" className="dark:text-white">
            Privacy Policy
          </a>
        </p>
        <div className="py-4 text-center px-3 text-gray-900 border-t border-solid border-gray-300 dark:text-white dark:border-slate-700">
          Don't have an account?{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              setOpenRegisterModal(true);
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
    formState: { errors, isValid },
  } = useForm<LoginInput>({ mode: "onChange" });

  const submit: SubmitHandler<LoginInput> = () => {};

  return (
    <Modal title="Use phone / email / username" {...props}>
      <form
        className="py-12 px-8 flex flex-col gap-3"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          label="Email"
          {...register("email", {
            required: "Trường này là trường bắt buộc",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Vui lòng nhập đúng Email",
            },
          })}
          error={errors?.email?.message}
        />
        <Input
          label="Mật khẩu"
          {...register("password", {
            required: "Trường này là trường bắt buộc",
          })}
          type="password"
          error={errors?.password?.message}
        />
        <Button
          disabled={!isValid}
          className="w-full mt-8"
          size="large"
          type="primary"
        >
          Đăng nhâp
        </Button>
      </form>
    </Modal>
  );
};

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

interface ModalRegisterModalProps extends ModalProps {
  onSuccess?: () => void;
}

const ModalRegister: FC<ModalRegisterModalProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterInput>({ mode: "onChange" });

  const submit: SubmitHandler<RegisterInput> = (values) => {
    console.log(values);
  };

  return (
    <Modal title="Đăng ký" {...props}>
      <form
        className="py-12 px-8 flex flex-col gap-3"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          label="Họ và tên"
          placeholder="Họ và tên"
          {...register("name", {
            required: "Trường này là trường bắt buộc",
          })}
          error={errors?.name?.message}
        />
        <Input
          label="Email"
          {...register("email", {
            required: "Trường này là trường bắt buộc",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Vui lòng nhập đúng Email",
            },
          })}
          error={errors?.email?.message}
        />
        <Input
          label="Mật khẩu"
          {...register("password", {
            required: "Trường này là trường bắt buộc",
          })}
          type="password"
          error={errors?.password?.message}
        />
        <Button
          disabled={!isValid}
          className="w-full mt-8"
          size="large"
          type="primary"
        >
          Đăng ký
        </Button>
      </form>
    </Modal>
  );
};
