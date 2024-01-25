
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition, faHouse, faFilm, faStar, faSearch } from '@fortawesome/free-solid-svg-icons'

function Navbar() : JSX.Element {
  return (
    <nav className='grid grid-cols-nav grid-rows-1 bg-primaryBlue py-6 px-8 text-white'>
        <a className="font-extrabold bg-gradient-to-r from-mainPink to-mainLightBlue text-transparent inline-block bg-clip-text w-fit text-3xl" href='/'>
            watchd
        </a>
        <div className="flex gap-12 items-center justify-center">
            <NavItem icon={faHouse} text='Home' href='/'/>
            <NavItem icon={faFilm} text='Discovery' href='/discover' />
            <NavItem icon={faStar} text='Watchlist' href='/watchlist' />
            <NavItem icon={faSearch} text='Search' href='/search' />
         </div>
         <div className='flex items-center justify-end'>
            <a className='float-right' href="/login">Log in</a>
        </div>
    </nav>
  );
}

type NavItemProps = {
    icon: IconDefinition;
    text: string;
    href: string;
}

function NavItem({icon, text, href}: NavItemProps) {
    return (
        <a className='flex items-center text-white gap-2' href={href}>
            <FontAwesomeIcon icon={icon} className='h-4'/>
            <span>{text}</span>
        </a>
    )
}

export default Navbar;