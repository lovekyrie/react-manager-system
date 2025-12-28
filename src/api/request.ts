import type { ApiResponse } from '../types/api'

/**
 * 核心请求工具函数
 * @param url 请求路径
 * @param options 请求配置
 * @param params 查询参数
 * @returns 响应数据
 */
async function request<T>(url: string, options: RequestInit = {}, params?: Record<string, any>): Promise<ApiResponse<T>> {
  let finalUrl = url
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      finalUrl += (url.includes('?') ? '&' : '?') + queryString
    }
  }

  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  // 自动附加 token
  const token = localStorage.getItem('token')
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(finalUrl, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    // 统一处理 401 登录过期
    if (response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    }
    throw new Error(data.message || '请求失败')
  }

  return data
}

export const http = {
  get: <T>(url: string, params?: Record<string, any>, options?: RequestInit) =>
    request<T>(url, { ...options, method: 'GET' }, params),

  post: <T>(url: string, body?: any, options?: RequestInit) =>
    request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: any, options?: RequestInit) =>
    request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string, options?: RequestInit) =>
    request<T>(url, { ...options, method: 'DELETE' }),
}
