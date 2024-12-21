<script lang="ts">
	import { dev } from '$app/environment';
	import {
		faAngleDoubleDown,
		faAngleDoubleLeft,
		faAngleDoubleRight,
		faAngleDoubleUp,
		faChevronLeft,
		faLeftLong
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const keys = Object.keys(import.meta.glob('@/static/models/Mayoz/*.glb')).map((e) =>
		e.replace('/static', '')
	);
	let index = $state(0);
	let src = $state('');

	$effect(() => {
		src = keys.at(index % keys.length)!;
	});
</script>

<div class="flex size-full flex-col bg-black">
	<model-viewer
		{src}
		class="w-full flex-1"
		ar
		camera-controls
		disable-tap
		interaction-prompt={false}
		renderMode="performance"
	>
		<div id="" slot="progress-bar"></div>
	</model-viewer>
	<div class="absolute bottom-0 flex w-full justify-between gap-8 p-4">
		<button
			class="btn h-16 w-16"
			onclick={() => {
				index--;
			}}
		>
			<Fa size={'lg'} icon={faAngleDoubleLeft} />
		</button>
		<div class="flex items-end">
			<div class="rounded-lg bg-white p-4 text-black">
				{String(src.split('/').at(-1)?.split('.')[1]).replaceAll('_', ' ')}
			</div>
		</div>
		<button
			class="btn h-16 w-16"
			onclick={() => {
				index++;
			}}
		>
			<Fa size={'lg'} icon={faAngleDoubleRight} />
		</button>
	</div>

	<a href="/" class="btn btn-square absolute ml-4 mt-4">
		<Fa icon={faChevronLeft} />
	</a>
</div>
