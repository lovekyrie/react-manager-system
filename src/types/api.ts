export interface User {
  id: number
  username: string
  email?: string
  avatar?: string
  role?: string
}

export interface Service {
  id?: number
  date: string
  name: string
  phone: string
  address: string
}

export interface LoginResponse {
  access_token: string
  user: User
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface PaginationResponse<T> {
  list: T[]
  total: number
}
