import { Modal, Input, Form, Select, ColorPicker, Upload, message } from "antd";
import { BiPlus } from 'react-icons/bi';
import { sendRequest } from "../../utils/api";
import { useEffect, useState } from "react";
const { Option } = Select;
const { TextArea } = Input;

interface IProps {
  isOpenModalCreate: boolean;
  setIsOpenModalCreate: (value: boolean) => void;
  getDataBlog: any;
  accessToken: string;
}

const ModalCreateBlog = (props: IProps) => {

  const { isOpenModalCreate, setIsOpenModalCreate, accessToken, getDataBlog } = props;
  const [listRole, setListRole] = useState<IRole[]>()!;
  const [form] = Form.useForm();

  // Call API Data Role
  const getDataRole = async () => {
    const res = await sendRequest<IBackendRes<IRole>>({
      method: 'get',
      url: 'https://kimtuyen.blog/api/v1/roles',
    })

    if (res.data) {
      setListRole(res.data?.result);
    }
  }
  useEffect(() => {
    getDataRole();
  }, []);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


  // Submit Create Blog
  const onFinish = async (values: any) => {
    const { title, description, idRole, color } = values;
    const data = {
      title,
      description,
      idRole,
      color: color.toHexString(),
      // thumb,
    }
    // Close Modal
    setIsOpenModalCreate(false);
    // Reset Form Antd
    form.resetFields();

    // Call API post data
    const res = await sendRequest<IBackendRes<IBlog>>({
      method: 'post',
      url: 'https://kimtuyen.blog/api/v1/blog',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: data
    })

    if (res.data) {
      message.success('Create Blog success');
      getDataBlog();
    } else {
      message.error('Create Blog Failed')
    }
  };

  return (
    <Modal
      title="Create blog"
      centered
      maskClosable={false}
      open={isOpenModalCreate}
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        setIsOpenModalCreate(false)
      }}
    >

      {/* Form Create Blog */}
      <Form
        name="Create a blog"
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <TextArea />
        </Form.Item>

        {/* Role */}
        <Form.Item
          label="Role"
          name="idRole"
          rules={[{ required: true, message: 'Please input your role!' }]}
        >
          <Select
            placeholder="Select a option and change input text above"
          >
            {
              listRole?.map(role => (
                <Option key={role._id} value={role._id}>{role.nameRole}</Option>
              ))
            }
          </Select>
        </Form.Item>

        {/* Color */}
        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: 'Please input your color!' }]}
        >
          {/* <Input /> */}
          <ColorPicker showText />
        </Form.Item>

        {/* Thumb */}
        <Form.Item
          label="Thumb"
          name="thumb"
          // rules={[{ required: true, message: 'Please input your thumb!' }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          {/* <Input /> */}
          <Upload listType="picture-card" multiple={false}>
            <button style={{ border: 0, background: 'none' }} type="button">
              <BiPlus />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

      </Form>

    </Modal>
  )
}

export default ModalCreateBlog