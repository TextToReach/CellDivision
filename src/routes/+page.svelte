<script lang="ts">
	import {
		faAngleDoubleDown,
		faAngleDoubleLeft,
		faAngleDoubleRight,
		faAngleDoubleUp,
		faBook,
		faComputer
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Card from '$lib/Card.svelte';
</script>

<div class="flex size-full flex-col overflow-y-scroll no-scrollbar bg-black">
	<nav class="flex min-h-20 justify-between bg-[#171717] px-4 desktop:px-40">
		<div class="center flex select-none font-mono text-2xl font-bold text-white">BioP</div>
		<div class="center flex gap-2">
			<a href="/mitoz" class="btn hover:text-violet-700">Mitoz</a>
			<a href="/mitoz" class="btn hover:text-violet-700">Mayoz</a>
		</div>
		<div class="center hidden gap-2 desktop:flex">
			<div class="tooltip tooltip-bottom" data-tip="Hakkımızda">
				<button class="btn hover:text-violet-700">
					<Fa icon={faBook} class="hover:text-violet-700" />
				</button>
			</div>
			<div class="tooltip tooltip-bottom" data-tip="Tech Stack">
				<button class="btn hover:text-violet-700">
					<Fa icon={faComputer} class="hover:text-violet-700" />
				</button>
			</div>
		</div>
	</nav>
	<main class="center flex flex-1 gap-2">
		<div class="flex gap-2 flex-col">
			<h1 class="text-5xl font-mono flex center my-8">Hücre Bölünmesi</h1>
			<div class="flex flex-col desktop:flex-row gap-4 *:border-4 *:border-solid *:border-black hover:*:border-violet-700 *:transition-all *:duration-300" id="cardWrapper">
				<Card
					To="/mitoz"
					TopImage="mitosis.jpg"
					BottomText="
				Mitoz bölünme; tek hücreli canlılarda üremeyi, çok hücreli canlılarda ise büyümeyi, gelişmeyi ve yenilenmeyi sağlayan yeni hücre oluşturma şeklidir.
				
				Mitoz bölünnme sonucunda birbirinin genetik açıdan kopyası olan 2 yeni hücre oluşur.
				"
				/>
				<Card
					To="/mayoz"
					TopImage="meiosis.jpg"
					BottomText="
				Mayoz bölünme, üreme ana hücrelerinde gerçekleşen ve üreme hücrelerinin oluşumunu sağlayan bir hücre bölünmesidir.
				
				Bu süreçte kromozom sayısı yarıya iner, krossing over ve anafaz ile tür içi çeşitlilik sağlanır. Diploid bir hücreden dört haploid gamet hücresi meydana gelir.
				"
				/>
			</div>
		</div>
	</main>
</div>

<style lang="scss">
	.center {
		align-items: center;
		justify-content: center;
	}
</style>
