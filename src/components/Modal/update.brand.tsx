import { Modal, Form, Input, Upload, Image, message } from "antd";
import { useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { customRequest, beforeUpload } from "../../utils/upload";
import { sendRequestFormData } from "../../utils/api";

interface IProps {
  isOpenModalUpdate: boolean;
  setIsOpenModalUpdate: (value: boolean) => void;
  dataUpdate: null | IBrand;
  accessToken: string;
  getDataBrand: any;
}

const ModalUpdateBrand = (props: IProps) => {

  const { isOpenModalUpdate, setIsOpenModalUpdate, dataUpdate, accessToken, getDataBrand } = props;
  const [form] = Form.useForm();

  // Fill data to modal Update
  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        title: dataUpdate.title,
        urlImage: dataUpdate.urlImage
      })
    }
  }, [dataUpdate])

  // Upload single file
  const normSingleFile = (e: any) => {
    return e?.file;
  };

  // Submit Form
  const onFinish = async (values: any) => {
    const { title, urlImage } = values;
    const data = {
      title,
      urlImage: urlImage === dataUpdate?.urlImage ? urlImage : urlImage.originFileObj
    }

    // Create Form Data
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('urlImage', data.urlImage);

    // Call API update data
    const res = await sendRequestFormData<IBackendRes<IBrand>>({
      method: 'PATCH',
      url: `http://localhost:8000/api/v1/brand/${dataUpdate?._id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    })

    if (res.data) {
      message.success('Update Brand success');
      getDataBrand();
      setIsOpenModalUpdate(false);
      form.resetFields();
    } else {
      message.error('Update Brand Failed')
    }
  }

  return (
    <Modal
      title="Update Brand"
      maskClosable={false}
      centered
      open={isOpenModalUpdate}
      onOk={() => form.submit()}
      onCancel={() => setIsOpenModalUpdate(false)}
    >
      {/* Form Update Brand */}
      <Form
        name="Update a role"
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

        {/* Url Image */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Form.Item
            label="Image"
            name="urlImage"
            rules={[{ required: true, message: 'Please input your image!' }]}
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
            src={`http://localhost:8000/images/${dataUpdate?.urlImage}`}
            width={100}
            height={100}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Form>
    </Modal>
  )
}

export default ModalUpdateBrand