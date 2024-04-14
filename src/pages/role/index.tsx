import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { sendRequest } from "../../utils/api";
import { Space, Table, Button } from 'antd';
import type { TableProps } from 'antd';

const columns: TableProps<IRole>['columns'] = [
  {
    title: 'STT',
    dataIndex: 'stt',
    align: 'center',
    render: (_value, _record, index) => (
      <p>{index + 1}</p>
    )
  },
  {
    title: 'Name',
    dataIndex: 'nameRole',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 1000,
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

const Role = () => {
  const [listRole, setListRole] = useState<IRole[]>()!;
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  })

  const getDataRole = async () => {
    const res = await sendRequest<IBackendRes<IRole>>({
      method: 'get',
      url: 'https://kimtuyen.blog/api/v1/roles',
      queryParams: {
        current: meta.current,
        pageSize: meta.pageSize,
      }
    })

    if (res.data) {
      setListRole(res.data?.result);
    }
  }

  // Handle Change Pagination
  const handleOnChange = async (page: number, pageSize: number) => {
    const res = await sendRequest<IBackendRes<IRole>>({
      method: 'get',
      url: `https://kimtuyen.blog/api/v1/roles`,
      queryParams: {
        current: page,
        pageSize: pageSize,
      }
    })

    if (res.data) {
      setListRole(res.data?.result);
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
    getDataRole()
  }, [])

  return (
    <>
      <Header title="Role" />
      <Table
        columns={columns}
        dataSource={listRole}
        rowKey={(record) => record._id}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) => handleOnChange(page, pageSize)
        }}
      />
    </>
  )
}

export default Role;