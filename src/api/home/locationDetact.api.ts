
import { constApi } from '../constApi.ts'
import { request } from '../request.ts'

type FreeIpApiResponse = {
  countryName?: string
  countryCode?: string
  latitude?: number
  longitude?: number
  currencies?: string[]
}

export type LocationInfo = {
  location: string
  countryCode: string
  currency: string
  longitude: string
  latitude: string
}

export async function fetchLocationDetect(): Promise<LocationInfo> {
  try {
    const data = await request<FreeIpApiResponse>({
      url: constApi.home.locationDetect,
    })

    const location = data.countryName?.trim()

    if (!location) {
      throw new Error('位置数据不完整')
    }

    return {
      location,
      countryCode: data.countryCode?.trim().toUpperCase() || '—',
      currency: data.currencies?.[0]?.trim() || '—',
      longitude:
        data.longitude != null ? String(data.longitude) : '—',
      latitude: data.latitude != null ? String(data.latitude) : '—',
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : '无法获取位置信息',
    )
  }
}
