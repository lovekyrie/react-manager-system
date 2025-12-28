import type { ColumnsType } from 'antd/es/table'
import type { Service } from '@/types/api'
import { Button, message, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { deleteService, queryServiceList } from '@/api/service'

const ServiceInfo: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Service[]>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  // 获取列表数据
  const fetchList = async (page = current, size = pageSize) => {
    setLoading(true)
    try {
      const { data: res } = await queryServiceList({ page, pageSize: size })
      setData(res.list)
      setTotal(res.total)
    }
    catch (error: any) {
      message.error(error.message || '获取列表失败')
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEdit = (record: Service) => {
    message.info(`编辑: ${record.name}`)
    // 这里后续可以弹出 Modal
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteService(id)
      message.success('删除成功')
      fetchList() // 刷新列表
    }
    catch (error: any) {
      message.error(error.message || '删除失败')
    }
  }

  const columns: ColumnsType<Service> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleEdit(record)}
            type="primary"
            size="small"
            style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}
          >
            编辑
          </Button>
          <Button
            onClick={() => record.id && handleDelete(record.id)}
            type="primary"
            danger
            size="small"
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 mb-4">
        <Space>
          <Button type="primary" style={{ backgroundColor: '#1890ff' }}>
            新增
          </Button>
          <Button
            type="primary"
            danger
            disabled={selectedRowKeys.length === 0}
          >
            删除
          </Button>
        </Space>
      </div>
      <div className="flex-1 min-h-0">
        <Table
          className="full-height-table"
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={data}
          rowSelection={{
            selectedRowKeys,
            onChange: keys => setSelectedRowKeys(keys),
          }}
          // 关键：scroll.y 设置为 100% 配合 CSS 中的 flex: 1 让表格体铺满
          scroll={{ y: '100%' }}
          pagination={{
            current,
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `Total ${total}`,
            onChange: (page, size) => {
              setCurrent(page)
              setPageSize(size)
              fetchList(page, size)
            },
          }}
        />
      </div>
    </div>
  )
}

export default ServiceInfo
