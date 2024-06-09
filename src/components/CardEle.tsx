import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { UserPost } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import TimeConverter from "../components/TimeConverter";
import axios from "axios";
import ShareBtn from "../components/ShareBtn";
import { Share } from "lucide-react";

export default function CardEle({ cardDetails }: { cardDetails: UserPost }) {
	async function handleClick() {
		axios.get("/api/post/?postId=" + cardDetails.id);
		window.open(cardDetails.url);
	}
	return (
		<Card className="md:h-64">
			<CardHeader>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-3 ">
						<Avatar className="w-7">
							<AvatarImage
								className="rounded-full"
								src={cardDetails.author?.image ?? undefined}
							/>
							<AvatarFallback>
								{cardDetails.author?.name?.charAt(0) ??
									undefined}
							</AvatarFallback>
						</Avatar>
						<div>{cardDetails.author.name}</div>
					</div>
					<div>
						{TimeConverter(cardDetails.postedOn).slice(0, 17)}
					</div>
				</div>
				<CardTitle
					className="pt-2"
					title={cardDetails.title}>
					{cardDetails.title.length > 80
						? cardDetails.title.slice(0, 80) + "..."
						: cardDetails.title}
				</CardTitle>
			</CardHeader>
			<div className="px-6  flex gap-2 flex-col">
				<CardDescription
					className="text-gray-800 dark:text-gray-300"
					title={cardDetails.description}>
					{cardDetails.description.length > 250
						? cardDetails.description.slice(0, 250) + "..."
						: cardDetails.description}
				</CardDescription>
				<CardDescription className="flex gap-3">
					<span>tags:</span>
					{cardDetails.tags && (
						<div title={cardDetails.tags}>
							{cardDetails.tags.length > 70
								? cardDetails.tags.slice(0, 70) + "..."
								: cardDetails.tags}
						</div>
					)}
				</CardDescription>
				<div className="flex items-center justify-between">
					<div>{cardDetails.views} views</div>
					<div className="flex gap-6 items-center justify-between">
						<Share
							className="hover:cursor-pointer hover:scale-105"
							onClick={() => {
								navigator.clipboard.writeText(cardDetails.url);
							}}></Share>
						<Button
							className=" rounded-lg my-3"
							onClick={() => {
								handleClick();
							}}>
							Show
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}
