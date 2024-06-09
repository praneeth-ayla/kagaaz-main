// import "../contact-us/style.css";

export default function page() {
	return (
		<div className="overlay h-screen bg-blue-50">
			<section className="max-w-screen-xl mx-auto py-10 px-8 lg:px-10">
				<h2 className="text-4xl xl:text-5xl capitalize text-center text-indigo-900 font-bold">
					Our Team
				</h2>
				<hr className="mx-auto w-12 h-1 outline-0 border-0 bg-green-300 block mt-4 mb-6" />
				<p className="text-center text-xl text-gray-800">
					Our team consists only of the best talents
				</p>

				<div className="  w-full pt-8 ">
					<div className="grid grid-cols-3 gap-20 text-center">
						<Card
							img="https://utfs.io/f/c7745546-1141-4e88-af50-b23265c0f4b4-49zk3z.jpeg"
							name="Praneeth Ayla"
							desc="An undergraduate in his third year, proficient in Full Stack development with expertise in the MERN stack and Next.js, bringing dynamic web solutions to life."
							tag="Full Stack Developer"></Card>
						<Card
							img="https://utfs.io/f/0bffd6ba-d640-4642-8620-0a4fb7f97cdc-itriux.jpg"
							name="Bhargav Pattanayak"
							desc="A third-year undergraduate skilled in the MERN stack, specializing in creating robust and efficient back-end systems to support seamless web experiences.
"
							tag="Backend Developer"></Card>
						<Card
							img="https://utfs.io/f/2ac57ff2-739a-4da2-a92f-a7be15e6ab9c-48uoy7.jpeg"
							name="Saurabh Kumar"
							desc="A third-year undergraduate focusing on front-end
								development and UI/UX design, dedicated to
								crafting intuitive and visually appealing user
								interfaces."
							tag="UI/UX Designer"></Card>
					</div>
				</div>
			</section>
		</div>
	);
}

function Card({
	name,
	tag,
	desc,
	img,
}: {
	name: string;
	tag: string;
	desc: string;
	img: string;
}) {
	return (
		<div className="text-blue-700 hover:scale-105 hover:shadow-xl hover:transition-shadow flex justify-center flex-col  shadow-lg rounded-2xl   bg-blue-50 text-center w-80">
			<img
				src={img}
				className="rounded-t-2xl h-96"
				alt=""
			/>
			<div className="text-2xl font-bold py-2">{name}</div>
			<div className="mb-3 ">{tag}</div>
			<div className="text-black font-light p-3">{desc}</div>
		</div>
	);
}
