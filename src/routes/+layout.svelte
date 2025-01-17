<script lang="ts">
	import '../app.scss';
	import { onNavigate } from "$app/navigation";
	import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	
	let { children } = $props();
	
	function delayNavigation() {
		return new Promise((res) => setTimeout(res, 1000));
	}

	onNavigate(async (navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<a href="/" id="backbutton" class="btn btn-square absolute ml-4 mt-4 z-[100]">
	<Fa icon={faChevronLeft} />
</a>

{@render children()}
