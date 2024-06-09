import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
	return (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a fruit" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Time</SelectLabel>
					<SelectItem value="time">Time</SelectItem>
					<SelectItem value="views">Views</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
