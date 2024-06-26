"use client";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ToS from "@/components/ToS";
import Pp from "@/components/Pp";
import { getSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function DemoCreateAccount() {
	const { toast } = useToast();
	async function handleSignIn(type: string) {
		const res = await signIn(type, { redirect: false });
		if (res?.ok) {
			toast({
				title: "Login SuccessFull",
			});
			window.location.href = "/home";
		} else {
			window.location.href = "/";
		}
	}

	useEffect(() => {
		const getDetails = async () => {
			const session = await getSession();
			if (session?.user) {
				window.location.href = "/home";
			} else {
				window.location.href = "";
			}
		};
		getDetails();
	}, []);

	return (
		<div className="flex items-center justify-center h-screen">
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">
						Welcome to Kaagaz
					</CardTitle>
					<CardDescription>Your Academic Ally</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 ">
					<div className=" gap-6 flex flex-col  ">
						<CardDescription>
							Unlock handwritten notes and collaborative learning
							for academic excellence.
						</CardDescription>
						<Button
							variant="outline"
							onClick={() => handleSignIn("google")}>
							<Icons.google className="mr-2 h-4 w-4" />
							Google
						</Button>
						<Button
							variant="outline"
							onClick={() => handleSignIn("github")}>
							<Icons.gitHub className="mr-2 h-4 w-4" />
							Github
						</Button>
					</div>
					<div className="flex gap-10">
						<ToS></ToS>
						<Pp></Pp>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
