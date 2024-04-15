import { useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { sendRequest } from "../../utils/api";
const { Option } = Select;

interface IProps {
  isOpenModalUpdate: boolean;
  getDataBlog: any;
  setIsOpenModalUpdate: (value: boolean) => void;
  dataUpdate: null | IBlog
}

const ModalUpdateBlog = (props: IProps) => {

  const { isOpenModalUpdate, setIsOpenModalUpdate, dataUpdate } = props;
  const [listRole, setListRole] = useState<IRole[]>()!;
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        title: dataUpdate.title,
        descriptions: dataUpdate.description,
        idRole: dataUpdate.idRole,
        color: dataUpdate.color,
        thumb: dataUpdate.thumb,
      });
    }
  }, [dataUpdate])

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
  }, [])

  // Submit Update Blog
  const onFinish = (values: any) => {
    setIsOpenModalUpdate(false);
    console.log('Success:', values);
  };

  return (
    <Modal
      title="Basic Modal"
      open={isOpenModalUpdate}
      onOk={() => form.submit()}
      centered
      maskClosable={false}
      onCancel={() => {
        setIsOpenModalUpdate(false);
      }}
      width={'40vw'}
    >

      {/* Form Update */}
      <Form
        name="Update a blog"
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="idRole"
          rules={[{ required: true, message: 'Please input your color!' }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            {
              listRole?.map(role => (
                <Option key={role._id} value={role._id}>{role.nameRole}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: 'Please input your color!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thumb"
          name="thumb"
          rules={[{ required: true, message: 'Please input your thumb!' }]}
        >
          <Input />
        </Form.Item>

      </Form>

    </Modal>
  );
};

export default ModalUpdateBlog;