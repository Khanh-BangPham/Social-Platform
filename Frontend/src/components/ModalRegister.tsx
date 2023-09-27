import { FC, useState } from "react";
import { Modal, ModalProps } from "./Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  RegisterInput,
  VerifyRegisterInput,
  userService,
} from "../services/user";
import { message } from "antd";
import { Input } from "./Input";
import { Button } from "./Button";

interface ModalRegisterProps extends ModalProps {
  onSuccess?: () => void;
}

export const ModalRegister: FC<ModalRegisterProps> = (props) => {
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [open, setOpen] = useState<false | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegisterInput>({ mode: "onChange" });
  const { mutate, isLoading } = useMutation({
    mutationFn: userService.register,
    onError: (err: ApiErrorResponse) => {
      message.error(err.message);
    },
    onSuccess: async (data) => {
      setOpen(false);
      setOpenVerifyModal(true);
      // props?.onSuccess?.();
    },
  });

  const submit: SubmitHandler<RegisterInput> = (values) => {
    mutate(values);
  };

  return (
    <>
      <ModalConfirmRegister
        open={openVerifyModal}
        onCancel={() => {
          setOpenVerifyModal(false);
          setOpen(null);
        }}
        width={450}
        email={getValues("email")}
        onSuccess={() => {
          setOpenVerifyModal(false);
          props.onSuccess?.();
        }}
      />
      <Modal
        title="Đăng ký"
        {...props}
        open={typeof open === "boolean" ? open : props.open}
      >
        <form
          className="py-12 px-8 flex flex-col gap-3"
          onSubmit={handleSubmit(submit)}
        >
          <Input
            label="Name"
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
            loading={isLoading}
          >
            Đăng ký
          </Button>
        </form>
      </Modal>
    </>
  );
};

interface ModalVerifyProps extends ModalProps {
  onSuccess?: () => void;
  email: string;
}

const ModalConfirmRegister: FC<ModalVerifyProps> = ({ email, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VerifyRegisterInput>({ mode: "onChange" });
  const { mutate, isLoading } = useMutation({
    mutationFn: userService.verify,
    onError: (err: ApiErrorResponse) => {
      message.error(err.message);
    },
    onSuccess: async (data) => {
      props?.onSuccess?.();
    },
  });

  const submit: SubmitHandler<VerifyRegisterInput> = (values) => {
    mutate({
      ...values,
      email,
    });
  };

  return (
    <Modal title="Kích hoạt tài khoản" {...props}>
      <form
        className="py-12 px-8 flex flex-col gap-3"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          label="Code"
          {...register("code", {
            required: "Trường này là trường bắt buộc",
          })}
          error={errors?.code?.message}
        />
        <Button
          disabled={!isValid}
          className="w-full mt-8"
          size="large"
          type="primary"
          loading={isLoading}
        >
          Kích hoạt
        </Button>
      </form>
    </Modal>
  );
};
