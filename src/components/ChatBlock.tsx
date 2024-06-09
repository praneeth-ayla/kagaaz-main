import { Message } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import TimeConverter from "./TimeConverter";

export default function ChatBlock() {
	const [chats, setChats] = useState<Message[]>([]);

	async function fetchChats() {
		try {
			const res = await axios.get("/api/chats");
			setChats(res.data.chats);
		} catch (error) {
			console.error("Error fetching chats:", error);
		}
	}

	useEffect(() => {
		// Fetch chats initially
		fetchChats();

		// Set up an interval to fetch chats every 5 seconds
		const interval = setInterval(() => {
			fetchChats();
		}, 1000);

		// Clean up the interval on component unmountdd
		return () => clearInterval(interval);
	}, []);

	return (
		<div className=" flex gap-3 flex-col">
			{chats.map((chat) => (
				<Card
					key={chat.id}
					className="p-2">
					<div>
						<div className="flex items-center justify-between font-bold text-sm">
							<div className="flex items-center gap-3">
								<Avatar>
									<AvatarImage
										className="h-6 rounded-full"
										src={chat.author?.image ?? undefined}
									/>
									<AvatarFallback>
										{chat.author.name.charAt(0) ??
											undefined}
									</AvatarFallback>
								</Avatar>
								<div>{chat.author.name}</div>
							</div>
							<div className="font-normal">
								{TimeConverter(chat.postedOn).slice(11, 17)}
							</div>
						</div>

						<CardDescription className="p-2 text-primary">
							{chat.message}
						</CardDescription>
					</div>
				</Card>
			))}
		</div>
	);
}
