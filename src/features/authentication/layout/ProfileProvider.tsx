'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import axiosClient from '@/lib/axios' // your axios instance
import { Route } from '@/types/route.type'
import { GetUserResponse } from '@/features/authentication/types'

interface ProfileContextType {
  profile: GetUserResponse | null
  setProfile: (profile: GetUserResponse) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

interface ProfileProviderProps {
  children: ReactNode
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<GetUserResponse | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response =
          await axiosClient.get<GetUserResponse>('/users/profile')
        setProfile(response.data)
      } catch (error) {
        router.replace(Route.LOGIN)
      }
    }

    fetchProfile()
  }, [router])

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

// Custom hook to use the profile
export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
