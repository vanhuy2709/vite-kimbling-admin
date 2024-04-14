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

  const getDataRole = async () => {
    const res = await sendRequest<IBackendRes<IRole>>({
      method: 'get',
      url: 'https://kimtuyen.blog/api/v1/roles'
    })

    setListRole(res.data?.result);
  }

  // Call API get Data
  useEffect(() => {
    getDataRole()
  }, [])

  console.log(listRole);


  return (
    <>
      <Header title="Role" />
      <Table
        columns={columns}
        dataSource={listRole}
        rowKey={(record) => record._id}
      />
    </>
  )
}

export default Role;