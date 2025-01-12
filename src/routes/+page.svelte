<script module lang="ts">
	function throttle(func: any, cooldownSecs: number) {
		let lastRan = 0;

		return function () {
			if (Date.now() - lastRan > cooldownSecs * 1000) {
				//@ts-ignore
				func.apply(this, arguments);
				lastRan = Date.now();
			}
		};
	}

	function IndexOfMinimum<T>(arr: T[]) { if (arr.length === 0) { throw new Error("Array is empty"); } let minIndex = 0; for (let i = 1; i < arr.length; i++) { if (arr[i] < arr[minIndex]) { minIndex = i; } } return minIndex; }
	function IndexOfMaximum<T>(arr: T[]) { if (arr.length === 0) { throw new Error("Array is empty"); } let minIndex = 0; for (let i = 1; i < arr.length; i++) { if (arr[i] > arr[minIndex]) { minIndex = i; } } return minIndex; }

	function isNull(object: unknown): object is null {
		return object === null
	}

	function Convert<T>(e: any) {
		return e as T;
	}

	function Closest(point: DOMRect, ...elements: Array<HTMLElement>) {
		let entries = Array<number>(elements.length).fill(0);
		for (const element of elements.entries()) {
			entries[element[0]] = Math.abs(element[1].getBoundingClientRect().y - point.y);
		}
		return elements[IndexOfMinimum(entries)];
	}
</script>

<script lang="ts">
	import { faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp, faBook, faComputer } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	import Card from "$lib/Card.svelte";
	import CardIterator from "../lib/CardIterator.svelte";
	import { goto } from "$app/navigation";

	let scrollfield = $state(0);
	const maxscrollfield = 3;
	const scrollthreshold = 20;
	let canScroll = false;

	$effect(() => {
		const scrollable = document.querySelector("#container > main") as HTMLElement

		scrollable.addEventListener("wheel", (e) => {
			const closestElement = document.elementFromPoint(e.clientX, e.clientY)
			canScroll = (isNull(closestElement?.getAttribute("scrollable")) && isNull(closestElement?.getAttribute("scrollee")))
			if(canScroll) e.preventDefault();
		});
		scrollable.addEventListener(
			"wheel",
			throttle((e: WheelEvent) => {
				if(!canScroll) return;
				if (e.deltaY > scrollthreshold) {
					scrollTo("next");
				} else if (e.deltaY < -scrollthreshold) {
					scrollTo("previous");
				}
			}, 0.5)
		);
	});

	const scrollTo = async (d: "next" | "previous") => {
		const scrolltargets = Array.from(document.querySelectorAll('[id^="field"]')).map((e) => e as HTMLElement);
		if (d == "next") scrollfield++;
		if (d == "previous") scrollfield--;

		const node = scrolltargets.at(scrollfield % scrolltargets.length)!;
		node.scrollIntoView({ behavior: "smooth", block: "start" });
	};
</script>

