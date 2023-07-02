declare namespace HTTP {
  type Params = Record<string, string | number>

  type Payload = Record<string, unknown>

  interface Response<T = null> {
    msg: string
    code: number
    message: string
    data: T
  }

  interface RequestOption<T> {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    headers?: Record<string, string>
    params?: T
    data?: T
    mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin'
    credentials?: 'include' | 'omit' | 'same-origin'
    noInterceptError?: boolean
    responseType?: 'blob'
  }
}
