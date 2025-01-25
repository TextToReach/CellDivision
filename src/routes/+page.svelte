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

	function IndexOfMinimum<T>(arr: T[]) {
		if (arr.length === 0) {
			throw new Error("Array is empty");
		}
		let minIndex = 0;
		for (let i = 1; i < arr.length; i++) {
			if (arr[i] < arr[minIndex]) {
				minIndex = i;
			}
		}
		return minIndex;
	}
	function IndexOfMaximum<T>(arr: T[]) {
		if (arr.length === 0) {
			throw new Error("Array is empty");
		}
		let minIndex = 0;
		for (let i = 1; i < arr.length; i++) {
			if (arr[i] > arr[minIndex]) {
				minIndex = i;
			}
		}
		return minIndex;
	}

	function isNull(object: unknown): object is null {
		return object === null;
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

	const ekip = [
		{ 
			name: "Hamza TEMEL",
			description: "Merhaba ben Hamza. 8 yaşımda blok tabanlı programlama ile yazılıma başladım. Yaklaşık 6 yıldır web geliştirme ile ilgileniyorum. Javascript/Typescript, Rust, C/C++, C#, Go, Zig, Python, Java yazılım dillerini biliyorum. Css ve Tailwindcss bilgim var. Orta düzeyde Linux (Arch) bilgim var. İlişkisel veri tabanlarına (SQL) hakimim. React, Svelte, Vue.JS Javascript frameworklerine hakimim. Blender programını kullanabiliyorum. Godot (C#) ve Unity oyun motorlarına hakimim.",
			imgurl: "/material/Avatar_Hamza.png"
		},
		{ 
			name: "Ege Demirbaş",
			description: "Merhaba Ben Ege Demirbaş, 15 yaşında teknoloji tutkusuyla dolu bir öğrenciyim. Giresun Fen Lisesi'nde 10. sınıfta eğitimimi sürdürürken, bilgisayarlar ve yapay zeka teknolojisine olan ilgimle her gün kendimi geliştirmekten büyük keyif alıyorum. Bilgisayar ekranlarının ardındaki dünya benim için adeta bir oyun alanı; her yeni kod, her yeni keşif beni daha da motive ediyor.",
			imgurl: "/material/Avatar_Ege.jpg"
		},
	];
</script>

<script lang="ts">
	import { faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp, faBook, faComputer } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	import Card from "$lib/Card.svelte";
	import CardIterator from "../lib/CardIterator.svelte";
	import { goto } from "$app/navigation";
	import { createDropdownMenu, melt } from '@melt-ui/svelte'
	import { fly } from "svelte/transition";

	let scrollfield = $state(0);
	const scrollthreshold = 20;
	let canScroll = false;

  const {
    elements: { menu, item, trigger, arrow }
  } = createDropdownMenu({
		
	})

	$effect(() => {
		const scrollable = document.querySelector("#container > main") as HTMLElement;

		scrollable.addEventListener("wheel", (e) => {
			const closestElement = document.elementFromPoint(e.clientX, e.clientY);
			canScroll = isNull(closestElement?.getAttribute("scrollable")) && isNull(closestElement?.getAttribute("scrollee"));
			if (canScroll) e.preventDefault();
		});
		scrollable.addEventListener(
			"wheel",
			throttle((e: WheelEvent) => {
				if (!canScroll) return;
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

<svelte:head><title>Hücre Bölünmesi - Ana Sayfa</title></svelte:head>
<div id="container" class="flex flex-row">
	<nav class="fixed left-0 top-0 z-[999] flex *:flex-1x h-20 w-full justify-center bg-[#171717] px-4 wide:px-40">
		<div class="select-none font-mono text-2xl font-bold text-white center hidden desktop:flex mr-8">BioP</div>
		<div class="flex gap-2 center mx-4">
			<a href="/mitoz" class="btn hover:text-violet-700">Mitoz</a>
			<a href="/mayoz" class="btn hover:text-violet-700">Mayoz</a>

			<button use:melt={$trigger} class="btn hover:text-violet-700">Materyal</button>
			<div use:melt={$menu} class="flex flex-col z-[1000] bg-base-200 p-2 rounded-xl">
				<a href="/quizredirect" class="hover:text-violet-700">Oyun</a>
				<div class="divider divider-vertical !m-0"></div>
				<a href="/song" class="hover:text-violet-700">Şarkı</a>
				<div class="divider divider-vertical !m-0"></div>
				<a href="/boxgame" class="hover:text-violet-700 gap-1">Kutu Oyunu (MAMİ)</a>
				<div class="divider divider-vertical !m-0"></div>
				<a href="/novel" class="hover:text-violet-700">Çizgi Roman</a>
			</div>

		</div>
	</nav>

	<main class="divide-y-2 divide-black overflow-y-scroll bg-base-300 scrollbar-hidden">
		<section class="flex flex-col items-center justify-center gap-4 desktop:gap-0 wide:gap-4 wide:py-16" id="field0">
			<h1 class="text-center [word-spacing:9999px]">Hücre Bölünmesi</h1>
			<div class="inline-grid w-full narrow:grid-cols-2 gap-4 *:max-w-[280px] desktop:aspect-square desktop:w-auto desktop:gap-2 wide:flex wide:!aspect-auto wide:w-full wide:flex-row wide:justify-center" id="cardWrapper">
				<Card Image="mitosis.jpg" To="/mitoz">
					<h6 slot="description" class="mx-4 my-2 flex-1 select-none mobile:my-0">Mitoz</h6>
				</Card>
				<Card Image="meiosis.jpg" To="/mayoz">
					<h6 slot="description" class="mx-4 my-2 flex-1 select-none mobile:my-0">Mayoz</h6>
				</Card>
				<CardIterator unique="0" scrollable className="hidden desktop:block">
					<svelte:fragment slot="elements">
						<div onclick={() => { goto("/mitoz?tab=0") }} data-phase="İnterfaz" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Mitoz_Interfaz.png);"></div>
						<div onclick={() => { goto("/mitoz?tab=1") }} data-phase="Profaz" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Mitoz_Profaz.png);"></div>
						<div onclick={() => { goto("/mitoz?tab=2") }} data-phase="Metafaz" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Mitoz_Metafaz.png);"></div>
						<div onclick={() => { goto("/mitoz?tab=3") }} data-phase="Anafaz" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Mitoz_Anafaz.png);"></div>
						<div onclick={() => { goto("/mitoz?tab=4") }} data-phase="Telofaz" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Mitoz_Telofaz.png);"></div>
					</svelte:fragment>
				</CardIterator>
				<CardIterator unique="1" scrollable className="hidden desktop:block">
					<svelte:fragment slot="elements">
						<div onclick={() => { goto("/mayoz?tab=0") }} data-phase="İnterfaz" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Interfaz.png);"></div>
						<div onclick={() => { goto("/mayoz?tab=1") }} data-phase="Profaz 1" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Profaz1.png);"></div>
						<div onclick={() => { goto("/mayoz?tab=2") }} data-phase="Metafaz 1" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Metafaz1.png);"></div>
						<div onclick={() => { goto("/mayoz?tab=3") }} data-phase="Anafaz 1" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Anafaz1.png);"></div>
						<div onclick={() => { goto("/mayoz?tab=4") }} data-phase="Telofaz 1" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Telofaz1.png);"></div>
						<div onclick={() => { goto("/mayoz?tab=5") }} data-phase="Sitokinez 1" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Sitokinez1.png);"></div>
						<div onclick={() => { goto("/mayoz?tab=6") }} data-phase="Profaz 2" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Profaz2.png);"></div>
						<div onclick={() => { goto("/mayoz?tab=7") }} data-phase="Metafaz 2" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Metafaz2.png);"></div>
						<div onclick={() => { goto("/mayoz?tab=8") }} data-phase="Anafaz 2" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Anafaz2.png);"></div>
						<div onclick={() => { goto("/mayoz?tab=9") }} data-phase="Telofaz 2" scrollee class="bg-contain size-full bg-base-200 cursor-pointer bg-center bg-no-repeat text-center text-white" style="background-image: url(cards/Telofaz2.png);"></div>
					</svelte:fragment>
				</CardIterator>
			</div>
		</section>
		<section class="flex flex-col gap-2 center" id="field1">
			<div class="flex flex-grow-[1.1] items-center justify-center text-center desktop:block desktop:flex-grow-0">
				<h1>Proje Amacımız</h1>
			</div>
			<div class="flex-grow desktop:mx-32 desktop:flex desktop:flex-grow-0 desktop:items-start">
				<h2 class="mx-2 font-sans text-sm desktop:text-base">
					Son yıllarda artırılmış gerçeklik uygulamalarının eğitimde öğrencilerin öğrenme süreçlerini, motivasyonlarını ve kalıcı öğrenmeyi olumlu etkilediği tespit edilmiştir. Bu çalışmada, artırılmış gerçeklik teknolojisinin ortaöğretim 10. sınıf biyoloji dersinde mitoz ve mayoz bölünme konusundaki akademik başarıya etkisi incelenmiştir. Literatürde bu alanda yeterli çalışma olmadığı ve öğrencilerin soyut kavramlar nedeniyle zorlandığı belirtilmiştir. Artırılmış gerçeklik sayesinde soyut kavramların somutlaştırılması, konunun görsel ve dikkat çekici şekilde sunulması hedeflenmiştir. Tasarlanan uygulama, literatürdeki boşluğu doldurmayı ve biyoloji eğitiminde artırılmış gerçeklik kullanımını yaygınlaştırmayı amaçlamaktadır. Ayrıca, konunun web sitesi üzerinden zamandan ve mekandan bağımsız olarak erişilebilir olması, eğlenceli öğrenme süreçleri sunması ve oyunlarla pekiştirilmesi gibi avantajlar sağlanmaktadır.
					<br />
					<br />
					<strong class="contents">
						Bu site 2204-A Lise Öğrencileri Araştırma Projeleri Yarışması için hazırlanan biyoloji alanı kapsamında kurulmuştur.
					</strong>
				</h2>
			</div>
		</section>
		<section class="flex flex-col items-center *:flex-1" id="field2">
			<div class="flex w-max h-full flex-col items-center justify-center gap-4">
				<h1 class="w-screen desktop:w-max">Proje Ekibimiz</h1>
				<div class="divider divider-vertical"></div>
				<div id="ekip" class="flex w-full justify-around gap-x-16 gap-y-4">
					{#each ekip as member, index}
						<div class="flex flex-col">
							<div class="avatar flex flex-col items-center">
								<button class="w-24 rounded-full" onclick={() => (document.getElementById(`member_modal_${index}`) as HTMLDialogElement).showModal()}>
									<img class="rounded-full aspect-square bg-black h-full" src={member.imgurl} />
								</button>
								<dialog id={`member_modal_${index}`} class="modal">
									<div class="modal-box">
										<h3 class="text-lg font-bold">Merhaba! Ben {member.name}</h3>
										<p class="py-4">{member.description}</p>
										<div class="modal-action">
											<form method="dialog">
												<button class="btn">Kapat</button>
											</form>
										</div>
									</div>
								</dialog>
							</div>
							<h4 class="text-center whitespace-nowrap">{member.name}</h4>
						</div>
					{/each}
				</div>
			</div>
		</section>
		
	</main>
</div>

<style lang="scss">

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
</style>
