<script lang="ts">
	import { isNumeric } from "$lib";
	import { faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp, faBars, faBurger, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
	import fs from "fs";
	import Fa from "svelte-fa";
	import yaml from "yaml";

	const keys = Object.keys(import.meta.glob("@/static/models/Mitoz/*.glb")).map((e) => e.replace("/static", ""));
	const YAMLINDEX = "a";
	let index: number = $state(1/4);
	let src = $state("");

	async function getYaml(): Promise<string> {
		return String(yaml.parse(await (await fetch("config.yaml")).text())["exp"][`${YAMLINDEX}.${String(src.split("/").at(-1)?.split(".")[0])}`]);
	}

	$effect(() => {
		console.log(index)
		const params = new URLSearchParams(window.location.search)
		if(params.get("tab") && isNumeric(params.get("tab") ?? "") && index === 1/4){
			index = Number(params.get("tab"))
			if(index > 1) index ++;
		}
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
				onclick={() => {
					index--;
				}}
			>
				<Fa size={"lg"} icon={faAngleDoubleLeft} />
			</button>
			<div class="flex items-end">
				<div class="rounded-lg bg-white p-4 text-black">{String(src.split("/").at(-1)?.split(".")[1]).replaceAll("_", " ")}</div>
			</div>
			<button
				class="btn h-16 w-16"
				onclick={() => {
					index++;
				}}
			>
				<Fa size={"lg"} icon={faAngleDoubleRight} />
			</button>
		</div>

		<a href="/" class="btn btn-square absolute ml-4 mt-4">
			<Fa icon={faChevronLeft} />
		</a>
	</div>

	<div class="drawer drawer-end !w-auto desktop:drawer-open">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<!-- Page content here -->
			<label for="my-drawer" class="btn drawer-button !absolute right-0 top-0 mr-4 mt-4 desktop:hidden">
				<Fa icon={faBars} />
			</label>
		</div>
		<div class="drawer-side">
			<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu min-h-full w-96 bg-base-200 p-4 text-base-content whitespace-pre-wrap">
				<!-- Sidebar content here -->
				{#key index}
					{#await getYaml() then yamlResult}
						{yamlResult}
					{/await}
				{/key}
			</ul>
		</div>
	</div>
</div>
