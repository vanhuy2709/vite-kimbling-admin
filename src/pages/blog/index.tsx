import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { sendRequest } from "../../utils/api";
import { Space, Table, Tag, Button } from 'antd';
import type { TableProps } from 'antd';
import { BiPlus } from 'react-icons/bi';

// Import Modal
import ModalUpdateBlog from "../../components/Modal/update.blog";
import ModalCreateBlog from "../../components/Modal/create.blog";

const Blog = () => {

  // Initial State
  const [listBlog, setListBlog] = useState<IBlog[]>()!;
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IBlog>(null);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0
  });

  // Column Table
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
            onClick={() => {
              setDataUpdate(record);
              setIsOpenModalUpdate(true);
            }}
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

  // Get Data Blog
  const getDataBlog = async () => {
    const res = await sendRequest<IBackendRes<IBlog>>({
      method: 'get',
      url: `https://kimtuyen.blog/api/v1/blog`,
      queryParams: {
        current: meta.current,
        pageSize: meta.pageSize,
      }
    })

    if (res.data) {
      setListBlog(res.data?.result);
      setMeta({
        current: res.data?.meta.current!,
        pageSize: res.data?.meta.pageSize!,
        pages: res.data?.meta.pages,
        total: res.data?.meta.total,
      })
    }
  }
  // Handle Change Pagination
  const handleOnChange = async (page: number, pageSize: number) => {
    const res = await sendRequest<IBackendRes<IBlog>>({
      method: 'get',
      url: `https://kimtuyen.blog/api/v1/blog`,
      queryParams: {
        current: page,
        pageSize: pageSize,
      }
    })

    if (res.data) {
      setListBlog(res.data?.result);
      setMeta({
        current: res.data?.meta.current!,
        pageSize: res.data?.meta.pageSize!,
        pages: res.data?.meta.pages,
        total: res.data?.meta.total,
      })
    }
  }

  // Call API get Data
  useEffect(() => {
    getDataBlog();
  }, [])

  return (

    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <Header title="Blog" />
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          icon={<BiPlus />}
          onClick={() => setIsOpenModalCreate(true)}
        >
          Add New Blog
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listBlog}
        rowKey={(record) => record._id}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) => handleOnChange(page, pageSize)
        }}
      />

      <ModalUpdateBlog
        isOpenModalUpdate={isOpenModalUpdate}
        setIsOpenModalUpdate={setIsOpenModalUpdate}
        getDataBlog={getDataBlog}
        dataUpdate={dataUpdate}
      />

      <ModalCreateBlog
        isOpenModalCreate={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        getDataBlog={getDataBlog}
      />

    </>
  )
}

export default Blog;