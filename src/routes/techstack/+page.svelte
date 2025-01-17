<script lang="ts">
	import { cn } from "$lib/utils";
	import { faJs, faNodeJs } from "@fortawesome/free-brands-svg-icons";
	import { faGear, faGears, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
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
		{ id: "tab-1", title: faNodeJs },
		{ id: "tab-2", title: faJs },
		{ id: "tab-3", title: faGears }
	];
</script>

<div class="flex items-center size-full">

	<div use:melt={$list} class="flex flex-col w-max rounded-r-xl bg-red-500 overflow-hidden">
		{#each triggers as triggerItem}
		<button use:melt={$trigger(triggerItem.id)} class="trigger relative w-12 h-12 flex center">
			<Fa icon={triggerItem.title}/>
		</button>
		{/each}
	</div>
	
	<div class="size-full flex items-center justify-center">
		<div use:melt={$root} class="flex mx-16 py-16 flex-col overflow-hidden *:rounded-xl size-full">
			<div use:melt={$content("tab-1")} class="grow bg-black p-5">
				<h3>Runtime</h3>
				Projemizde Node.JS runtime kullandık
			</div>
			<div use:melt={$content("tab-2")} class="grow bg-black p-5">2</div>
			<div use:melt={$content("tab-3")} class="grow bg-black p-5">3</div>
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
