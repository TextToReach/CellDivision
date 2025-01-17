<script lang="ts">
	import { goto } from "$app/navigation";
	import { cn } from "./utils";

	const { unique, className = "", ...properties } = $props();
	const SECONDSBEFOREAUTOSCROLL = 3;
	const AUTOSCROLLINTERVALDURATION = 1.5;
	let containerDiv: HTMLDivElement;
	let slotElement: HTMLSlotElement;
	let lastWheel = 0;
	let autoscroll = $state(false);
	let interval: NodeJS.Timeout | undefined;
	let scrollIndex = $state(0);

	$effect(() => {
		containerDiv = document.querySelector(`div[unique="${unique}"]`)!;
		setInterval(() => {
			if (Date.now() - lastWheel >= SECONDSBEFOREAUTOSCROLL * 1000) {
				autoscroll = true;
				if (!interval) {
					interval = setInterval(() => {
						scrollIndex++
						let children = Array.from(containerDiv.children).filter(e => e instanceof HTMLDivElement)
						let child = children.at(scrollIndex % children.length) as HTMLElement
						let childRect = child.getBoundingClientRect()
						let containerRect = containerDiv.getBoundingClientRect()
						containerDiv.scrollBy({ top: childRect.y - containerRect.y - 4, behavior: "smooth" })
						
					}, AUTOSCROLLINTERVALDURATION * 1000);
				}
			} else {
				autoscroll = false;
				clearInterval(interval);
				interval = undefined;
			}	
		}, 100);
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	{...properties}
	unique={unique}
	class={cn(
		"CardIterator box-border *:relative mx-auto h-[16rem] w-full max-w-96 border-4 border-solid border-transparent -:rounded-[1rem] bg-base-100 transition-all duration-300 hover:border-violet-700 scrollbar-hidden desktop:mx-0",
		className
	)}
	onscroll={() => {
		lastWheel = Date.now();
	}}
>
	<slot name="elements" />
</div>


<style lang="scss">
	.CardIterator {
		scroll-snap-type: y mandatory;
		overflow-y: scroll;
		> :global(div) {
			scroll-snap-align: start;
			height: 100%;
			width: 100%;
		}
	}
</style>
