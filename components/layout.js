import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ex-wife Bot',
  description: 'Stay in touch with your ex-wife...',
}

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }

export default function Layout({ children }) {
  return (
      <div className={inter.className}>
        {children}
      </div>
  )
}

