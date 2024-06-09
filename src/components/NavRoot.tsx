"use client";
import Link from "next/link";
import { Menu, Search, UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import UploadPost from "./UploadPost";

interface UserDetails {
	name?: string | null;
	email?: string | null;
	image?: string | null;
}

export default function Navbar() {
	const [userDetails, setUserDetails] = useState<UserDetails>();

	useEffect(() => {
		const getDetails = async () => {
			const session = await getSession();
			setUserDetails(session?.user);
		};
		getDetails();
	}, []);
	const pathname = usePathname();

	function isActive(href: string) {
		return pathname === href ? "text-foreground" : "text-muted-foreground";
	}

	return (
		<div className="flex  w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">
								Toggle navigation menu
							</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<Link
								href="/"
								className="flex items-center gap-2 text-lg font-semibold">
								<span className="text-2xl italic font-extrabold">
									Kaagaz
								</span>
								<span className="sr-only">Kaagaz</span>
							</Link>
							<Link
								href="/home"
								className={`transition-colors hover:text-foreground ${isActive(
									"/home"
								)}`}>
								Home
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-10">
					<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
						<div className="pr-10">
							<Link
								href="/home"
								className="flex items-center gap-2 text-lg font-semibold md:text-base">
								<span className="text-2xl  text-primary  font-extrabold">
									Kaagaz
								</span>
								<span className="sr-only">Kaagaz</span>
							</Link>
						</div>
						<Link
							href="/home"
							className={`transition-colors hover:text-foreground ${isActive(
								"/home"
							)}`}>
							Home
						</Link>
					</nav>
					<div className="ml-auto ">
						<ModeToggle></ModeToggle>
					</div>

					{userDetails ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full">
									<Avatar>
										<AvatarImage
											src={
												userDetails?.image ?? undefined
											}
										/>
										<AvatarFallback>
											{userDetails?.name?.charAt(0) ??
												undefined}
										</AvatarFallback>
									</Avatar>

									<span className="sr-only">
										Toggle user menu
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>
									My Account
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => signOut()}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full">
									<Avatar className="flex items-center justify-center">
										<UserIcon></UserIcon>
									</Avatar>

									<span className="sr-only">
										Toggle user menu
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<Link href={"/login"}>
									<DropdownMenuLabel
										onClick={() => {
											// signIn();
										}}
										className="hover:bg-gray-100 hover:cursor-pointer">
										Login
									</DropdownMenuLabel>
								</Link>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</header>
		</div>
	);
}
