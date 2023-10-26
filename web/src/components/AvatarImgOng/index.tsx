import React from 'react'
import { useAppSelector } from '../../store/intex';

export default function AvatarImgOng() {

    const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
        Logo: string;
      }>;
     
      console.log(ong)

      const logoOng = ong[0]?.Logo.slice(16)



  return (
    <div>
      <img  src={require(`../../uploads/${logoOng}`)} alt="" className='w-10 2xl:w-12 rounded-full '/>   
    </div>
  )
}
