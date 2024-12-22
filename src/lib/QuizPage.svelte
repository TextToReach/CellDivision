<script lang="ts">
	import { STD } from "$lib";
	import { onMount, tick } from "svelte";

	let { Question, onFinish, onCorrect, onWrong }: { Question: STD.Question; onFinish?: () => void; onCorrect?: () => void; onWrong?: () => void } = $props();

	function Validate(option: string) {
		return option == Question.CorrectAnswer;
	}

	let finished = $state(false);

	$effect(() => {
		finished = false;
		const buttons = Array.from(document.querySelectorAll("#optionsmenu > button") as unknown as HTMLCollectionOf<HTMLElement> as HTMLCollectionOf<HTMLButtonElement>);

		buttons.map((button) => {
			// button.setAttribute("data-correct", "")
			button.onclick = () => {
				if (Validate(button.getAttribute("data-option")!)) {
					if (onCorrect) onCorrect();
					button.classList.add("!border-green-500");
				} else {
					if (onWrong) onWrong();
					button.classList.add("!border-red-500");
				}
				if (onFinish) onFinish();
				finished = true;
			};
		});
	});
</script>

<div class="flex size-full flex-col justify-between p-4 text-white">
	{#if Question.Image}
		<div class={`text-center font-merri text-2xl font-semibold flex flex-col-reverse desktop:!flex-row`}>
			<div class="flex justify-center desktop:!justify-start items-start"><img class="rounded-lg max-h-52 min-w-52 mobile:max-h-72" src={Question.Image} alt=""/></div>
			<div class="flex flex-1 desktop:justify-center desktop:items-center p-8 !pt-2">{Question.Quote}</div>
		</div>
	{:else}
		<div class="text-center font-merri text-2xl font-semibold">
			{Question.Quote}
		</div>
	{/if}
	<div id="optionsmenu">
		<button data-option="A" disabled={finished} type="button" class="option">
			{Question.Options.A}
		</button>
		<button data-option="B" disabled={finished} type="button" class="option">
			{Question.Options.B}
		</button>
		<button data-option="C" disabled={finished} type="button" class="option">
			{Question.Options.C}
		</button>
		<button data-option="D" disabled={finished} type="button" class="option">
			{Question.Options.D}
		</button>
	</div>
</div>

<style lang="scss">
	#optionsmenu {
		@apply grid grid-cols-2 grid-rows-2 mobile:!flex mobile:*:!flex-1;

		> .option {
			// @apply border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700;

			text-align: center !important;
			display: inline-flex;
			background-color: oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity));
			color: white;
			border-radius: 1rem;
			font-weight: 700;
			align-items: center;
			justify-content: center;
			transition: all 300ms;
			height: 5rem;
			font-size: large;
			border-width: 4px;
			border-color: black;
			border-style: solid;

			&:hover {
				background-color: var(--fallback-b3, oklch(var(--b3) / var(--tw-bg-opacity)));
				transform: scale(1.05);
			}
		}
	}
</style>
