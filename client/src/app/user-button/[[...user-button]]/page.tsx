'use client'

import { UserButton } from '@clerk/nextjs'
import { useEffect } from 'react'

const UserButtonPage = () => {
  useEffect(() => {
    // Remove Clerk watermarks
    const removeWatermarks = () => {
      const watermarks = document.querySelectorAll('div[class*="cl-internal-"]')
      watermarks.forEach(watermark => {
        if (watermark.textContent?.includes('Secured by Clerk') || 
            watermark.textContent?.includes('Development')) {
          watermark.remove()
        }
      })
    }

    // Initial removal
    removeWatermarks()

    // Set up a MutationObserver to remove watermarks if they're added dynamically
    const observer = new MutationObserver(removeWatermarks)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <UserButton />
    </div>
  )
}

export default UserButtonPage
