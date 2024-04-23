import { useEffect, useState } from "react";
import { Button, Image, Popconfirm, Space, Table, message } from "antd";
import type { TableProps } from 'antd';
import { BiPlus } from 'react-icons/bi';
import Header from "../../components/Header/Header";
import { sendRequest } from "../../utils/api";

// Import Modal
import ModalCreateBrand from "../../components/Modal/create.brand";
import ModalUpdateBrand from "../../components/Modal/update.brand";

const Brand = () => {

  // Get Token
  const accessToken = sessionStorage.getItem('user')!;
  const [listBrand, setListBrand] = useState<IBrand[]>();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IBrand>(null)
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  })

  const columns: TableProps<IBrand>['columns'] = [
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
      title: 'Image',
      dataIndex: 'urlImage',
      width: 1000,
      render: (_, record) => (
        <Image src={`http://localhost:8000/images/${record.urlImage}`} width={100} />
      )

    },
    {
      title: 'Action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setDataUpdate(record)
              setIsOpenModalUpdate(true)
            }}
          >
            Detail
          </Button>

          <Popconfirm
            title="Delete a role"
            description={`Are you sure to delete brand: ${record.title}?`}
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

  // Click Delete Blog
  const confirm = async (record: IBrand) => {
    const res = await sendRequest<IBackendRes<IBrand>>({
      method: 'delete',
      url: `http://localhost:8000/api/v1/brand/${record._id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })

    if (res.data) {
      message.success(`Delete brand ${record.title} success`);
      getDataBrand();
    } else {
      message.error(`Delete brand ${record.title} failed`)
    }
  };

  // Call API data Brand
  const getDataBrand = async () => {
    const res = await sendRequest<IBackendRes<IBrand>>({
      method: 'get',
      url: 'http://localhost:8000/api/v1/brand',
      queryParams: {
        current: meta.current,
        pageSize: meta.pageSize,
      }
    })

    if (res.data) {
      setListBrand(res.data.result);
    }
  }

  // Handle Change Pagination
  const handleOnChange = async (page: number, pageSize: number) => {
    const res = await sendRequest<IBackendRes<IBrand>>({
      method: 'GET',
      url: `http://localhost:8000/api/v1/brand`,
      queryParams: {
        current: page,
        pageSize: pageSize,
      }
    })

    if (res.data) {
      setListBrand(res.data?.result);
      setMeta({
        current: res.data?.meta.current!,
        pageSize: res.data?.meta.pageSize!,
        pages: res.data?.meta.pages,
        total: res.data?.meta.total,
      })
    }
  }

  useEffect(() => {
    getDataBrand();
  }, [])

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <Header title="Brand" />
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          icon={<BiPlus />}
          onClick={() => setIsOpenModalCreate(true)}
        >
          Add New Brand
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={listBrand}
        rowKey={(record) => record._id}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) => handleOnChange(page, pageSize)
        }}
      />

      <ModalCreateBrand
        isOpenModalCreate={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        accessToken={accessToken}
        getDataBrand={getDataBrand}
      />

      <ModalUpdateBrand
        isOpenModalUpdate={isOpenModalUpdate}
        setIsOpenModalUpdate={setIsOpenModalUpdate}
        dataUpdate={dataUpdate}
        accessToken={accessToken}
        getDataBrand={getDataBrand}
      />
    </>
  )
}

export default Brand