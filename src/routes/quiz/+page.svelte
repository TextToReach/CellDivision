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
		{
			Quote: "İnterfazda 4 kromozomu olan hücrenin anafazda kaç kromozomu vardır?",
			CorrectAnswer: "C",
			Options: { A: "2", B: "4", C: "8", D: "16" },
			Image:
				"data:image/jpeg;base64,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"
		},
		{ Quote: "1+2", CorrectAnswer: "C", Options: { A: "1", B: "2", C: "3", D: "4" } },
		{ Quote: "1+3", CorrectAnswer: "D", Options: { A: "1", B: "2", C: "3", D: "4" } },
		{ Quote: "1+4", CorrectAnswer: "D", Options: { A: "2", B: "3", C: "4", D: "5" } },
		{ Quote: "1+5", CorrectAnswer: "B", Options: { A: "5", B: "6", C: "7", D: "8" } }
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