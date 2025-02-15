import { MdArrowRightAlt } from "react-icons/md"
import Logo from "/logo.png"
import { Link, NavLink } from "react-router-dom"

function Header() {

    const menuList = [
        {
            name: "Events",
            link: "/"
        },
        {
            name: "My Tickets",
            link: "/my-tickets"
        },
        {
            name: "About Project",
            link: "/about-project"
        },
    ]
  return (
    <div className="px-5 lg:px-40 py-5 fixed top-0 left-0 right-0 z-10 backdrop-blur-sm">
        <div className="py-3 border border-[#197686] rounded-3xl px-5 flex justify-between items-center">
            <Link to="/">
                <img src={Logo} alt="logo" />
            </Link>

            <div className="hidden lg:flex gap-5">
                {menuList.map((item, index) => (
                    <NavLink 
                    key={index} 
                    to={item.link} 
                    className={({ isActive }) => isActive ? 'text-[#FFFFFF]' : 'text-[#B3B3B3]'}
                >
                    <h1 className="jeju-font text-[18px]">
                        {item.name}
                    </h1>
                </NavLink>
                
                ))}
            </div>

            <div className="flex items-center gap-2 bg-white text-[#0A0C11] px-5 py-2 rounded-xl">
                <h1 className="text-[16px] jeju-font uppercase text-[#0A0C11]">MY TICKETS</h1>
                <MdArrowRightAlt />
            </div>
        </div>
    </div>
  )
}

export default Header