import type { ApiResponse, LoginResponse } from '@/types/api'
import { http } from './request'

/**
 * 登录接口封装
 * @param values 登录表单数据
 * @returns 登录响应结果
 */
export async function loginApi(values: any): Promise<ApiResponse<LoginResponse>> {
  return http.post<LoginResponse>('/api/auth/login', values)
}
