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
  fill,
  priority,
  loading,
  className,
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
      {...(fill ? { width: 1200, height: 900 } : {})}
      src={currentSrc}
      priority={priority}
      loading={priority ? undefined : (loading || 'lazy')}
      unoptimized={shouldBypassOptimization}
      className={fill ? `h-full w-full ${className || ''}`.trim() : className}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc)
        }
        onError?.(event)
      }}
    />
  )
}
