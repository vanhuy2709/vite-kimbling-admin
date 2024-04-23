import { Modal, Form, Input, Upload, Image } from "antd";
import { useEffect } from "react";
import { customRequest, beforeUpload } from "../../utils/upload";
import { BiPlus } from "react-icons/bi";
const { TextArea } = Input;

interface IProps {
  isOpenModalUpdate: boolean;
  setIsOpenModalUpdate: (value: boolean) => void;
  dataUpdate: IRole | null;
  getDataRole: any;
  accessToken: string;
}
const ModalUpdateRole = (props: IProps) => {

  const { isOpenModalUpdate, setIsOpenModalUpdate, dataUpdate } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        nameRole: dataUpdate.nameRole,
        description: dataUpdate.description
      })
    }
  }, [dataUpdate])

  // Upload single file
  const normSingleFile = (e: any) => {
    return e?.file;
  };

  // Submit Update Blog
  const onFinish = async (values: any) => {
    console.log('Success: ', values);
  };

  return (
    <Modal
      title="Update Role"
      centered
      maskClosable={false}
      open={isOpenModalUpdate}
      onCancel={() => {
        setIsOpenModalUpdate(false)
      }}
      width={'60vw'}
    >
      {/* Form Update Role */}
      <Form
        name="Update a role"
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >

        {/* Name Role */}
        <Form.Item
          label="Name Role"
          name="nameRole"
          rules={[{ required: true, message: 'Please input your nameRole!' }]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <TextArea style={{ height: '120px' }} />
        </Form.Item>

        {/* Thumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Form.Item
            label="Thumb"
            name="thumb"
            rules={[{ required: true, message: 'Please input your thumb!' }]}
            valuePropName="file"
            getValueFromEvent={normSingleFile}
          >
            {/* <Input /> */}
            <Upload
              listType="picture-card"
              multiple={false}
              maxCount={1}
              customRequest={customRequest}
              beforeUpload={beforeUpload}
            >
              <button style={{ border: 0, background: 'none' }} type="button">
                <BiPlus />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Image
            src={`http://localhost:8000/images/${dataUpdate?.thumb}`}
            width={100}
            height={100}
          />
        </div>
      </Form>
    </Modal>
  )
}

export default ModalUpdateRole