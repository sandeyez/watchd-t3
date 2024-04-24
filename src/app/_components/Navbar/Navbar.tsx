import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {type IconDefinition, faHome, faFilm, faStar, faSearch} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import 'server-only'

type NavItemProps = {
    icon: IconDefinition;
    title: string;
    href: string;
};

function NavItem({href, icon, title} : NavItemProps) : JSX.Element {
  return (
    <Link href={href} className='flex gap-3 items-center text-white'>
        <FontAwesomeIcon icon={icon} className='w-4 h-4 '/>
        <span className='font-semibold text-sm'>{title}</span>
    </Link>
  );
}

const navItems: NavItemProps[] = [
    {
        icon: faHome,
        title: 'Home',
        href: '/'
    }, 
    {
        icon: faFilm,
        title: 'Discover',
        href: '/discover'
    }, 
    {
        icon: faStar,
        title: 'Watchlist',
        href: '/watchlist'
    }, 
    {
        icon: faSearch,
        title: 'Search',
        href: '/search'
    }
];

async function Navbar() {
    const session = await getServerAuthSession();

  return (
  <nav className="py-6 px-4 bg-primary grid grid-cols-[1fr_auto_1fr]">
    <Link href='/' className='flex items-center'>
      <Image src='/logo.svg' width={120} height={24} alt="Watchd logo"/>
    </Link>
    <div className="flex justify-center items-center gap-12">
      {
        navItems.map((item, index) => (
          <NavItem key={index} {...item}/>
        ))
      }
    </div>
    <div className='flex items-center justify-end'>
        {
            session ? (
            <Link href="/profile" className="text-white">Profile</Link>
            ) : (
            <Link href="/login" className="text-white">Login</Link>
            )
        }
    </div>
  </nav>
  );
}

export default Navbar;