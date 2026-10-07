import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import type {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

export const Container = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
  >
    {children}
  </div>
)

export const Section = ({
  children,
  tone = 'white',
}: {
  children: ReactNode
  tone?: 'white' | 'paper' | 'tint'
}) => (
  <section
    className={`py-14 sm:py-20 ${
      tone === 'paper'
        ? 'bg-paper'
        : tone === 'tint'
          ? 'bg-brand-tint'
          : 'bg-white'
    }`}
  >
    <Container>{children}</Container>
  </section>
)

export const Reveal = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{
      once: true,
      margin: '-60px',
    }}
    transition={{ duration: 0.45 }}
  >
    {children}
  </motion.div>
)

export const SectionHeading = ({
  title,
  text,
  center,
}: {
  title: string
  text?: string
  center?: boolean
}) => (
  <div
    className={`mb-10 max-w-2xl ${
      center ? 'mx-auto text-center' : ''
    }`}
  >
    <h2 className="text-3xl sm:text-4xl">
      {title}
    </h2>

    {text && (
      <p className="mt-3 text-lg text-mute">
        {text}
      </p>
    )}
  </div>
)

type BtnProps = {
  to?: string
  children: ReactNode
  variant?: 'primary' | 'outline' | 'light'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  to,
  children,
  variant = 'primary',
  ...rest
}: BtnProps) => {
  const cls = `inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-bold transition-colors ${
    variant === 'primary'
      ? 'bg-brand text-white hover:bg-brand-2'
      : variant === 'light'
        ? 'bg-white text-brand hover:bg-brand-tint'
        : 'border-2 border-brand text-brand hover:bg-brand-tint'
  }`

  return to ? (
    <Link
      to={to}
      className={cls}
    >
      {children}
    </Link>
  ) : (
    <button
      className={cls}
      {...rest}
    >
      {children}
    </button>
  )
}

/**
 * Image with a clearly marked placeholder
 * when no src is provided.
 */
export const Img = ({
  src,
  alt,
  className = '',
}: {
  src?: string
  alt: string
  className?: string
}) =>
  src ? (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
    />
  ) : (
    <div
      role="img"
      aria-label={alt}
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-brand-tint text-brand/70 ${className}`}
    >
      <Camera
        className="h-8 w-8"
        aria-hidden
      />

      <span className="text-xs font-semibold">
        Photo to be added
      </span>
    </div>
  )

/* =====================================================
   CARD
===================================================== */

export const Card = ({
  children,
  to,
  className = '',
}: {
  children: ReactNode
  to?: string
  className?: string
}) => {
  const cardClassName = `group block overflow-hidden rounded-lg border border-black/10 bg-white transition-shadow hover:shadow-md ${className}`

  return to ? (
    <Link
      to={to}
      className={cardClassName}
    >
      {children}
    </Link>
  ) : (
    <div className={cardClassName}>
      {children}
    </div>
  )
}

export const Tag = ({
  children,
}: {
  children: ReactNode
}) => (
  <span className="rounded bg-brand-tint px-2 py-0.5 text-xs font-bold text-brand">
    {children}
  </span>
)

export const PageHero = ({
  title,
  text,
}: {
  title: string
  text?: string
}) => (
  <header className="border-b border-black/5 bg-brand-tint py-14 sm:py-20">
    <Container>
      <h1 className="text-4xl sm:text-5xl">
        {title}
      </h1>

      {text && (
        <p className="mt-4 max-w-2xl text-lg text-mute">
          {text}
        </p>
      )}
    </Container>
  </header>
)