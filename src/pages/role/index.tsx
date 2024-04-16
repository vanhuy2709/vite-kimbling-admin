import { useEffect, useState } from "react";
import { sendRequest } from "../../utils/api";
import { Space, Table, Button, Popconfirm, message } from 'antd';
import type { TableProps } from 'antd';
import { BiPlus } from 'react-icons/bi';
import Header from "../../components/Header/Header";

// Import Modal
import CreateRoleModal from "../../components/Modal/create.role";

const Role = () => {

  const accessToken = sessionStorage.getItem('user')!;
  const [listRole, setListRole] = useState<IRole[]>()!;
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  })

  // Call API Delete Role
  const confirm = async (record: IRole) => {
    const res = await sendRequest<IBackendRes<IRole>>({
      method: 'delete',
      url: `https://kimtuyen.blog/api/v1/roles/${record._id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })

    if (res.data) {
      message.success('Delete role success');
      getDataRole();
    } else {
      message.error('Delete role failed')
    }
  };

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
            onClick={() => {
              console.log('View: ', record._id)
            }}
          >
            Detail
          </Button>

          <Popconfirm
            title="Delete a role"
            description={`Are you sure to delete role: ${record.nameRole}?`}
            onConfirm={() => confirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  // Call API data Role
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}
      >
        <Header title="Role" />
        <Button
          icon={<BiPlus />}
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => setIsOpenModalCreate(true)}
        >
          Add New Role
        </Button>
      </div>
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

      <CreateRoleModal
        isOpenModalCreate={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        accessToken={accessToken}
        getDataRole={getDataRole}
      />
    </>
  )
}

export default Role;