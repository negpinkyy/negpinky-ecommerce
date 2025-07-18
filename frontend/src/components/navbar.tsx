"use client"
import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/types'
import CartModal from '@/pages/shop/cart-modal'
import { usePathname, useRouter } from "next/navigation"
import { useDispatch } from 'react-redux'
import { images } from '@/assets/images'
import { useLogoutUserMutation } from '@/app/store/features/auth/authapi'

import { logout } from '@/app/store/features/auth/authSlice'
import { useSnackbar } from 'notistack'

// Define proper interfaces 
interface NavigationLink {
  id?: string
  label: string
  href?: string
  ariaLabel?: string
  path?: string
}

// Navigation links configuration
const navigation_links: NavigationLink[] = [
  { 
    id: 'home', 
    label: 'Home', 
    href: '/', 
    ariaLabel: 'Go to home page' 
  },
  { 
    id: 'shop', 
    label: 'Shop', 
    href: '/shop', 
    ariaLabel: 'Browse our shop' 
  },
  { 
    id: 'pages', 
    label: 'Pages', 
    href: '/pages', 
    ariaLabel: 'View all pages' 
  },
  { 
    id: 'contact', 
    label: 'Contact', 
    href: '/contact', 
    ariaLabel: 'Contact us' 
  },
]

// Main navbar component
const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)

    const toggleMobileMenu = () =>{
        setIsMobileOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () =>{
        setIsMobileOpen(false)
    }

    const toggleDropDown = ()=>{
      setIsDropDownOpen(!isDropDownOpen)
    }

    // Show if use is logged in
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const router = useRouter();
    const {user} = useSelector((state: RootState) => state.auth);
    const [logoutUser] = useLogoutUserMutation();

    
    // Admin DropDown

    const adminDropDownMenus: NavigationLink[] = [
{
     label:"Dashboard", path: "/dashboard/admin"
},
{
     label:"Manage Items", path: "/dashboard/manage-products"
},
{
     label:"All Orders", path: "/dashboard/manage-orders"
},
{
     label:"Add New Post", path: "/dashboard/add-new-post"
}
    ]
     const userDropDownMenus: NavigationLink[] = [
{
     label:"Dashboard", path: "/dashboard"
},
{
     label:"Profile", path: "/dashboard/profile"
},
{
     label:"Payments", path: "/dashboard/payments"
},
{
     label:"Orders", path: "/dashboard/orders"
}
    ]

    const dropDownMenus = user?.role ==='admin'?
    [...adminDropDownMenus]  
    :[...userDropDownMenus]

    // 🔥 NEW: Scroll effect hook
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50); // Trigger effect after 50px scroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const products = useSelector((state: RootState) => state.cart.products)
    console.log(products,"products")
    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartToggle = ()=>{
        setIsCartOpen(!isCartOpen)
    }
    const handleLogout = async()=>{
      try {
        await logoutUser().unwrap();
        dispatch(logout())
        enqueueSnackbar("User is Logged out successfully",{variant: "success"})
        router.push('/')
      } catch  {
        enqueueSnackbar("Failed to logout", { variant: "error" });
      }

    }
    
    // 🔥 NEW: Get current pathname for active states
    const pathname = usePathname();

    // 🔥 NEW: Helper function to check if link is active
    const isActiveLink = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
         return pathname ? pathname.startsWith(href) : false;
    };

  return (
    // <MainComponent className='w-full'>
    <>
      <div className="max-w-full">
        {/* 🔥 NEW: Sticky navbar with dynamic glassmorphism */}
        <nav 
          className={`fixed  mx-auto min-w-full lg:px-10 px-4 w-full z-40 transition-all duration-300 ease-in-out ${
            isScrolled 
              ? 'backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg' 
              : 'bg-transparent'
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center w-full justify-between py- px-5  lg:px-18">
            {/* Navigation Links */}
            <ul className="hidden lg:flex items-center gap-6 flex-1" role="menubar">
              {navigation_links.map((link) => (
                <li key={link.id} role="none">
                  <Link 
                    href={link.href ?? '/'}
                    className={`font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 rounded-sm px-3 py-2 relative ${
                      isActiveLink(link.href ?? '/')
                        ? 'text-[var(--primary-color)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--primary-color)] after:rounded-full'
                        : 'text-[var(--text-dark)] hover:text-[var(--primary-color)]'
                    }`}
                    aria-label={link.ariaLabel}
                    aria-current={isActiveLink(link.href ?? '/') ? 'page' : undefined}
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Logo */}
            <div className="flex-shrink-0 lg:mx-8">
              <Link 
                href="/"
                className="text-2xl md:text-3xl font-extrabold font-(family-name:--header-font) text-[var(--text-dark)] hover:text-[var(--primary-color)] transition-colors duration-200 focus:outline-none "
                aria-label="NegPinky home page"
              >
                NegPinky<span className="text-[var(--primary-color)]">.</span>
              </Link>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center lg:gap-8 pr- gap-4 flex-1 justify-end ">
             <span>
              <Link href="/search" className='hover:text-[var(--primary-color)] transition-colors duration-200'>
               <i className="ri-search-line"/>
              </Link>
             </span>
             <span>
             <Button 
             onClick={handleCartToggle}
             variant={'ghost'} className='hover:text-[var(--primary-color)] transition-colors duration-200'>
               <span className="relative">
               <i className="ri-shopping-bag-line"/>
               <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-[var(--primary-color)] text-center">{products.length}</sup>
              </span>
             </Button>
             </span>
             <span>
             {
              user && user ? 
              (
              <>
             <div className="relative">
              
              <Image
                src={user?.profileImage || images.avatar}
                alt={user?.username || "User Avatar"}
                width={24}
                height={24}
                className="rounded-full object-cover size-6"
                onClick={toggleDropDown}
              />
             {
              isDropDownOpen && (
                <>
             
              <div className="bg-white/80 backdrop-blur-xl absolute right-0 mt-3 p-4 w-48 border border-gray-200 rounded-lg shadow-lg z-50">
               <ul className="font-medium space-y-4 p-2">
                { dropDownMenus.map((menu, index)=> (
                  <li 
                  onClick={()=>setIsDropDownOpen(false)}
                  key={index} className="dropdown-items">
                    
                    <Link href={menu.path ?? '/'}>
                    {menu.label}
                    </Link>
                  </li>


                ))}
                <li className="">
                  <button
                  onClick={handleLogout}
                  className='dropdown-items'
                  >Logout</button>
                </li>

               </ul>


              </div>
              </>
              )
             }

          
          
             </div>
              </>
             
              )
               : (
                 <Link href="/login" className='hover:text-[var(--primary-color)] transition-colors duration-200'>
                    <i className="ri-user-line"/>
                 </Link>
               )
             }
             </span>

             {/* Mobile Icons and Menu Toggle */}
            <div className="flex lg:hidden items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:text-[var(--primary-color)] transition-colors duration-200 focus:outline-none  focus:ring-[var(--primary-color)] "
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <i className={`text-xl transition-transform duration-300 ${isMobileMenuOpen ? 'ri-close-line rotate-180' : 'ri-menu-line'}`}/>
              </button>
            </div>
            </div>
          </div>
        </nav>

        {/* 🔥 NEW: Spacer to prevent content from going under fixed navbar */}
        <div className="h-24 lg:h-24"></div>

        {/* Mobile Menu Overlay with Glassmorphism */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 backdrop-blur-md bg-red-300/20 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* 🔥 ENHANCED: Mobile Menu with better glassmorphism and active states */}
        <div className={`fixed top-0 right-0 h-full w-64 backdrop-blur-xl bg-white/90 border-l border-white/30 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/10">
              <h2 className="text-lg font-semibold text-[var(--text-dark)]">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:text-[var(--primary-color)] transition-all duration-200 "
                aria-label="Close mobile menu"
              >
                <i className="ri-close-line text-xl"/>
              </button>
            </div>
            
            {/* Mobile Menu Links with Active States */}
            <div className="flex-1 overflow-y-auto">
              <ul className="py-4">
                {navigation_links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href ?? '/'}
                      className={`block px-6 py-3 mb-2 font-medium backdrop-blur-sm transition-all duration-200 mx-2 rounded-lg relative ${
                        isActiveLink(link.href ?? '/') 
                          ? 'text-[var(--primary-color)] bg-[var(--primary-color)]/10 border-l-4 border-[var(--primary-color)]'
                          : 'text-[var(--text-dark)] hover:text-[var(--primary-color)] hover:bg-white/20'
                      }`}
                      aria-label={link.ariaLabel}
                      aria-current={isActiveLink(link.href ?? '/') ? 'page' : undefined}
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                      {/* 🔥 NEW: Active indicator for mobile */}
                      {isActiveLink(link.href ?? '/') && (
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <i className="ri-check-line text-[var(--primary-color)]"/>
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cart Sidebar */}
      {isCartOpen && 
      <CartModal 
      products={products} 
      isOpen={isCartOpen}
      onClose={handleCartToggle}
      />}

    {/* // </MainComponent> */}
    </>
  )
}

export default Navbar