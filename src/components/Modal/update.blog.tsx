import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, ColorPicker, Image, Upload, Carousel, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BiPlus } from "react-icons/bi";
import { customRequest, beforeUpload } from "../../utils/upload";
import { sendRequest, sendRequestFormData } from "../../utils/api";

const { Option } = Select;

interface IProps {
  isOpenModalUpdate: boolean;
  getDataBlog: any;
  setIsOpenModalUpdate: (value: boolean) => void;
  dataUpdate: null | IBlog;
  accessToken: string;
}

const ModalUpdateBlog = (props: IProps) => {

  const { isOpenModalUpdate, setIsOpenModalUpdate, dataUpdate, getDataBlog, accessToken } = props;
  const [listRole, setListRole] = useState<IRole[]>()!;
  const [form] = Form.useForm();

  // Fill data to modal update
  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        title: dataUpdate.title,
        description: dataUpdate.description,
        idRole: dataUpdate.idRole,
        color: dataUpdate.color,
        thumb: dataUpdate.thumb,
        video: dataUpdate.video,
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

  // Submit Update Blog
  const onFinish = async (values: any) => {
    const { title, description, idRole, color, thumb, photo, video } = values;
    const data = {
      title,
      description,
      idRole,
      color: color === dataUpdate?.color ? color : color.toHexString(),
      thumb: thumb === dataUpdate?.thumb ? thumb : thumb.originFileObj,
      photo: photo ? photo.map((item: any) => item.originFileObj) : dataUpdate?.photo,
      video
    }

    // Create Form Data
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('idRole', data.idRole);
    formData.append('color', data.color);
    formData.append('thumb', data.thumb);
    data.photo.forEach((image: any) => {
      formData.append('photos', image)
    })
    data.video.forEach((video: any) => {
      formData.append('video', video)
    })

    // Call API post data
    const res = await sendRequestFormData<IBackendRes<IBlog>>({
      method: 'PATCH',
      url: `http://localhost:8000/api/v1/blog/${dataUpdate?._id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    })

    if (res.data) {
      message.success('Update Blog success');
      setIsOpenModalUpdate(false);
      getDataBlog();
    } else {
      message.error('Update Blog Failed')
    }
  };

  return (
    <Modal
      title="Update Blog"
      centered
      maskClosable={false}
      open={isOpenModalUpdate}
      onOk={() => form.submit()}
      onCancel={() => {
        getDataBlog();
        setIsOpenModalUpdate(false);
      }}
      width={'60vw'}
    >

      {/* Form Update Blog */}
      <Form
        name="Update a blog"
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
          <Input />
        </Form.Item>

        {/* Role */}
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

        {/* Color */}
        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: 'Please input your color!' }]}
        >
          <ColorPicker showText />
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

        {/* Photo (Array) */}
        <Form.Item
          label='Photo'
          name='photo'
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

        {/* Show previous list photo */}
        <Form.Item>
          <Carousel style={{ backgroundColor: '#DEE6ED' }}>
            {dataUpdate?.photo.map(item => (
              <div key={item}>
                <Image
                  src={`http://localhost:8000/images/${item}`}
                  width={'100%'}
                  height={500}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </Carousel>
        </Form.Item>

        {/* Video (Array) */}
        <Form.Item
          label='Video'
        // name='video'
        >
          <Form.List
            name="video"
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}
                  >
                    <Form.Item
                      {...restField}
                      style={{ flex: 1 }}
                      name={name}
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
  );
};

export default ModalUpdateBlog;