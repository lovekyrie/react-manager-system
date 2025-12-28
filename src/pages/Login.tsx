import type { Rule } from 'antd/es/form'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../api/auth'

const Login: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  // 如果已经登录，直接跳转到首页
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const onFinish = async (values: any) => {
    try {
      const { data: { access_token, user } } = await loginApi(values)
      message.success('登录成功')

      // 这里的 data 现在有了完整的类型提示
      localStorage.setItem('token', access_token)
      localStorage.setItem('userInfo', JSON.stringify(user))

      navigate('/', { replace: true })
    }
    catch (error: any) {
      console.error('Login error:', error)
      message.error(error.message || '网络错误，请稍后再试')
    }
  }

  const formRules: Record<string, Rule[]> = {
    username: [
      { required: true, message: '请输入用户名' },
    ],
    password: [
      { required: true, message: '请输入密码' },
    ],
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">后端管理系统</h1>
          <p className="mt-2 text-gray-600">欢迎回来，请登录您的账户</p>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item name="username" rules={formRules.username}>
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item name="password" rules={formRules.password}>
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              立即登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
