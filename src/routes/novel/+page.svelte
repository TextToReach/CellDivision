<script lang="ts">
	import { cn } from "$lib/utils";
	import { faJs, faNodeJs } from "@fortawesome/free-brands-svg-icons";
	import { fa1, fa2, fa3, faGear, faGears, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
	import { createTabs, melt } from "@melt-ui/svelte";
	import Fa from "svelte-fa";
	import { cubicInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: "tab-1",
		orientation: "vertical"
	});

	const triggers = [
		{ id: "tab-1", title: fa1 },
		{ id: "tab-2", title: fa2 },
		{ id: "tab-3", title: fa3 }
	];
</script>

<div class="flex flex-col-reverse items-center h-screen">

	<div use:melt={$list} class="flex justify-center fixed bottom-0 w-full rounded-t-xl bg-base-300 overflow-hidden">
		<div class="flex">

			{#each triggers as triggerItem}
				<button use:melt={$trigger(triggerItem.id)} class="trigger relative w-12 h-12 flex center">
					<Fa icon={triggerItem.title}/>
				</button>
			{/each}
		</div>
	</div>
	
	<div class="size-full flex items-center justify-center">
		<div use:melt={$root} class="desktop:mx-16 py-16 overflow-hidden *:rounded-xl size-full">
			<div use:melt={$content("tab-1")} class="size-full bg-black p-5">
				<div class="size-full flex justify-center">
					<img src="/material/Karikatur1.jpeg" class="h-full" alt="">
				</div>
			</div>
			<div use:melt={$content("tab-2")} class="size-full bg-black p-5">
				<div class="size-full flex justify-center">
					<img src="/material/Karikatur2.jpeg" class="h-full" alt="">
				</div>
			</div>
			<div use:melt={$content("tab-3")} class="size-full bg-black p-5">
				<div class="size-full flex justify-center">
					<img src="/material/Karikatur3.jpeg" class="h-full" alt="">
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.trigger {
		&[data-state="active"] {
			background-color: white;
		}
	}
</style>