import '../styles/globals.css';

export const metadata = {
  title: {
    template: '%s | Saveen',
    default: 'Saveen | Backend Developer',
  },
  description:
    'Portfolio of Saveen Nidukshan, Backend Developer, Penetration Tester, and Software Engineer.',
  keywords: [
    'Saveen',
    'Saveen Nidukshan',
    'Backend Developer',
    'Penetration Tester',
    'Software Engineer',
    'Node.js',
    'Express',
    'MongoDB',
    'Next.js',
    'React',
    'Cyber Security',
    'Portfolio',
  ],
  authors: [{ name: 'Saveen Nidukshan' }],
  creator: 'Saveen Nidukshan',
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://saveen.dev'),
  openGraph: {
    title: 'Saveen | Backend Developer',
    description:
      'Portfolio of Saveen Nidukshan, Backend Developer, Penetration Tester, and Software Engineer.',
    url: 'https://saveen.dev',
    siteName: 'Saveen Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saveen | Backend Developer',
    description:
      'Portfolio of Saveen Nidukshan, Backend Developer, Penetration Tester, and Software Engineer.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <p>dev hasn't time to develop portfolio 🥲</p>
        <a href="https://lk.linkedin.com/in/saveennidukshan">
          Find me on LinkedIn
        </a>

        {children}
      </body>
    </html>
  );
}
