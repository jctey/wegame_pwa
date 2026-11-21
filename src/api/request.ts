const MOCK_DELAY_MS = 400

export type ApiResult = {
  error_code: number
  error_message: string
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' 

export type RequestConfig = {
  url: string
  method?: HttpMethod
  headers?: Record<string, string>
  mock?: unknown
}

type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
type ResponseInterceptor = (payload: unknown) => unknown | Promise<unknown>

function withDefaults(config: RequestConfig): RequestConfig {
  return {
    ...config,
    method: config.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      ...config.headers,
    },
  }
}

function rejectBusinessError(payload: unknown): unknown {
  if (typeof payload !== 'object' || payload === null || !('result' in payload)) {
    return payload
  }

  const { result } = payload
  if (typeof result !== 'object' || result === null || !('error_code' in result)) {
    return payload
  }

  const { error_code: errorCode } = result
  if (typeof errorCode !== 'number' || errorCode === 0) {
    return payload
  }

  const errorMessage = 'error_message' in result ? result.error_message : ''
  throw new Error(typeof errorMessage === 'string' && errorMessage ? errorMessage : '请求失败')
}

const requestInterceptors: RequestInterceptor[] = [withDefaults]
const responseInterceptors: ResponseInterceptor[] = [rejectBusinessError]

export function addRequestInterceptor(interceptor: RequestInterceptor): void {
  requestInterceptors.push(interceptor)
}

export function addResponseInterceptor(interceptor: ResponseInterceptor): void {
  responseInterceptors.push(interceptor)
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function request<T>(config: RequestConfig): Promise<T> {
  let next = config
  for (const interceptor of requestInterceptors) {
    next = await interceptor(next)
  }

  let payload: unknown
  if (next.mock !== undefined) {
    await wait(MOCK_DELAY_MS)
    payload = next.mock
  } else {
    const response = await fetch(next.url, {
      method: next.method,
      headers: next.headers,
    })
    if (!response.ok) {
      throw new Error(`请求失败 (${response.status})`)
    }
    payload = (await response.json()) as unknown
  }

  for (const interceptor of responseInterceptors) {
    payload = await interceptor(payload)
  }

  return payload as T
}
