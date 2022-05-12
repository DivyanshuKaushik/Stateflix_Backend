import Link from 'next/link'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import { MdOutlineArticle, MdOutlineCreateNewFolder } from 'react-icons/md'

const PrivateHeader = () => {
  return (
    //   private routes 
    <nav className="flex justify-center space-x-4 w-full bg-purple-500 sticky top-0 z-50">
        <Link href="/dashboard">
            <a className="private_header">
                <FaHome />
                <span>Dashboard</span>
            </a>
        </Link>
        <Link href="/posts">
            <a className="private_header">
                <MdOutlineArticle />
                <span>Posts</span>
            </a>
        </Link>
        <Link href="/posts/create">
            <a className="private_header">
                <MdOutlineCreateNewFolder />
                <span>Create</span>
            </a>
        </Link>
        <Link href="/posts/all">
            <a className="private_header">
                <MdOutlineCreateNewFolder />
                <span>All Posts</span>
            </a>
        </Link>
    </nav>
  )
}

export default PrivateHeader