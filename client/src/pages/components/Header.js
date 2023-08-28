import React from "react";
// import { Dialog} from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
//import { FaShoppingCart } from 'react-icons/Fa'
import { RiShoppingBag3Fill } from "react-icons/ri";

function Header() {
  //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-b-grey-300">
      <nav className="layout flex items-center justify-between p-6 lg:px-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-secondary text-xl font-semibold"
          >
            {/* <FaShoppingCart fontSize={26}/> */}
            <span>PrintMyDTF</span>
          </Link>
        </div>

        <div className="hidden lg:flex">
          <div className="join w-[30rem]">
            <input
              className="input w-full imput-sm input-bordered join-item"
              placeholder="Search"
            />
            <div className="indicator">
              <button className="btn join-item">Search</button>
            </div>
          </div>
        </div>

        {/* <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div> */}

        <div>
          <Link href="/cart">
            <RiShoppingBag3Fill fontSize={30} />
          </Link>
        </div>
      </nav>

      {/* <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          
          <div className="flex items-center justify-end">
            
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog> */}
    </header>
  );
}

export default Header;
