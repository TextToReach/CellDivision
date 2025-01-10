<script lang="ts">
	import Divider from "$lib/divider.svelte";
	import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
</script>
	
<div id="wrapper" class="center flex size-full">
	<div class="flex flex-col items-center gap-4 rounded-lg bg-base-300 p-8">
		<h1 class="text-3xl">Konu Tarama Testi</h1>
		<Divider/>
		<h2 class="flex items-center gap-2 w-full">
			<Fa icon={faStopwatch} class="" />
			50dk
		</h2>

		<div><a href="/quiz" class="btn hover:text-violet-700">Devam Et</a></div>
	</div>
</div>

<style lang="scss">
</style>
