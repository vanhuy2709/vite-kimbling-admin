import { useEffect, useState } from "react";
import { Modal, Input, Form, Select, ColorPicker, Upload, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BiPlus } from 'react-icons/bi';
import { sendRequest, sendRequestFormData } from "../../utils/api";
import { beforeUpload, customRequest } from "../../utils/upload";

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

  // Upload multiple file
  const normMultipleFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  // Upload single file
  const normSingleFile = (e: any) => {
    return e?.file;
  };

  // Submit Create Blog
  const onFinish = async (values: any) => {
    const { title, description, idRole, color, thumb, photo, video } = values;
    const data = {
      title,
      description,
      idRole,
      color: color.toHexString(),
      thumb: thumb.originFileObj,
      photo: photo.map((item: any) => item.originFileObj),
      video: video ? video.map((item: any) => item.urlVideo) : [],
    }
    // Close Modal
    setIsOpenModalCreate(false);
    // Reset Form Antd
    form.resetFields();

    // Create FormData
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('idRole', data.idRole);
    formData.append('color', data.color);
    formData.append('thumb', data.thumb);
    // formData.append('photos', data.photo);
    // formData.append('video', data.video);
    data.photo.forEach((image: any) => {
      formData.append('photos', image)
    })
    data.video.forEach((video: any) => {
      formData.append('video', video)
    })

    // Call API post data
    const res = await sendRequestFormData<IBackendRes<IBlog>>({
      method: 'post',
      url: 'http://localhost:8000/api/v1/blog',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
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
      width={'60vw'}
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
          <ColorPicker showText />
        </Form.Item>

        {/* Thumb */}
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

        {/* Photo (Array) */}
        <Form.Item
          label="Photo"
          name="photo"
          rules={[{ required: true, message: 'Please input at least 1 photo!' }]}
          valuePropName="fileList"
          getValueFromEvent={normMultipleFile}
        >
          <Upload
            listType="picture-card"
            multiple={true}
            maxCount={20}
            customRequest={customRequest}
            beforeUpload={beforeUpload}
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <BiPlus />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        {/* Video (Array) */}
        <Form.Item
          label='Video'
          name='video'
        >
          <Form.List name="video">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'urlVideo']}
                      rules={[{ required: true, message: 'Missing url video' }]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Url Video" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form>

    </Modal>
  )
}

export default ModalCreateBlog