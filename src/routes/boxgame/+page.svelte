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

<svelte:head><title>Hücre Bölünmesi - Kutu Oyunu</title></svelte:head>
<div class="scrollbar-hidden flex size-full justify-center overflow-y-scroll">
	<div class="container m-16">

		<div class="boxcard p-1" style="grid-column: span 3;">
			<div class="boxcardchild whitespace-pre-line border-b-2 border-white border-solid">
				Oyunun Kuralları:
					1.	Oyun en az 2 en fazla 4 kişi arasında oynanır.
					2.	Oyun 48 kağıttan oluşur.
					3.	Oyun kağıtları mitoz, mayoz 1 ve mayoz 2'nin evrelerini içerir.
					4.	Her oyuncuya 4 kağıt dağıtılır.
					5.	Yıl, ay, gün sıralamasına göre yaşı küçük olan oyuna başlar. Seçtiği kağıdı bir sonraki arkadaşına verir, oyun başlar.
					6.	Mitoz veya mayozun evrelerini tamamlayan oyunu bitirir. ( profaz, metafaz, anafaz, telofaz - profaz 1, metafaz 1, anafaz 1, telofaz 1 - profaz 2, metafaz 2, anafaz 2 , telofaz 2 )
					7.	Oyun 5 el oynanır. En çok puan toplayan oyunu bitirir. Beraberlik durumunda 2 kişi arasında beraberlik bozulana kadar devam eder.

			</div>
		</div>
		{#each cards as card}
			<div class="tooltip" data-tip={card.replaceAll("cards/Mitoz_", "Mitoz ").replaceAll("cards/", "Mayoz ").replaceAll(".png", "").replaceAll("1", " 1").replaceAll("2", " 2")}>	
				<div class="boxcard p-1 rounded-3xl">
					<div class="boxcardchild aspect-square" style={`background-image: url(${card})`}></div>
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
			.boxcardchild {
				box-sizing: border-box;
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			}
		}
	}
</style>
