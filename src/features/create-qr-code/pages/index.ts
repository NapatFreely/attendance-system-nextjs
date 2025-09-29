import dynamic from 'next/dynamic'

export const CreateQrCodePage = dynamic(() => import('./CreateQrCode'))
export const SelectLocationPage = dynamic(() => import('./SelectLocation'))
