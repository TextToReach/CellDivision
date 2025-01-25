<script module>
	const MAXTIME = 10 * 60;
</script>

<script lang="ts">
	import { STD } from "$lib";
	import QuizPage from "$lib/QuizPage.svelte";
	import { cn, flyAndScale, min, max } from "$lib/utils";
	import { faStar, faStopwatch, faWandMagic } from "@fortawesome/free-solid-svg-icons";
	import { Progress, Tooltip } from "bits-ui";
	import Fa from "svelte-fa";
	import type { PageData } from "../$types";

	let { data }: { data: PageData } = $props();
	let index = $state(0);
	let correct_count = $state(0);
	let answered_count = $state(0);
	let timeleft = $state(MAXTIME);

	let questions = new STD.NestedQuestion(
		{ // 1
			Quote: "İnterfazda 4 kromozomu olan hücrenin anafazda kaç kromozomu vardır?",
			CorrectAnswer: "C",
			Options: { A: "2", B: "4", C: "8", D: "16" },
			Image:
				"/cards/Mitoz_Interfaz.png"
		},
		{ // 2
			Quote: "Görseldeki hücre mitozun hangi evresini göstermektedir?",
			CorrectAnswer: "C",
			Options: { A: "İnterfaz", B: "Profaz", C: "Metafaz", D: "Telofaz" },
			Image: "/material/Picture1.png"
		},
		{ // 3
			Quote: "Mitozda aşağıdaki olaylardan hangisi diğerlerinden sonra gerçekleşir?",
			CorrectAnswer: "D",
			Options: { A: "Çekirdek zarının erimesi", B: "DNA eşlenmesi", C: "Kromozomların ekvatora dizilmesi", D: "Çekirdek zarının yeniden oluşumu" },
		},
		{ // 4
			Quote: "Görseldeki hücrelerden hangileri mayoz 1 geçirmektedir?",
			CorrectAnswer: "A",
			Options: { A: "1-4", B: "3-4", C: "3-4", D: "1-2" },
			Image: "/material/Picture2.png"
		},
		{ // 5
			Quote:
`Mayoz bölünme ile ilgili aşağıdaki olayları sıralayınız.
	1. Homolog kromozomların zıt kutuplara çekilmesi
	2. Parça ve gen alışverişinin olması
	3. Kromatidlerin yoğunlaşarak görünür hale gelmesi
	4. DNA’nın kendini eşlemesi`,
			CorrectAnswer: "B",
			Options: { A: "3-4-2-1", B: "4-3-2-1", C: "4-2-3-1", D: "1-2-3-4" },
		},
		{ // 6
			Quote: "Mayoz'da genetik çeşitlilik hangi evrelerde gerçekleşen olaylarla sağlanır?",
			CorrectAnswer: "D",
			Options: {
				A: "İnterfaz ve Sitokinez",
				B: "Profaz 1 ve Profaz 2",
				C: "Anafaz 1 ve Telofaz",
				D: "Profaz 1 ve Anafaz 1"
			}
		},
		{ // 7
			Quote: "Profaz 1'de gerçekleşen ve genetik çeşitliliğin sağlanmasına yardımcı olan olay hangisidir?",
			CorrectAnswer: "B",
			Options: {
				A: "Sinapsis",
				B: "Krossing Over",
				C: "Karyotip",
				D: "Tetrat"
			}
		},
		{ // 8
			Quote: `Sitoplazması fazla geldiği için bölünmek isteyen bir amip, DNA'sını eşleme aşamasındayken çekirdeği bir yarıda kalacak şekilde ortadan ikiye kesiliyor. Bu olayın sonucunda sitoplazması azalmasına rağmen yine de bölünmeye devam ediyor.
							Bunun sebebi aşağıdakilerden hangisidir?`,
			CorrectAnswer: "C",
			Options: {
				A: "Hacim/yüzey oranının sabit kalması",
				B: "Sitoplazmanın hücreye az gelmesi",
				C: "Bölünme emrinin çoktan verilmiş olması",
				D: "Hücrenin çoğalmak istemesi"
			}
		},
		{ // 9
			Quote:
`Ayşe arkadaşı Ali’ye mayoz bölünmenin özelliklerini anlatırken önündeki deftere şunları yazıyor:
	I. Bölünme başlamadan önce DNA eşlenir.
	II. Profaz evresinde tetratlar oluşur.
	III. Anafaz evresinde homolog kromozomlar ayrılır.
	IV. Metafaz evresinde kromozomlar tek sıra hâlinde hücrenin ekvatoral düzleminde dizilir.
Ali bu özelliklerden bazılarının mitozda da görüldüğünü farkediyor. Ali'nin farkettiği özellikler hangileridir?
`,
			CorrectAnswer: "B",
			Options: {
				A: "2 ve 3",
				B: "1 ve 4",
				C: "1 ve 3",
				D: "3 ve 4"
			}
		},
		{ // 10
			Quote:
`Mayoz bölünmede K hücresinden L hücresi oluşurken;
	I.  crossing over,
	II. kromozom sayısının yarıya düşmesi,
	III. homolog kromozomların ayrılması
Olaylarından hangilerinin gerçekleştiği kesindir?
				`,
			CorrectAnswer: "A",
			Options: {
				A: "1, 2 ve 3",
				B: "1 ve 2",
				C: "1 ve 3",
				D: "2 ve 3"
			},
			Image: "/material/Picture3.png"
		},
		
	);

	const timeupdate = setInterval(() => {
		if(index < questions.toArray().length) timeleft -= 0.5;
	}, 500);
