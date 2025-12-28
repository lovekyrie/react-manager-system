import type { ApiResponse, PaginationResponse, Service } from '@/types/api'
import { http } from './request'

// 获取服务记录列表
export function queryServiceList(params: Record<string, any> = {}): Promise<ApiResponse<PaginationResponse<Service>>> {
  return http.get<PaginationResponse<Service>>('/api/services', params)
}

// 新增管理记录
export function addService(data: Service): Promise<ApiResponse<void>> {
  return http.post<void>('/api/services', data)
}

// 编辑管理记录
export function editService(data: Service): Promise<ApiResponse<void>> {
  return http.put<void>(`/api/services/${data.id}`, data)
}

// 删除管理记录
export function deleteService(id: number): Promise<ApiResponse<void>> {
  return http.delete<void>(`/api/services/${id}`)
}

// 批量删除管理记录
export function batchDeleteService(ids: number[]): Promise<ApiResponse<void>> {
  return http.delete<void>(`/api/services/batch/delete`, {
    body: JSON.stringify({ ids }),
  })
}
// 获取管理记录详情
export function getServiceById(id: number): Promise<ApiResponse<Service>> {
  return http.get<Service>(`/api/services/${id}`)
}
