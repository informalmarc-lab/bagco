'use client'

import Image, { type ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

type FallbackImageProps = Omit<ImageProps, 'alt'> & {
  alt: string
  fallbackSrc: string
}

export default function FallbackImage({
  src,
  fallbackSrc,
  unoptimized,
  onError,
  ...props
}: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)

  useEffect(() => {
    setCurrentSrc(src)
  }, [src])

  const shouldBypassOptimization =
    unoptimized ||
    (typeof currentSrc === 'string' && currentSrc.toLowerCase().endsWith('.svg')) ||
    (typeof fallbackSrc === 'string' && fallbackSrc.toLowerCase().endsWith('.svg'))

  return (
    // `next/image` receives `alt` through props, but jsx-a11y cannot see the forwarded prop here.
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      src={currentSrc}
      unoptimized={shouldBypassOptimization}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc)
        }
        onError?.(event)
      }}
    />
  )
}
