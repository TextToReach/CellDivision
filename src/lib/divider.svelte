<script lang="ts">
	let { direction }: { direction?: "H" | "V" } = $props()
</script>

<div class={`divider ${direction=="H"?"divider-horizontal":"divider-vertical"} my-1`}></div>