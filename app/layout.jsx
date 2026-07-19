import '../styles/globals.css';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export const metadata = {
    title: {
        template: '%s | Netlify',
        default: 'Netlify Starter'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
            </head>
            <body>
                <p>dev hasn't time to develop portfolio 🥲</p>
                <a href="https://lk.linkedin.com/in/saveennidukshan">find in linkedin</a>
            </body>
        </html>
    );
}
