import { Modal, Form, Input, Upload, Image, message } from "antd";
import { useEffect } from "react";
import { customRequest, beforeUpload } from "../../utils/upload";
import { BiPlus } from "react-icons/bi";
import { sendRequestFormData } from "../../utils/api";
const { TextArea } = Input;

interface IProps {
  isOpenModalUpdate: boolean;
  setIsOpenModalUpdate: (value: boolean) => void;
  dataUpdate: IRole | null;
  getDataRole: any;
  accessToken: string;
}
const ModalUpdateRole = (props: IProps) => {

  const { isOpenModalUpdate, setIsOpenModalUpdate, dataUpdate, accessToken, getDataRole } = props;
  const [form] = Form.useForm();

  // Fill data to modal Update
  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        nameRole: dataUpdate.nameRole,
        description: dataUpdate.description,
        thumb: dataUpdate.thumb
      })
    }
  }, [dataUpdate])

  // Upload single file
  const normSingleFile = (e: any) => {
    return e?.file;
  };

  // Submit Update Blog
  const onFinish = async (values: any) => {
    const { nameRole, description, thumb } = values;
    const data = {
      nameRole,
      description,
      thumb: thumb === dataUpdate?.thumb ? thumb : thumb.originFileObj,
    }

    // Create Form Data
    const formData = new FormData();
    formData.append('nameRole', data.nameRole);
    formData.append('description', data.description);
    formData.append('thumb', data.thumb);

    // Call API update data
    const res = await sendRequestFormData<IBackendRes<IRole>>({
      method: 'PATCH',
      url: `http://localhost:8000/api/v1/roles/${dataUpdate?._id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    })

    if (res.data) {
      message.success('Update Role success');
      getDataRole();
      setIsOpenModalUpdate(false);
      form.resetFields();
    } else {
      message.error('Update Role Failed')
    }
  };

  return (
    <Modal
      title="Update Role"
      centered
      maskClosable={false}
      open={isOpenModalUpdate}
      onOk={() => form.submit()}
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
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Form>
    </Modal>
  )
}

export default ModalUpdateRole