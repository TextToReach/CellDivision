<script lang="ts">
	import { goto } from "$app/navigation";

	let { TopImage, BottomText, To }: { TopImage: string; BottomText: string; To: string } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="card card-compact w-full bg-base-100 mobile:w-96 !rounded-[1rem]">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div class="h-[15rem]" role="button" tabindex="-1" style="background-image: url({TopImage});" onclick={() => {goto(To)}}>

	</div>
	<div class="card-body whitespace-pre-line">
		{BottomText.replaceAll('<br>', '\n').trim()}
	</div>
</div>

<style lang="scss">
	.card {
		overflow: hidden; // Needed to hide image corner overflow
		> div:nth-child(1) {
			background-repeat: no-repeat;
			background-size: cover;
		}
	}
</style>
