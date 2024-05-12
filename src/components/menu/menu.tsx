"use client";

import {Fragment, useState, useEffect} from 'react'
import {Dialog, Menu, Transition} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import {ChevronDownIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import { useSession } from "next-auth/react";
import {signOut} from 'next-auth/react';
import '@/app/globals.css';


import {useRouter} from "next/navigation";
import {ModeToggle} from "@/components/theme/themeSwitch";
import Backend from "@/app/api/controllers";

const navigation = [
    {name: 'Dashboard', href: '/dashboard/home', icon: HomeIcon, current: true},
    {name: 'adicionar favorito', href: '/dashboard/favorite/add', icon: PlusIcon, current: false}
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard({children}: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { data: session, status }:any = useSession();
    const [nameUser, setName] = useState('');

    async function setter() {
        const { name } = session ?? {};
        if (name) {
            setName(name)
        }
    }


    useEffect(() => {
        setter();
    }, [nameUser, session]);

    const router = useRouter();

    async function logout() {
        signOut(
            {redirect: false}
        );

        router.replace('/signin');
    }

    function compareActiveURI() {
        const uri = window.location.href
        let url = uri.split('http://localhost:3003');

        navigation.forEach((item) => {
            if (item.href === url[1]) {
                item.current = true
            } else {
                item.current = false;
            }
        });

    }

    useEffect(() => {
        compareActiveURI()
    }, []);


    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div className={'bg-white dark:bg-slate-950'}>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0"/>
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5"
                                                    onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div
                                        className="flex grow flex-col gap-y-5 bg-white dark:bg-slate-950 overflow-y-auto px-6 pb-4">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <img
                                                className="h-10 w-auto"
                                                src="https://w7.pngwing.com/pngs/428/243/png-transparent-retail-video-game-black-friday-discounts-and-allowances-gamestop-supermarket-promotional-duitou-game-text-service.png"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'text-indigo-600'
                                                                            : 'text-gray-700 hover:text-indigo-600',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                                            'h-6 w-6 shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                {/*<li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? 'text-indigo-600 border-indigo-600'
                                        : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>*/}
                                                {/*<li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>*/}
                                            </ul>
                                        </nav>
                                        <ModeToggle/>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div
                    className="hidden lg:fixed bg-white dark:bg-slate-950 lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                className="h-10 w-auto"
                                src="https://w7.pngwing.com/pngs/428/243/png-transparent-retail-video-game-black-friday-discounts-and-allowances-gamestop-supermarket-promotional-duitou-game-text-service.png"
                                alt="Your Company"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'text-indigo-600'
                                                            : 'text-gray-700 hover:text-indigo-600',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    {/* <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>*/}
                                    {/*<ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>*/}
                                </li>
                                {/*<li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>*/}
                            </ul>
                        </nav>
                        <ModeToggle/>
                    </div>
                </div>

                <div className="lg:pl-72 bg-white dark:bg-slate-950">
                    <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-8xl lg:px-8">
                        <div
                            className="flex h-16 items-center bg-white dark:bg-slate-950 gap-x-4 border-b border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
                            <button
                                type="button"
                                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                            </button>

                            {/* Separator */}
                            <div className="h-6 w-px bg-white dark:bg-slate-950 lg:hidden" aria-hidden="true"/>

                            <div
                                className="flex flex-1 lg:w-full bg-white dark:bg-slate-950 gap-x-4 self-stretch lg:gap-x-6">

                                <div className="relative flex flex-1">
                                    <h1></h1>
                                </div>

                                <div className="flex items-center bg-white dark:bg-slate-950 gap-x-4 lg:gap-x-6">

                                    {/* Separator */}
                                    <div className="hidden lg:block lg:h-6 lg:w-px" aria-hidden="true"/>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative">
                                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                            <span className="sr-only">Open user menu</span>
                                            <span className="hidden lg:flex lg:items-center">
                            <span className="ml-4 text-sm font-semibold leading-6" aria-hidden="true">
                              {nameUser}
                            </span>
                        <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                      </span>
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2.5 w-32 bg-white dark:bg-slate-950 origin-top-right rounded-md py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                <Menu.Item>
                                                    <button
                                                        onClick={logout}
                                                        className={classNames(
                                                            'block px-3 py-1 text-sm leading-6'
                                                        )}
                                                    >
                                                        Sair
                                                    </button>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </>
    )

}

/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
