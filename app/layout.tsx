import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata = {
  title: 'NoteHub App',
  description: 'Manage your personal notes efficiently',
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {modal}
            {children}
            </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}