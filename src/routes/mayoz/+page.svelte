<script lang="ts">
	import { isNumeric } from "$lib";
	import { faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp, faBars, faBurger, faChevronLeft, faCross, faPause, faPlay, faStop, faTimes } from "@fortawesome/free-solid-svg-icons";
	import fs from "fs";
	import Fa from "svelte-fa";
	import yaml from "yaml";
	import { Howl, Howler } from "howler";
	import { cn } from "@/src/lib/utils";

	const keys = Object.keys(import.meta.glob("@/static/models/Mayoz/*.glb")).map((e) => e.replace("/static", ""));
	const YAMLINDEX = "b";
	let index: number = $state(1 / 4);
	let src = $state("");
	let faz = $state("");
	let sound: Howl = $state(new Howl({src:[""]}));
	let playing = $state(false)
	let drawerVisible = $state(false);

	async function getYaml(): Promise<string> {
		if (sound) sound.pause();
		return String(yaml.parse(await (await fetch("config.yaml")).text())["exp"][`${YAMLINDEX}.${String(src.split("/").at(-1)?.split(".")[0])}`]);
	}

	$effect(() => {

		if (!(faz.replaceAll("İ", "I").split(" ")[0] == "Sitokinez") && !!faz){
			sound = new Howl({
				src: [`/audio/mayozses/${faz.replaceAll("İ", "I")}.m4a`],
			});
		}
		const params = new URLSearchParams(window.location.search);
		if (params.get("tab") && isNumeric(params.get("tab") ?? "") && index === 1 / 4) {
			index = Number(params.get("tab"));
			if (index > 1) index++;
		}
		src = keys.at(index % keys.length)!;
		faz = String(src.split("/").at(-1)?.split(".")[1]).replaceAll("_", " ");
	});
	
	function play(){
		if(sound) sound.play();
		playing = true
	}
	function pause(){
		if(sound) sound.stop();
		playing = false
	}

	function togglePlaying(){
		if(sound.playing()) sound.stop();
		else sound.play();

		playing = sound.playing();
	}

	$effect.pre(() => {
		if (index != 1 / 4) {
			index = Math.floor(index);
		}
	});
</script>

<svelte:head><title>Hücre Bölünmesi - Mayoz Bölünme</title></svelte:head>
<div class="flex size-full">
	<div class="flex size-full flex-col bg-black">
		<model-viewer {src} class="w-full flex-1" ar ar-modes="scene-viewer quick-look" camera-controls disable-tap interaction-prompt={false} renderMode="quality">
			<div id="" slot="progress-bar"></div>
		</model-viewer>
		<div class="relative bottom-0 flex w-full justify-between gap-8 p-4">
			<button
				class="btn h-16 w-16"
				onclick={() => {
					index--;
					pause()
				}}
			>
				<Fa size={"lg"} icon={faAngleDoubleLeft} />
			</button>
			<div class="flex items-end">
				<div class="rounded-lg bg-white p-4 text-black">{faz}</div>
			</div>
			<button
				class="btn h-16 w-16"
				onclick={() => {
					index++;
					pause()
				}}
			>
				<Fa size={"lg"} icon={faAngleDoubleRight} />
			</button>
		</div>
	</div>

	<div class="drawer drawer-end !w-auto desktop:!drawer-open z-[200]">
		<input bind:checked={drawerVisible} id="my-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<label for="my-drawer" class="btn drawer-button !absolute right-0 top-0 mr-4 mt-4 desktop:hidden">
				<Fa icon={faBars} />
			</label>
		</div>
		<div class="drawer-side">
			<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu min-h-full whitespace-pre-wrap bg-base-200 p-4 pt-8 text-base-content"  style="width: min(24rem, 100vw);">
				<div class="relative left-0 top-0 cursor-pointer square-4 flex center p-4 bg-base-200 hover:bg-base-300 rounded-lg transition-all desktop:hidden" onclick={() => {drawerVisible = false; console.log("sa")}}>
					<Fa icon={faTimes}/>
				</div>
				<div class="flex h-8">
					<h4 class="flex-1">{faz.replaceAll("İ", "I")}</h4>
					<div class="divider divider-horizontal"></div>
					<button onclick={() => {
						if(!(faz.replaceAll("İ", "I").split(" ")[0] == "Sitokinez")) {
							togglePlaying()
						}
					}}>
						{#key playing}
							<Fa class="aspect-square h-full rounded-md bg-magnum-600 p-1 text-black transition-transform" icon={(faz.replaceAll("İ", "I").split(" ")[0] == "Sitokinez")? faTimes:(!!sound && sound.playing() ? faPause : faPlay)} />
						{/key}
					</button>
				</div>
				<div class="divider divider-vertical"></div>
				{#key index}
					{#await getYaml() then yamlResult}
						{yamlResult}
					{/await}
				{/key}
			</ul>
		</div>
	</div>
</div>
