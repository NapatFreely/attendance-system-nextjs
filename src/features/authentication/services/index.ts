// import { isAxiosError } from 'axios'

// import axios from '@/lib/axios'

// export const login = async (
//   request: GetBrandListRequest
// ): Promise<GetBrandListResponse> => {
//   try {
//     const response = await axios.get(`/admin/brands`, {
//       params: request,
//     })

//     const { data: brandList, pagination } = response.data

//     return { brandList, pagination }
//   } catch (error) {
//     if (isAxiosError(error)) {
//       throw error.response?.data
//     }

//     throw new Error('Error fetching brand list.')
//   }
// }
