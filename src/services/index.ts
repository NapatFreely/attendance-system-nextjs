import { isAxiosError } from 'axios'

import appConfig from '@/appConfig'
import { templatePath } from '@/helpers/filePath'
import axiosClient from '@/lib/axios'
import {
  BaseImage,
  FileUploadRequest,
  GetOccupationListResponse,
  GetNationalityListResponse,
  GetAddressListResponse,
  GetCountryListResponse,
  GetRegisterChannelListResponse,
  GetGenderListResponse,
  GetSalutationListResponse,
  GetRegisterLocationListResponse,
  GetBenefitTypeListResponse,
  DownloadFileThroughGatewayRequest,
  DownloadFileThroughGatewayResponse,
  GetUpgradeGroupListResponse,
  GetUpgradeReasonListResponse,
} from '@/types'

const baseURL = `${appConfig.NEXT_PUBLIC_APP_BASE_URL}/api`

export const fetchOccupationList =
  async (): Promise<GetOccupationListResponse> => {
    try {
      const response = await axiosClient.get('/assets/occupations', {
        baseURL: baseURL,
        headers: {
          // Not send token to avoid large request
          Authorization: `Bearer`,
        },
      })
      return {
        occupationList: response.data.data,
      }
    } catch (error) {
      throw new Error('Error fetching occupation list.')
    }
  }

export const fetchNationalityList =
  async (): Promise<GetNationalityListResponse> => {
    try {
      const response = await axiosClient.get('/assets/nationalities', {
        baseURL: baseURL,
        headers: {
          // Not send token to avoid large request
          Authorization: `Bearer`,
        },
      })
      return {
        nationalityList: response.data.data,
      }
    } catch (error) {
      throw new Error('Error fetching nationality list.')
    }
  }

export const fetchAddressList = async (): Promise<GetAddressListResponse> => {
  try {
    const response = await axiosClient.get('/assets/addresses', {
      baseURL: baseURL,
      headers: {
        // Not send token to avoid large request
        Authorization: `Bearer`,
      },
    })
    return {
      addressList: response.data,
    }
  } catch (error) {
    throw new Error('Error fetching address list.')
  }
}

export const fetchCountryList = async (): Promise<GetCountryListResponse> => {
  try {
    const response = await axiosClient.get('/assets/countries', {
      baseURL: baseURL,
      headers: {
        // Not send token to avoid large request
        Authorization: `Bearer`,
      },
    })
    return {
      countryList: response.data.data,
    }
  } catch (error) {
    throw new Error('Error fetching country list.')
  }
}

export const fetchRegisterChannelList =
  async (): Promise<GetRegisterChannelListResponse> => {
    try {
      const response = await axiosClient.get('/assets/register-channels')

      return {
        registerChannelList: response.data.data,
      }
    } catch (error) {
      throw new Error('Error fetching register channel list.')
    }
  }

export const fetchRegisterLocationList =
  async (): Promise<GetRegisterLocationListResponse> => {
    try {
      const { data } = await axiosClient.get('/assets/register-locations')

      return {
        registerLocationList: data.data,
      }
    } catch (error) {
      throw new Error('Error fetching register location list.')
    }
  }

export const fetchGenderList = async (): Promise<GetGenderListResponse> => {
  try {
    const response = await axiosClient.get('/assets/genders', {
      baseURL: baseURL,
      headers: {
        // Not send token to avoid large request
        Authorization: `Bearer`,
      },
    })
    return {
      genderList: response.data.data,
    }
  } catch (error) {
    throw new Error('Error fetching gender list.')
  }
}

export const fetchSalutationList =
  async (): Promise<GetSalutationListResponse> => {
    try {
      const response = await axiosClient.get('/assets/salutations', {
        baseURL: baseURL,
        headers: {
          // Not send token to avoid large request
          Authorization: `Bearer`,
        },
      })
      return {
        salutationList: response.data.data,
      }
    } catch (error) {
      throw new Error('Error fetching salutation list.')
    }
  }

export const uploadFile = async (
  uploadValue: FileUploadRequest
): Promise<BaseImage> => {
  try {
    const { file, category } = uploadValue
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', category)
    const { data } = await axiosClient.post<BaseImage>(
      '/loyalty/files/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response?.data
    } else {
      throw new Error('Something went wrong.')
    }
  }
}

export const fetchBenefitTypeList =
  async (): Promise<GetBenefitTypeListResponse> => {
    try {
      const response = await axiosClient.get('/benefit-types')

      return {
        benefitTypeList: response.data.data,
      }
    } catch (error) {
      throw new Error('Error fetching benefit type list.')
    }
  }

export const downloadFileThroughGateway = async (
  request: DownloadFileThroughGatewayRequest
): Promise<DownloadFileThroughGatewayResponse> => {
  try {
    const { directory, fileName } = request

    const url = templatePath({ directory, fileName })

    const response = await axiosClient.get(url, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })

    const blob = new Blob([response.data], { type: response.data.type })

    return { blob, fileName }
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw error
  }
}

export const fetchUpgradeGroupList =
  async (): Promise<GetUpgradeGroupListResponse> => {
    try {
      const response = await axiosClient.get('/assets/upgrade-groups')

      return {
        upgradeGroupList: response.data.data,
      }
    } catch (error) {
      throw new Error('Error fetching upgrade group list.')
    }
  }

export const fetchUpgradeReasonList =
  async (): Promise<GetUpgradeReasonListResponse> => {
    try {
      const response = await axiosClient.get('/assets/upgrade-reasons')

      return {
        upgradeReasonList: response.data.data,
      }
    } catch (error) {
      throw new Error('Error fetching upgrade reason list.')
    }
  }
