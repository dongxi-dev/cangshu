import { ElMessage } from 'element-plus'
const defaultOption = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

async function request<T, U>(
  url: string,
  option: HTTP.RequestOption<U>
): Promise<HTTP.Response<T>> {
  const headers: Record<string, string> = {
    ...defaultOption.headers,
    ...(option.headers || {}),
  };

  const response: any = await fetch(url, {
    ...option,
    method: option.method,
    headers,
  });
  console.log(response,'response')
  if (response.code !== 0) {
    ElMessage({
      message: response.msg,
      type: "warning",
    });
    throw new Error(response.code);
  }

  return {
    code: response.code,
    message: response.msg,
    data: response.data,
    msg: response.msg,
  };
}

export async function get<
  T,
  U = Record<string, string | number | undefined | number[] | string[]>
>(
  url: string,
  params?: U,
  option?: Omit<HTTP.RequestOption<U>, "method" | "data">
) {
  return request<T, U>(url, {
    method: "GET",
    params,
    ...option,
  });
}

export async function post<
  T,
  U extends Record<string, unknown> = Record<string, unknown>
>(
  url: string,
  data?: any,
  option?: Omit<HTTP.RequestOption<U>, "method" | "data">
) {
  return request<T, U>(url, {
    method: "POST",
    data,
    ...option,
  });
}

export async function put<
  T,
  U extends Record<string, unknown> = Record<string, unknown>
>(
  url: string,
  data?: U,
  option?: Omit<HTTP.RequestOption<U>, "method" | "data">
) {
  return request<T, U>(url, {
    method: "PUT",
    data,
    ...option,
  });
}

export async function del<
  T,
  U extends Record<string, unknown> = Record<string, unknown>
>(
  url: string,
  data?: U,
  option?: Omit<HTTP.RequestOption<U>, "method" | "data">
) {
  return request<T, U>(url, {
    method: "DELETE",
    data,
    ...option,
  });
}
