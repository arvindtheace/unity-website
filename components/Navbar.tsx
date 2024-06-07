import React from 'react';
import { Logo } from './icons';
import Link from 'next/link';
import Button from './Button';
import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';
import AnimatedNavMenu from './AnimatedNavMenu';
import WhatsNew from './WhatsNew';
import { useScrollDirection } from '../hooks/scrollDirection';

const Navbar = ({ color } : { color: string; }) => {
  const [positionVar, setPositionVar] = React.useState<any>([]);
  const pathname = usePathname()
  const scrollDirection = useScrollDirection();

  return (
    <nav id="nav" className='fixed top-0 w-full z-50 px-6 py-4 md:py-6' style={{background: pathname?.startsWith('/business') ? '#080808' : '#FFFEF9', top: scrollDirection=="up"? '0px' : '-90px', transition: "0.3s ease-in-out"}}>
      <div className="md:container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10 xl:space-x-20">
            <Link href="/"><Logo style={color} /></Link>
            <div className="hidden lg:block"><AnimatedNavMenu color={color} /></div>
          </div>
          <div className="flex items-center space-x-4 md:space-x-8">
            <WhatsNew color={color} />
            <div className='lg:hidden'><MobileNav style={color} /></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;