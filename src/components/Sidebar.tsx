'use client';
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { useState } from 'react';
import { siteConfig } from "../config/site";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { GithubIcon } from "@/components/Icons";
import { Input } from "@heroui/input";

export const Sidebar = () => {


    return (
        <div className="w-64 h-full  p-4">
            <Link href="/">
            <h1  className="flex items-center dark:text-white  text-gray-700 text-2xl font-bold">
                 <span className="i-material-symbols-house  mr-2 text-3xl"></span>
                ホーム
            </h1>
            </Link>
            <h1  className="flex items-center  dark:text-white  text-gray-700 text-2xl font-bold mt-8">
                 チャンネル
            </h1>
            <ul>
                <li className="m-4">
                   <Link href="/worklist/channel/858ae414-21ec-40d8-be6a-012620db8edf/1">
                        <h2  className="flex items-center  dark:text-white  text-gray-700 text-xl font-base">
                            <span className="i-material-symbols-palette  mr-2 text-2xl"></span>
                            #team/graphics/progress
                        </h2>
                    </Link>
                </li>
                <li className="m-4">
                   <Link href="/worklist/channel/8bd9e07a-2c6a-49e6-9961-4f88e83b4918/1">
                        <h2  className="flex items-center  dark:text-white  text-gray-700 text-xl font-base">
                            <span className="i-material-symbols-music-note  mr-2 text-2xl"></span>
                            #team/sound/progress
                        </h2>
                    </Link>
                </li>
                <li className="m-4">
                   <Link href="/worklist/channel/7dc7d0e1-a7b9-4294-ba3e-1149a4c42c718/1">
                        <h2  className="flex items-center  dark:text-white  text-gray-700 text-xl font-base">
                            <span className="i-material-symbols-flag  mr-2 text-2xl"></span>
                            #team/CTF/progress
                        </h2>
                    </Link>
                </li>
                <li className="m-4">
                   <Link href="/worklist/channel/112446e4-a8b5-4618-9813-75f08377ccc5/1">
                        <h2  className="flex items-center  dark:text-white  text-gray-700 text-xl font-base">
                            <span className="i-material-symbols-computer  mr-2 text-2xl"></span>
                            #team/SysAd/progress
                        </h2>
                    </Link>
                </li>
                <li className="m-4">
                   <Link href="/worklist/channel/cde0fe1b-f225-415a-b302-0c7a7ab754e2/1">
                        <h2  className="flex items-center  dark:text-white  text-gray-700 text-xl font-base">
                            <span className="i-material-symbols-stadia-controller  mr-2 text-2xl"></span>
                            #team/Game/progress
                        </h2>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

