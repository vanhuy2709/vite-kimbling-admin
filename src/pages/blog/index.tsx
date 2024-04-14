import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { sendRequest } from "../../utils/api";
import { Space, Table, Tag, Button } from 'antd';
import type { TableProps } from 'antd';

const columns: TableProps<IBlog>['columns'] = [
  {
    title: 'STT',
    dataIndex: 'stt',
    align: 'center',
    render: (_value, _record, index) => (
      <p>{index + 1}</p>
    )
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    align: 'center',
    render: (_value, record) => (
      <Tag color={record.color}>{record.color}</Tag>
    )

  },
  {
    title: 'Action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => console.log('View: ', record._id)}
        >
          Detail
        </Button>
        <Button
          danger
          onClick={() => console.log('Delete: ', record._id)}
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

const Blog = () => {
  const [listBlog, setListBlog] = useState<IBlog[]>()!;

  const getDataBlog = async () => {
    const res = await sendRequest<IBackendRes<IBlog>>({
      method: 'get',
      url: 'https://kimtuyen.blog/api/v1/blog'
    })

    setListBlog(res.data?.result);
  }

  // Call API get Data
  useEffect(() => {
    getDataBlog()
  }, [])

  return (

    <>
      <Header title="Blog" />
      <Table
        columns={columns}
        dataSource={listBlog}
        rowKey={(record) => record._id}
      />
    </>
  )
}

export default Blog