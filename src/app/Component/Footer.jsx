import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
     <footer className='bg-black text-white'>
        <div className='container mx-auto grid grid-cols-4 pt-12'>
        <div>
           <img className='w-[490px]' src="https://bankingkhabar.com/wp-content/uploads/2022/08/logo1-1.jpg" alt="" />
           <ul>
            <li className='flex items-center py-1.5 mt-3'><Icon icon='fa-regular:list-alt'/> सूचना विभाग दर्ता नं : २९१/०७३-७४66</li>
            <li  className='flex items-center py-1.5'><Icon icon='fa:phone'/><Link href='tel:9851215417'>फोन नं : 9851215417, 9851215418</Link></li>
            <li className='flex items-center py-1.5'><Icon icon='fontisto:email'/><Link href='mailto: bankingkhabar72@gmail.com'>समाचार : bankingkhabar72@gmail.com</Link></li>
            <li className='flex items-center py-1.5'><Icon icon='fontisto:email'/><Link href='mailto: bankingkhabaradv@gmail.com'>विज्ञापन : bankingkhabaradv@gmail.com</Link></li>

           </ul>
        </div>
        <div></div>
        <div></div>
        <div>
            <h2 className='text-[20px] border-b-[1px] border-red-[rgba(112, 113, 124, 0.3)] font-bold'>Chief Editor</h2>
            <h4>Madhav Nirdosh</h4>

            <h2 className='text-[20px] pt-5 border-b-[1px] border-red-[rgba(112, 113, 124, 0.3)] font-bold'>Coordinator</h2>
            <h4>Sandip B. K</h4>
        </div>
        </div>

    </footer> 
    </>
  )
}

export default Footer
