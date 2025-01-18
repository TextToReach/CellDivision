<script module>
	const MAXTIME = 10 * 60;
</script>

<script lang="ts">
	import { STD } from "$lib";
	import QuizPage from "$lib/QuizPage.svelte";
	import { cn, flyAndScale, min, max } from "$lib/utils";
	import { faWandMagic } from "@fortawesome/free-solid-svg-icons";
	import { Progress, Tooltip } from "bits-ui";
	import Fa from "svelte-fa";
	import type { PageData } from "../$types";

	let { data }: { data: PageData } = $props();
	let index = $state(0);
	let correct_count = $state(0);
	let answered_count = $state(0);
	let value = $state(MAXTIME);

	let questions = new STD.NestedQuestion(
		{ // 1
			Quote: "İnterfazda 4 kromozomu olan hücrenin anafazda kaç kromozomu vardır?",
			CorrectAnswer: "C",
			Options: { A: "2", B: "4", C: "8", D: "16" },
			Image:
				"https://media.istockphoto.com/id/1412962552/tr/foto%C4%9Fraf/a-cell-during-anaphase-astral-microtubules-generate-forces-that-stretch-the-cell-into-an.jpg?s=612x612&w=0&k=20&c=Ro-aLi7inkgx3KNTiEV6jdrUiPgBuToj90oDpwy6JD4="
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
			Quote: "Partenogenez ile üreyen aşağıdaki arılardan hangisi n kromozoma sahiptir?",
			CorrectAnswer: "B",
			Options: {
				A: "İşçi arı",
				B: "Erkek arı",
				C: "Kraliçe arı",
				D: "Asker arı"
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

	setInterval(() => {
		value -= 0.5;
	}, 500);
</script>

<div class="center flex size-full overflow-hidden">
	<main class="flex h-full w-full justify-center bg-black p-4">
		{#key index}
			{#if index < questions.toArray().length}
				<div class="desktop:w-.8 flex w-full flex-col gap-4">
					<Tooltip.Root openDelay={0}>
						<Tooltip.Trigger class="cursor-auto">
							<Progress.Root {value} max={MAXTIME} class="relative h-[16px] w-full overflow-hidden rounded-full bg-base-200">
								<div class={cn(`bg-foreground h-full w-full flex-1 rounded-full transition-all duration-500 ease-in-out`, value > MAXTIME * 0.2 ? "bg-white" : value < MAXTIME * 0.1 ? "bg-red-600" : "bg-red-300")} style={`transform: translateX(-${100 - (100 * (value ?? 0)) / MAXTIME}%)`}></div>
							</Progress.Root>
						</Tooltip.Trigger>
						<Tooltip.Content transition={flyAndScale} transitionConfig={{ y: -16, duration: 150 }} sideOffset={8}>
							<div class="rounded bg-base-100 p-2 text-white">
								{max((value - (value % 60)) / 60, 0)}
								:
								{String(max(Math.floor(value) % 60, 0)).padStart(2, "0")}
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
				{correct_count} / {questions.toArray().length}
			{/if}
		{/key}
	</main>
</div>

<style lang="scss">
	
</style>