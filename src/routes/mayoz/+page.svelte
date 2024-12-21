<script lang="ts">
	import { dev } from "$app/environment";
	import { faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa"

	const keys = Object.keys(import.meta.glob("@/static/models/Mayoz/*.glb")).map(e => e.replace("/static", ""))
	let index = $state(0);
	let src = $state("")
	

	$effect(() => {
		src = keys.at(index % keys.length)!;
	})

</script>

<div class="bg-black size-full flex flex-col">
	<model-viewer
		src={src}
		class="flex-1 w-full"
		ar
		camera-controls
		disable-tap
		interaction-prompt={false}
		renderMode="performance"

	>
		<div id="" slot="progress-bar"></div>
	</model-viewer>
	<div class="flex absolute w-full bottom-0 justify-between p-4 gap-8">
		<button class="btn h-16 w-16" onclick={() => {index--}}>
			<Fa size={"lg"} icon={faAngleDoubleLeft}/>
		</button>
		<div class="flex items-end">
			<div class="bg-white text-black p-4 rounded-lg">{String(src.split("/").at(-1)?.split(".")[1]).replaceAll("_", " ")}</div>
		</div>
		<button class="btn h-16 w-16" onclick={() => {index++}}>
			<Fa size={"lg"} icon={faAngleDoubleRight}/>
		</button>
	</div>
</div>
