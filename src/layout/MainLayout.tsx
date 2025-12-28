import type { MenuItemType, SubMenuType } from 'antd/es/menu/interface'
import {
  DesktopOutlined,
  FileOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Button, Layout, Menu, message, Space, theme } from 'antd'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

type ItemType = MenuItemType | SubMenuType

const { Header, Content, Sider } = Layout

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: ItemType[],
): ItemType {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items: ItemType[] = [
  getItem('服务管理', 'service', <PieChartOutlined />, [
    getItem('服务信息', '/service/info'),
  ]),
  getItem('产品管理', 'product', <DesktopOutlined />),
  getItem('费用管理', 'expense', <UserOutlined />),
  getItem('知识库', 'knowledge', <TeamOutlined />),
  getItem('记账管理', 'accounting', <FileOutlined />),
  getItem('关于我们', 'about', <FileOutlined />),
]

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/')) {
      navigate(key)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    message.success('已退出登录')
    navigate('/login')
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  return (
    <Layout className="h-screen overflow-hidden">
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="h-8 m-4 bg-white/20 text-white text-center leading-8 font-bold">
          记账管理系统
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="flex flex-col overflow-hidden">
        <Header className="p-0 flex justify-between items-center px-4 bg-white shrink-0">
          <div />
          <Space>
            <span className="text-gray-600">
              欢迎您，
              {userInfo.username || '管理员'}
            </span>
            <Button
              type="link"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              退出登录
            </Button>
          </Space>
        </Header>
        <Content className="flex-1 flex flex-col overflow-hidden p-4 bg-[#f5f5f5]">
          <Breadcrumb className="mb-4 shrink-0">
            <Breadcrumb.Item>服务管理</Breadcrumb.Item>
            <Breadcrumb.Item>服务信息</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="flex-1 flex flex-col overflow-hidden"
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 0,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
