// frontend/app/layout.js
import { Roboto } from 'next/font/google'; // Import Roboto from next/font/google
import "./globals.css";
import Header from '@/_components/Header';
import Footer from '@/_components/Footer';

// Configure the Roboto font
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'], // Include necessary weights
  style: ['normal', 'italic'], // Include necessary styles if needed
  subsets: ['latin'], // Include necessary subsets
  variable: '--font-roboto', // Define the CSS variable name
});

export const metadata = {
  title: "Asili Explorer",
  description: "Your premier destination for unforgettable Tanzania adventures.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Apply the Roboto font variable to the body */}
      <Header/>
      <body className={`${roboto.variable} antialiased`}>
        {children}
      </body>
      <Footer/>
    </html>
  );
}