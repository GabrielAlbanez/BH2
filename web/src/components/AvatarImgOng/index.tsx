import React from 'react'
import { useAppSelector } from '../../store/intex';


interface typeProsAvatar {
  largura: number;
  altura: number;
}

export default function AvatarImgOng({ largura, altura }: typeProsAvatar) {

  const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    Logo: string;
  }>;

  console.log(ong)

  const logoOng = ong[0]?.Logo.slice(8)

  localStorage.setItem('logoOng', logoOng)



  return (
    <div>
      <img
        src={`https://bh2-upl7.onrender.com/uploadImgOng/${logoOng}`}
        alt="" className={`w-${largura} h-${altura} w-14  2xl:w-14 h-12 rounded-full object-cover `} />

    </div>
  )
}
