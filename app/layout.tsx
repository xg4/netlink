import { PropsWithChildren } from 'react'

export const metadata = {
  title: 'Clash Subscription',
  description: 'Explore a Range of Clash Subscription Links for a Better Web Browsing Experience',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
