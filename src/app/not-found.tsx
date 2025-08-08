import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>Trang này không tồn tại!</div>
      <div>
        <Link href="/">Quay về trang chủ</Link>
      </div>
    </div>
  )
}
