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
import { Link } from "@/components/Link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { siteConfig } from "../config/site";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { GithubIcon } from "@/components/Icons";
import { Input } from "@heroui/input";
import { Sidebar } from "./Sidebar";
import {Image} from "@heroui/image";
import { useState } from 'react';
export const Navbar = () => {

	const [query, setQuery] = useState('');

  // フォーム送信時に実行される関数
  const handleSearch = (event) => {
    // 1. ページの再読み込みを防止
    event.preventDefault();

    // 2. 入力値が空でなければ検索処理を実行
    if (query.trim()) {
      console.log(`「${query}」で検索を実行します`);
      // ここにAPIリクエストやページ遷移などの検索ロジックを記述
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<HeroUINavbar
			maxWidth="xl"
			position="sticky"
			isMenuOpen={isMenuOpen} 
			onMenuOpenChange={setIsMenuOpen}
		>	<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
			<NavbarContent
				className="basis-1/5 sm:basis-full"
				justify="start"
			>
				<NavbarBrand
					as="li"
					className="gap-3 max-w-fit"
				>
			

					<Link
						className="flex justify-start items-center gap-1"
						href="/"
					>
						<Image
  src="/logo1.svg"
  alt="Logo"
  className="h-8 w-auto object-contain"
/>
					</Link>
				</NavbarBrand>
			</NavbarContent>


		<NavbarContent as="div" className="items-center" justify="center">
		<form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="作品を検索"
          size="sm"
          startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0" />
        }
          type="search"
		value={query}
        onChange={(e) => setQuery(e.target.value)}
        />

    </form>
		</NavbarContent>

		<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link
						isExternal
						aria-label="Github"
						href={siteConfig.links.github}
					>
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>


			<NavbarContent
				className="sm:hidden basis-1 pl-4"
				justify="end"
			>
				<Link
					isExternal
					aria-label="Github"
					href={siteConfig.links.github}
				>
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				{/* <NavbarMenuToggle /> */}
			</NavbarContent>

			<NavbarMenu>
				<NavbarMenuItem>
					{<Sidebar/>}
				</NavbarMenuItem>
			</NavbarMenu>
		</HeroUINavbar>
	);
};


export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};