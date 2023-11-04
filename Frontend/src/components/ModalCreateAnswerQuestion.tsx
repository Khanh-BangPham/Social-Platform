import { useMutation } from "@tanstack/react-query";
import { fileService } from "../services/file";
import { postService } from "../services/post";
import { Avatar } from "./Avatar";
import { Dropdown } from "./Dropdown";
import { IconArrow } from "./Icon/IconArrow";
import { ButtonIconImage } from "./Icon/IconImage";
import { Modal, ModalProps } from "./Modal";
import { FC, useEffect, useRef, useState } from "react";
import { SELECT_TEMPLATE, SELECT_USER, USER_LOGIN, setGlobalState, useGlobalState } from "../store/queryClient";
import { ButtonIconUser } from "./Icon/IconUser";
import { ModalSelectUser } from "./ModalSelectUser";
import { Space, Tag } from "antd";
import { Form, Input, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button} from 'antd';

const { Option } = Select;


export interface ModalCreateAnswerQuestionProps extends ModalProps {
  edit?: boolean;
  post?: Post;
  onSuccess?: (interviewTemplate: InterviewTemplate) => void;

  onCreateSuccess?: (user: User) => void;
  onEditSuccess?: () => void;
}

export const ModalCreateAnswerQuestion: FC<ModalCreateAnswerQuestionProps> = (props) => {
  let { edit, post } = props;

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState(post?.image || "");
  const [file, setFile] = useState<File>();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const user = useGlobalState(USER_LOGIN);
  const selected = useGlobalState(SELECT_USER);
  const [value, setValue] = useState(post?.content || "");
  const selected_user = useGlobalState(SELECT_USER);
  const selected_template = useGlobalState(SELECT_TEMPLATE);
  useEffect(() => {
    if (props.open) {
      inputRef.current?.focus();
    }
  }, [props.open]);
  const [open, setOpen] = useState(false);
  const { mutate } = useMutation({
    mutationFn: async () => {

    },
  });
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <>
      <Modal {...props} title={"Tạo câu hỏi và câu trả lời phỏng vấn"}>
        <div className="p-3">

          <div className="flex border rounded-lg p-2 items-center mt-2">
            <Form
              form={form}
              name="control-hooks"
              style={{ width: "100%" }}
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item name="content" label="Nội dung câu hỏi" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Câu hỏi tương tự">
              <Form.List
                name="similar_answer"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error('At least 2 passengers'));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        // label={'Câu hỏi tương tự'}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input passenger's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="passenger name" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              </Form.Item>
              <Form.Item label="Câu trả lời mẫu" rules={[{ required: true }]}>
              <Form.List
                name="simple_answer"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error('At least 2 passengers'));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        // label={'Từ khóa'}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input passenger's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="passenger name" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              </Form.Item>
              <Form.Item label="Từ khóa" rules={[{ required: true }]}>
              <Form.List
                name="keyword"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error('At least 2 passengers'));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        // label={'Từ khóa'}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input passenger's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="passenger name" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              </Form.Item>
              <Form.Item name="format" label="Kiểu câu hỏi" rules={[{ required: true }]}>
                <Select
                  placeholder="Select a option and change input text above"

                  allowClear
                >
                  <Option value='multiple-choice'>Trắc nghiệm</Option>
                  <Option value="essay">Tự luận</Option>
                  <Option value="orally">Giao tiếp</Option>
                  <Option value="files">files</Option>
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
              >
                {({ getFieldValue }) =>
                  getFieldValue('gender') === 'other' ? (
                    <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" >
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* <div className="mt-4">
            <Button
              onClick={() => mutate()}
              className="w-full"
              disabled={!(selected)}
              type={selected ? "primary" : "default"}
            >
              {edit ? "Chỉnh sửa" : "Tạo câu hỏi"}
            </Button> */}
        </div>
      </Modal>
    </>

  );
};
