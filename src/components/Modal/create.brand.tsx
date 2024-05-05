import { Modal, Form, Input, Upload, message } from "antd";
import { BiPlus } from "react-icons/bi";
import { customRequest, beforeUpload } from "../../utils/upload";
import { sendRequestFormData } from "../../utils/api";

interface IProps {
  isOpenModalCreate: boolean;
  setIsOpenModalCreate: (value: boolean) => void;
  accessToken: string;
  getDataBrand: any;
}
const ModalCreateBrand = (props: IProps) => {

  const { isOpenModalCreate, setIsOpenModalCreate, accessToken, getDataBrand } = props;
  const [form] = Form.useForm();

  // Upload thumb single file
  const normSingleFile = (e: any) => {
    return e?.file;
  };

  // Submit Form
  const onFinish = async (values: any) => {
    const { title, urlImage } = values;
    const data = {
      title,
      urlImage: urlImage.originFileObj
    }

    // Create Form Data
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('urlImage', data.urlImage);

    // Call API post brand
    const res = await sendRequestFormData<IBackendRes<IBrand>>({
      method: 'POST',
      url: 'https://kimtuyen.blog/api/v1/brand',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    })

    if (res.data) {
      message.success('Create Brand success');
      getDataBrand();
      setIsOpenModalCreate(false);
      form.resetFields();
    } else {
      message.error('Create Brand failed')
    }
  }

  return (
    <Modal
      title="Create Brand"
      centered
      maskClosable={false}
      open={isOpenModalCreate}
      onOk={() => form.submit()}
      onCancel={() => {
        setIsOpenModalCreate(false);
        form.resetFields();
      }}
    >
      {/* Form Create Brand */}
      <Form
        name="Create a role"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          name="urlImage"
          rules={[{ required: true, message: 'Please input your image!' }]}
          valuePropName="file"
          getValueFromEvent={normSingleFile}
        >
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

      </Form>
    </Modal>
  )
}

export default ModalCreateBrand