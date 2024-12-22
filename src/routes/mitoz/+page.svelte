<script lang="ts">
	import { faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp, faBars, faBurger, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
	import fs from "fs";
	import Fa from "svelte-fa";
	import yaml from "yaml"

	const keys = Object.keys(import.meta.glob("@/static/models/Mitoz/*.glb")).map((e) => e.replace("/static", ""));
	const YAMLINDEX = "a";
	let index = $state(0);
	let src = $state("");
	
	async function getYaml(): Promise<string> {
		return String(yaml.parse(await (await fetch("mitozkonu.yaml")).text())[`${YAMLINDEX}.${String(src.split("/").at(-1)?.split(".")[0])}`])
	}

	$effect(() => {
		src = keys.at(index % keys.length)!;
	});
</script>

<div class="flex size-full">
	<div class="flex size-full flex-col bg-black">
		<model-viewer {src} class="w-full flex-1" ar camera-controls disable-tap interaction-prompt={false} renderMode="performance">
			<div id="" slot="progress-bar"></div>
		</model-viewer>
		<div class="relative bottom-0 flex w-full justify-between gap-8 p-4">
			<button
				class="btn h-16 w-16"
				onclick={() => {index--}}
			>
				<Fa size={"lg"} icon={faAngleDoubleLeft} />
			</button>
			<div class="flex items-end">
				<div class="rounded-lg bg-white p-4 text-black">{String(src.split("/").at(-1)?.split(".")[1]).replaceAll("_", " ")}</div>
			</div>
			<button
				class="btn h-16 w-16"
				onclick={() => {index++}}
			>
				<Fa size={"lg"} icon={faAngleDoubleRight} />
			</button>
		</div>

		<a href="/" class="btn btn-square absolute ml-4 mt-4">
			<Fa icon={faChevronLeft} />
		</a>
	</div>
	
	<div class="drawer desktop:drawer-open drawer-end !w-auto">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<!-- Page content here -->
			<label for="my-drawer" class="btn drawer-button !absolute top-0 right-0 desktop:hidden mt-4 mr-4">
				<Fa icon={faBars}/>
			</label>
		</div>
		<div class="drawer-side">
			<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
				<!-- Sidebar content here -->
				 {#await getYaml() then yamlResult}
					{yamlResult}
				 {/await}
			</ul>
		</div>
	</div>
</div>
