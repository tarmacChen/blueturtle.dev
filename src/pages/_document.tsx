import { Html, Head, Main, NextScript } from 'next/document';
import { Logo } from '../components/Logo';
import { SearchButton } from '../components/SearchButton';
import { DesktopNavbar } from '../components/DesktopNavbar';
import { MobileNavbar } from '../components/MobileNavbar';

const NavbarSection = () => (
  <div className="flex flex-row w-full">
    <div className="flex m-4 justify-center">
      <Logo />
    </div>
    <div className="invisible md:visible flex w-full justify-center">
      <DesktopNavbar />
    </div>
    <div className="flex items-center">
      <SearchButton />
    </div>
  </div>
);

const FooterSection = () => {
  return (
    <div className="invisible max-md:visible fixed w-screen bottom-0 justify-center">
      <MobileNavbar />
    </div>
  );
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="flex flex-col">
          <NavbarSection />
          <Main />
          <FooterSection />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
