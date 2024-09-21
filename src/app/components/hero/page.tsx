"use client"
import React from 'react'
import Link from 'next/link';
import { MdOutlineFileDownload } from "react-icons/md";
import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import profilepic from "../../../../public/myPic.png"

const Hero = () => {
  return (
    <div>
      <section className="flex flex-col lg:flex-row items-center justify-around h-screen mb-40 sm:mt-20">
          <div className='w-[300px] sm:w-[400px] sm:ml-10'>
            <h1 className='text-white text-2xl pt-36'>Hello,</h1>
            <h1 className='text-white text-5xl  font-bold'>I'm Khalid<span>Ghani</span></h1>
            <div className='font-bold text-white text-2xl '><Typewriter
            options={{
            strings: ["I'M FrontEnd Web Developer"],
            autoStart: true,
            loop: true,
            }} /> </div>

            <p className='text-white'>I am committed to mastering the world's New Technologies , Cloud Computing and Artificial Intelligence.
            My goal is to innovate and contribute to the future of technology...</p>
            <div className=' sm:flex  w-[300px] sm:w-[500px] gap-6'>
              <a href="./myCv.pdf" target='_blank' className='flex bg-blue-400 items-center justify-center w-40  rounded-lg py-2
                   mt-14 font-semibold hover:bg-white hover:scale-90 duration-500'>
                   Download CV <MdOutlineFileDownload /></a>
                  <div className='md:hidden text-[24px]'></div>
                  <a href="https://www.linkedin.com/in/khalid-ghani-1a5a45272/" target='_blank' className='flex bg-transparent text-white items-center justify-center w-40 rounded-lg border-2 outline-none py-2 mt-14 font-semibold hover:bg-white hover:text-black hover:scale-90 duration-500 outline'>
                  LinkedIn</a>
                  
            </div> 
          </div>
        
        
        <div>
          <Image src={profilepic} alt="My Profile Picture" width={300} height={200} className='mt-16 mx-12  mb-20 rounded-[50%] shadow-lg shadow-yellow-400'/>
        </div>
      </section>
    </div>
  )
}

export default Hero
