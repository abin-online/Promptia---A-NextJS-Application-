"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const {data : session } = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropDown, settoggleDropDown] = useState(false)
    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setProviders()
    }, [])

    return (
        <div className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">

                <Image
                    src="/assets/images/logo.svg"
                    alt="App Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                />

                <p className="logo_text">Promptia</p>
            </Link>

            {/* {alert(session?.user)} */}
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt"
                            className="black_btn">
                            Create Post
                        </Link>

                        <button type="button" onClick={signOut}
                            className="outline_btn">
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                                src="/assets/icons/profile-icon.png"
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) =>
                            (<button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)
                                }
                                className="black_btn"
                            >
                                Sign In
                            </button>
                            ))}
                    </>
                )}
            </div>
            {/* Mobile Navigation */}

            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex cursor-pointer ">
                        <Image
                            src="/assets/icons/profile-icon.png"
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => { settoggleDropDown((prevState) => !prevState) }}
                        />
                        {toggleDropDown && (
                            <div
                                className={`dropdown absolute right-0 mt-2 w-48 p-4 bg-white border rounded-lg shadow-lg transition-all duration-300 ease-in-out 
                    ${toggleDropDown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                            >
                                <Link
                                    href="/profile"
                                    className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded text-center"
                                    onClick={() => settoggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded text-center"
                                    onClick={() => settoggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        settoggleDropDown(false);
                                        signOut();
                                    }}
                                    className="mt-3 w-full px-4 py-2 text-white bg-black rounded hover:bg-gray-800 text-center"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}


                    </div>) : (<>
                        {providers &&
                            Object.values(providers).map((provider) =>
                            (<button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)
                                }
                                className="black_btn"
                            >
                                Sign In
                            </button>
                            ))}
                    </>)}
            </div>
        </div>
    )
}

export default Nav
