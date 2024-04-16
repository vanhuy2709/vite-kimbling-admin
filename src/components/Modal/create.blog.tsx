import { Modal, Input, Form, Select } from "antd";
import { sendRequest } from "../../utils/api";
const { Option } = Select;

interface IProps {
  isOpenModalCreate: boolean;
  setIsOpenModalCreate: (value: boolean) => void;
  getDataBlog: any;
}
const ModalCreateBlog = (props: IProps) => {

  const { isOpenModalCreate, setIsOpenModalCreate } = props;

  return (
    <Modal
      title="Create blog"
      centered
      maskClosable={false}
      open={isOpenModalCreate}
      onOk={() => setIsOpenModalCreate(false)}
      onCancel={() => setIsOpenModalCreate(false)}
    >

      {/* Form Create */}
      <Form
        name="Create a blog"
        // onFinish={onFinish}
        layout="vertical"
      // form={form}
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
            {/* {
              listRole?.map(role => (
                <Option key={role._id} value={role._id}>{role.nameRole}</Option>
              ))
            } */}
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
  )
}

export default ModalCreateBlog