import { Modal, Form, Input, Upload, message } from "antd";
import { BiPlus } from "react-icons/bi";
import { sendRequest } from "../../utils/api";
const { TextArea } = Input;

// Initial interface props
interface IProps {
  isOpenModalCreate: boolean;
  setIsOpenModalCreate: (value: boolean) => void;
  accessToken: string;
  getDataRole: any;
}

const CreateRoleModal = (props: IProps) => {

  // Destructuring props
  const { isOpenModalCreate, setIsOpenModalCreate, accessToken, getDataRole } = props;
  const [form] = Form.useForm();

  // Thumb File
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Submit Form
  const onFinish = async (values: any) => {
    const { nameRole, description } = values;
    const data = { nameRole, description };

    // Call API create a role
    const res = await sendRequest<IBackendRes<IRole>>({
      method: 'post',
      url: 'https://kimtuyen.blog/api/v1/roles',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: data
    })

    if (res.data) {
      message.success('Create Role success')
      // Fetching list role
      getDataRole();
      // Close Modal
      setIsOpenModalCreate(false);
      // Reset Fields
      form.resetFields();
    } else {
      message.error('Create Role Failed')
    }
  };

  return (
    <Modal
      title="Create role"
      centered
      maskClosable={false}
      open={isOpenModalCreate}
      onOk={() => form.submit()}
      onCancel={() => {
        setIsOpenModalCreate(false);
        form.resetFields();
      }}
    >

      {/* Form Create Role */}
      <Form
        name="Create a role"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name Role"
          name="nameRole"
          rules={[{ required: true, message: 'Please input your name role!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="Thumb"
          name="thumb"
          // rules={[{ required: true, message: 'Please input your thumb!' }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
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

export default CreateRoleModal