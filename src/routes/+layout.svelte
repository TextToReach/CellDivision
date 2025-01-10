<script lang="ts">
	import '../app.scss';
	import { onNavigate } from "$app/navigation";
	
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

{@render children()}
