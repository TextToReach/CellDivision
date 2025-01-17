<script lang="ts">
	const cards = [
		"cards/Mitoz_Interfaz.png",
		"cards/Mitoz_Profaz.png",
		"cards/Mitoz_Metafaz.png",
		"cards/Mitoz_Anafaz.png",
		"cards/Mitoz_Telofaz.png",
		"cards/Interfaz.png",
		"cards/Profaz1.png",
		"cards/Metafaz1.png",
		"cards/Anafaz1.png",
		"cards/Telofaz1.png",
		"cards/Sitokinez1.png",
		"cards/Profaz2.png",
		"cards/Metafaz2.png",
		"cards/Anafaz2.png",
		"cards/Telofaz2.png"
	];
</script>

<div class="scrollbar-hidden flex size-full justify-center overflow-y-scroll">
	<div class="container m-16">
		{#each cards as card}
			<div class="tooltip" data-tip={card.replaceAll("cards/Mitoz_", "Mitoz ").replaceAll("cards/", "Mayoz ").replaceAll(".png", "").replaceAll("1", " 1").replaceAll("2", " 2")}>	
				<div class="boxcard p-1">
					<div class="boxcardchild" style={`background-image: url(${card})`}></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.2rem;

		.boxcard {
			@apply bg-base-100 hover:bg-base-300;
			transition: all 250ms;
			cursor: pointer;
			border-radius: 1.5rem;
			.boxcardchild {
				box-sizing: border-box;
				aspect-ratio: 1;
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			}
		}
	}
</style>
