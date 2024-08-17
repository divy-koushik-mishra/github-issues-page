import { RiBookOpenLine, RiCodeLine, RiGithubFill, RiGitPullRequestFill, RiLayout3Fill, RiLayout3Line, RiLineChartLine, RiMenuFill, RiPlayCircleLine, RiShieldCheckLine } from '@remixicon/react'
import Link from 'next/link'
import { it } from 'node:test'
import React from 'react'

const Navbar = () => {
    const githubHeaderMenuItems = [
        {
            name: 'Code',
            href: '#',
            isActive: false,
            icon: <RiCodeLine className="h-5 w-5" />
        },
        {
            name: 'Issues',
            href: '/',
            isActive: true,
            icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10 2C5.03 2 1 6.03 1 11c0 4.97 4.03 9 9 9 4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7 0-3.87 3.13-7 7-7 3.87 0 7 3.13 7 7 0 3.87-3.13 7-7 7zm-1-12h2v2h-2V6zm0 4h2v6h-2V10z"></path></svg>

        },
        {
            name: 'Pull requests',
            href: '#',
            isActive: false,
            icon: <RiGitPullRequestFill className="h-5 w-5" />
        },
        {
            name: 'Actions',
            href: '#',
            isActive: false,
            icon: <RiPlayCircleLine />
        },
        {
            name: 'Projects',
            href: '#',
            isActive: false,
            icon: <RiLayout3Line />
        },
        {
            name: 'Wiki',
            href: '#',
            isActive: false,
            icon: <RiBookOpenLine />
        },
        {
            name: 'Security',
            href: '#',
            isActive: false,
            icon: <RiShieldCheckLine />
        },
        {
            name: 'Insights',
            href: '#',
            isActive: false,
            icon: <RiLineChartLine />
        }
    ]

    const repoName = "facebook / react"
  return (
    <header className='bg-[#02040A] w-full px-8 pt-4'>
        <nav className="">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center mb-5">
               
                <div className="border border-white rounded p-0.5 opacity-80 mr-10 cursor-pointer">
                <RiMenuFill className="text-white" />
                </div>
                <RiGithubFill className="text-white h-8 w-8 mx-4" />
            <h2 className='f opacity-80'>{repoName}</h2>
            </div>
            <div className="flex">
                <input type="text" className='w-80 px-2 py-1 border-[#ffffffa2] border-[0.1px] bg-transparent rounded-md' placeholder="Type '/' to search"  />
                <img src="https://avatars.githubusercontent.com/u/61595419?v=4" alt="" className='w-10 mx-4 rounded-full'/>
            </div>
            </div>





            <div className="flex">
            {
                githubHeaderMenuItems.map((item, index) => (
                    <div key={index}  className={`text-white cursor-pointer hover:text-gray-300 mr-3 pr-4 py-2 flex items-center ${item.isActive ? 'border-b border-[#F78166]' : ''}`}>
                        <Link href={item.href} className='flex'>
                        {item.icon}
                        {item.name}
                        </Link>
                    </div>
                ))
            }
            </div>
        </nav>
    </header>
  )
}

export default Navbar