<div id="container" class="flex flex-row">
	<nav class="fixed left-0 top-0 z-[999] flex h-20 w-full justify-between bg-[#171717] px-4 desktop:px-40">
		<div class="center flex select-none font-mono text-2xl font-bold text-white">BioP</div>
		<div class="center flex gap-2">
			<a href="/mitoz" class="btn hover:text-violet-700">Mitoz</a>
			<a href="/mayoz" class="btn hover:text-violet-700">Mayoz</a>
			<a href="/quizredirect" class="btn hover:text-violet-700">Quiz</a>
		</div>
		<div class="center hidden gap-2 desktop:flex">
			<div class="tooltip tooltip-bottom" data-tip="Hakkımızda">
				<button class="btn hover:text-violet-700">
					<Fa icon={faBook} class="hover:text-violet-700" />
				</button>
			</div>
			<div class="tooltip tooltip-bottom" data-tip="Tech Stack">
				<a href="/techstack" class="btn hover:text-violet-700">
					<Fa icon={faComputer} class="hover:text-violet-700" />
				</a>
			</div>
		</div>
	</nav>

	<main class="divide-y-2 divide-black overflow-y-scroll bg-base-300 scrollbar-hide">
		<section class="flex flex-col justify-center items-center gap-4 desktop:gap-0 wide:gap-4 wide:py-16" id="field0">
			<h1 scrollable class="text-center [word-spacing:9999px]">Hücre Bölünmesi</h1>
			<div class="wide:flex wide:flex-row wide:justify-center desktop:gap-2 desktop:aspect-square wide:!aspect-auto w-full desktop:w-auto wide:w-full *:max-w-[280px] gap-4 inline-grid grid-cols-2" id="cardWrapper">

				<Card Image="mitosis.jpg" To="/mitoz">
					<h6 slot="description" class="select-none flex-1 mx-4 my-2 mobile:my-0">Mitoz</h6>
				</Card>
				<Card Image="meiosis.jpg" To="/mayoz">					
					<h6 slot="description" class="select-none flex-1 mx-4 my-2 mobile:my-0">Mayoz</h6>
				</Card>
				<CardIterator unique="0" scrollable className="hidden desktop:block">
					<svelte:fragment slot="elements">
						<div onclick={() => {goto("/mitoz?tab=0")}} scrollee class="text-white text-center bg-red-700 size-full bg-no-repeat selam bg-center" 		data-image="cards/Mitoz_Interfaz.png">İnterfaz</div>
						<div onclick={() => {goto("/mitoz?tab=1")}} scrollee class="text-white text-center bg-blue-700 size-full bg-no-repeat selam bg-center" 		data-image="cards/Mitoz_Profaz.png">Profaz</div>
						<div onclick={() => {goto("/mitoz?tab=2")}} scrollee class="text-white text-center bg-green-700 size-full bg-no-repeat selam bg-center" 	data-image="cards/Mitoz_Metafaz.png">Metafaz</div>
						<div onclick={() => {goto("/mitoz?tab=3")}} scrollee class="text-white text-center bg-yellow-400 size-full bg-no-repeat selam bg-center" 	data-image="cards/Mitoz_Anafaz.png">Anafaz</div>
						<div onclick={() => {goto("/mitoz?tab=4")}} scrollee class="text-white text-center bg-purple-600 size-full bg-no-repeat selam bg-center" 	data-image="cards/Mitoz_Telofaz.png">Telofaz ve Sitokinez</div>
					</svelte:fragment>
				</CardIterator>
				<CardIterator unique="1" scrollable className="hidden desktop:block">
					<svelte:fragment slot="elements">
						<div onclick={() => {goto("/mayoz?tab=0")}} scrollee class="text-white text-center bg-red-700 size-full bg-no-repeat selam bg-center"		 	data-image="cards/Interfaz.png">İnterfaz</div>
						<div onclick={() => {goto("/mayoz?tab=1")}} scrollee class="text-white text-center bg-blue-700 size-full bg-no-repeat selam bg-center"		data-image="cards/Profaz1.png">Profaz 1</div>
						<div onclick={() => {goto("/mayoz?tab=2")}} scrollee class="text-white text-center bg-green-700 size-full bg-no-repeat selam bg-center"	 	data-image="cards/Metafaz1.png">Metafaz 1</div>
						<div onclick={() => {goto("/mayoz?tab=3")}} scrollee class="text-white text-center bg-yellow-400 size-full bg-no-repeat selam bg-center"	data-image="cards/Anafaz1.png">Anafaz 1</div>
						<div onclick={() => {goto("/mayoz?tab=4")}} scrollee class="text-white text-center bg-purple-600 size-full bg-no-repeat selam bg-center"	data-image="cards/Telofaz1.png">Telofaz 1</div>
						<div onclick={() => {goto("/mayoz?tab=5")}} scrollee class="text-white text-center bg-orange-600 size-full bg-no-repeat selam bg-center"	data-image="cards/Sitokinez1.png">Sitokinez 1</div>
						<div onclick={() => {goto("/mayoz?tab=6")}} scrollee class="text-white text-center bg-blue-700 size-full bg-no-repeat selam bg-center"		data-image="cards/Profaz2.png">Profaz 2</div>
						<div onclick={() => {goto("/mayoz?tab=7")}} scrollee class="text-white text-center bg-green-700 size-full bg-no-repeat selam bg-center"	 	data-image="cards/Metafaz2.png">Metafaz 2</div>
						<div onclick={() => {goto("/mayoz?tab=8")}} scrollee class="text-white text-center bg-yellow-400 size-full bg-no-repeat selam bg-center"	data-image="cards/Anafaz2.png">Anafaz 2</div>
						<div onclick={() => {goto("/mayoz?tab=9")}} scrollee class="text-white text-center bg-purple-600 size-full bg-no-repeat selam bg-center"	data-image="cards/Telofaz2.png">Telofaz 2</div>
					</svelte:fragment>
				</CardIterator>
				

			</div>
		</section>
		<section class="center flex flex-col gap-2" id="field1">
			<div class="flex-grow-[1.1] flex justify-center items-center text-center desktop:block desktop:flex-grow-0">
				<h1>Proje Amacımız</h1>
			</div>
			<div class="flex-grow desktop:flex-grow-0 desktop:flex desktop:items-start desktop:mx-32">
				<h2 class="mx-2 text-sm desktop:text-base font-sans">
					Son yıllarda artırılmış gerçeklik uygulamalarının eğitimde öğrencilerin öğrenme süreçlerini, motivasyonlarını ve kalıcı öğrenmeyi olumlu etkilediği tespit edilmiştir. Bu çalışmada, artırılmış gerçeklik teknolojisinin ortaöğretim 10. sınıf biyoloji dersinde mitoz ve mayoz bölünme konusundaki
					akademik başarıya etkisi incelenmiştir. Literatürde bu alanda yeterli çalışma olmadığı ve öğrencilerin soyut kavramlar nedeniyle zorlandığı belirtilmiştir. Artırılmış gerçeklik sayesinde soyut kavramların somutlaştırılması, konunun görsel ve dikkat çekici şekilde sunulması hedeflenmiştir.
					Tasarlanan uygulama, literatürdeki boşluğu doldurmayı ve biyoloji eğitiminde artırılmış gerçeklik kullanımını yaygınlaştırmayı amaçlamaktadır. Ayrıca, konunun web sitesi üzerinden zamandan ve mekandan bağımsız olarak erişilebilir olması, eğlenceli öğrenme süreçleri sunması ve oyunlarla
					pekiştirilmesi gibi avantajlar sağlanmaktadır.
				</h2>
			</div>
		</section>
		<section class="flex flex-col items-center justify-center gap-4" id="field2">
			<h1>Proje Ekibimiz</h1>
			<div class="flex w-full justify-around gap-8 desktop:w-.5">
				<div class="flex flex-col">
					<div class="avatar">
						<div class="w-24 rounded-full">
							<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
						</div>
					</div>
					<h1 class="text-center">...</h1>
				</div>
				<div class="flex flex-col">
					<div class="avatar">
						<div class="w-24 rounded-full">
							<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
						</div>
					</div>
					<h1 class="text-center">...</h1>
				</div>
				<div class="flex flex-col">
					<div class="avatar">
						<div class="w-24 rounded-full">
							<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
						</div>
					</div>
					<h1 class="text-center">...</h1>
				</div>
			</div>
		</section>
		<section class="flex flex-col items-center justify-center" id="field3">
			<h1>E kitaplık</h1>
		</section>
	</main>
</div>

<style lang="scss">	
	.selam {
		background-size: contain;
	}

	main {
		height: calc(100dvh - 5rem);
	}

	#container {
		height: 100dvh;
		align-items: end;
	}

	section {
		max-height: calc(100dvh - 5rem) !important;
		min-height: calc(100dvh - 5rem) !important;
		scroll-snap-align: center; 
		box-sizing: border-box;
	}

	:is(h1, h2, h3, h4, h5, h6) {
		@apply -:my-8 flex items-center justify-center font-mono;
	}

	h1 {
		@apply text-5xl mobile:text-7xl;
	}

	h2 {
		@apply text-4xl mobile:text-6xl;
	}

	h3 {
		@apply text-3xl mobile:text-5xl;
	}

	h4 {
		@apply text-2xl mobile:text-4xl;
	}

	h5 {
		@apply text-xl mobile:text-3xl;
	}

	h6 {
		@apply text-lg mobile:text-2xl;
	}
</style>