</script>

<svelte:head><title>Hücre Bölünmesi - Oyun</title></svelte:head>
<div class="center flex size-full overflow-hidden">
	<main class="flex h-full w-full justify-center bg-black p-4">
		{#key index}
			{#if index < questions.toArray().length}
			<!-- /*  */  -->
				<div class="desktop:w-.8 flex w-full flex-col gap-4">
					<Tooltip.Root openDelay={0}>
						<Tooltip.Trigger class="cursor-auto">
							<Progress.Root value={timeleft} max={MAXTIME} class="relative h-[16px] w-full overflow-hidden rounded-full bg-base-200">
								<div class={cn(`bg-foreground h-full w-full flex-1 rounded-full transition-all duration-500 ease-in-out`, timeleft > MAXTIME * 0.2 ? "bg-white" : timeleft < MAXTIME * 0.1 ? "bg-red-600" : "bg-red-300")} style={`transform: translateX(-${100 - (100 * (timeleft ?? 0)) / MAXTIME}%)`}></div>
							</Progress.Root>
						</Tooltip.Trigger>
						<Tooltip.Content transition={flyAndScale} transitionConfig={{ y: -16, duration: 150 }} sideOffset={8}>
							<div class="rounded bg-base-100 p-2 text-white">
								{max((timeleft - (timeleft % 60)) / 60, 0)}
								:
								{String(max(Math.floor(timeleft) % 60, 0)).padStart(2, "0")}
							</div>
						</Tooltip.Content>
					</Tooltip.Root>

					<div class="flex-1 rounded-lg bg-base-300">
						<QuizPage
							Question={questions.at(index)!}
							onCorrect={() => {
								correct_count++;
							}}
							onFinish={() => {
								answered_count++;
								setTimeout(() => index++, 1000);
							}}
						/>
					</div>
				</div>
			{:else}
				<div class="size-full flex justify-center items-center">
					<div class="bg-base-200 flex flex-col justify-center rounded-3xl h-max py-24 px-8" style="width: min(100vw, 24rem);">
						<div class="text-center text-3xl">
							<span class="text-green-500">{correct_count}</span>
							<span>/</span>
							<span class="text-gray-600">{questions.toArray().length}</span>
						</div>
						<div class="flex items-center whitespace-pre-wrap">
							<Fa icon={faStopwatch} /> : {max(((MAXTIME - timeleft) - ((MAXTIME - timeleft) % 60)) / 60, 0)}:{String(max(Math.floor((MAXTIME - timeleft)) % 60, 0)).padStart(2, "0")}
						</div>
						<div class="flex items-center whitespace-pre-wrap">
							<Fa icon={faStar} /> : {(timeleft * 10) + (correct_count * 250)} puan
						</div>
						<div class="divider divider-vertical" style="width: initial !important;"></div>
						<div class="w-full flex center">
							<button onclick={() => window.location.reload()} class="btn btn-primary">Tekrar Dene</button>
						</div>
					</div>
				</div>
			{/if}
		{/key}
	</main>
</div>

<style lang="scss">
	
</style>