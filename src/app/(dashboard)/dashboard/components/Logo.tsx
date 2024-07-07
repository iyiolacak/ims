import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link
    href={"/dashboard/"}>
    <Image
    src={"/notionlogo.png"}
    alt='Logo'
    width={20}
    height={20}
    />
    </Link>
  )
}

export default Logo