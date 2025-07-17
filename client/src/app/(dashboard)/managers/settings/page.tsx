"use client"

import SettingsForm from '@/components/SettingsForm';
import { useGetAuthUserQuery, useUpdateManagerSettingsMutation } from '@/state/api'
import React from 'react'

const ManagerSettings = () => {
    const {data : authUser , isLoading} = useGetAuthUserQuery();
    const [updateManager] = useUpdateManagerSettingsMutation();
    if(isLoading) return <div>loading...</div>

    const initialData = {
        name : authUser?.userInfo.name,
        email : authUser?.userInfo.email,
        phoneNumber : authUser?.userInfo.phoneNumber,
    }
    const handleSubmit = async( data : typeof initialData) => {
        await updateManager( {
            cognitoId : authUser?.cognitoInfo.userId,
            ...data
        })
    }

  return (
    <div>
        <SettingsForm 
            onSubmit={handleSubmit}
            initialData={initialData}
            userType='manager'
        />
    </div>
  )
}

export default ManagerSettings