<script lang="ts">
	import { goto } from "$app/navigation";

	let { Image, To }: { Image: string; To: string } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="Card flex flex-col mx-auto h-[16rem] desktop:mx-0 card card-compact w-full !rounded-[1rem] border-4 border-solid border-transparent bg-base-100 transition-all duration-300 hover:border-violet-700 max-w-96">
	<div
		class="flex-1 bg-center"
		role="button"
		tabindex="-1"
		style="background-image: url({Image});"
		onclick={() => {
			goto(To);
		}}
	></div>
	<div class="card-body flex-grow-0 whitespace-pre-line text-center">
		<slot name="description"></slot>
	</div>
</div>

<style lang="scss">
	.Card {
		overflow: hidden; // Needed to hide image corner overflow
		> div:nth-child(1) {
			background-repeat: no-repeat;
			background-size: cover;
		}
	}
</style>
