<script module lang="ts">
	function throttle(func: any, cooldownSecs: number) {
		let lastRan = 0;

		return function () {
			if (Date.now() - lastRan > (cooldownSecs * 1000)) {
				//@ts-ignore
				func.apply(this, arguments);
				lastRan = Date.now();
			}
		};
	}
</script>

<script lang="ts">
	import { faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp, faBook, faComputer } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	import Card from "$lib/Card.svelte";

	let scrollfield = $state(0);
	const maxscrollfield = 3;
	const scrollthreshold = 20;

	$effect(() => {
		document.getElementById("scrollable")!.addEventListener(
			"wheel",
			(e) => {
				e.preventDefault();
			}
		);
		document.getElementById("scrollable")!.addEventListener(
			"wheel",
			throttle((e: WheelEvent) => {
				e.preventDefault();
				if (e.deltaY > scrollthreshold) {
					scrollTo("next");
				} else if (e.deltaY < -scrollthreshold) {
					scrollTo("previous");
				}
			}, 1)
		);
	});

	const scrollTo = async (d: "next" | "previous") => {
		const scrolltargets = Array.from(document.querySelectorAll('[id^="field"]')).map((e) => e as HTMLElement);
		if (d == "next") scrollfield++;
		if (d == "previous") scrollfield--;

		const node = scrolltargets.at(scrollfield % scrolltargets.length)!;
		node.scrollIntoView({ behavior: "smooth", block: "start" });
	};
</script>

<div class="no-scrollbar size-full overflow-y-scroll bg-base-300" id="scrollable">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<nav class="absolute left-0 top-0 z-50 flex min-h-20 w-full justify-between bg-[#171717] px-4 desktop:px-40">
		<div class="center flex select-none font-mono text-2xl font-bold text-white">BioP</div>
		<div class="center flex gap-2">
			<a href="/mitoz" class="btn hover:text-violet-700">Mitoz</a>
			<a href="/mayoz" class="btn hover:text-violet-700">Mayoz</a>
			<a href="/quizredirect" class="btn hover:text-violet-700">Quiz</a>
		</div>
		<div class="center hidden gap-2 desktop:flex">
			<div class="tooltip tooltip-bottom" data-tip="Hakkımızda">
				<button class="btn hover:text-violet-700">
					<Fa icon={faBook} class="hover:text-violet-700" />
				</button>
			</div>
			<div class="tooltip tooltip-bottom" data-tip="Tech Stack">
				<a href="/techstack" class="btn hover:text-violet-700">
					<Fa icon={faComputer} class="hover:text-violet-700" />
				</a>
			</div>
		</div>
	</nav>
	<main class="center flex gap-2" id="field0">
		<div class="flex flex-col gap-2">
			<h1>Hücre Bölünmesi</h1>
			<div class="flex flex-col gap-8 *:border-4 *:border-solid *:border-black *:transition-all *:duration-300 hover:*:border-violet-700 desktop:flex-row" id="cardWrapper">
				<Card
					To="/mitoz"
					TopImage="mitosis.jpg"
					BottomText="
				Mitoz Bölünme
				"
				/>
				<Card
					To="/mayoz"
					TopImage="meiosis.jpg"
					BottomText="
				Mayoz Bölünme
				"
				/>
			</div>
		</div>
	</main>
	<main class="center flex flex-col gap-2" id="field1">
		<h1>Proje Amacımız</h1>
		<h2 class="mx-32">
			Son yıllarda eğitim alanında artırılmış gerçeklik uygulamalarının arttığı, bu uygulamaların öğrencilerin öğrenme süreçlerini, derse yönelik motivasyonlarını, tutumlarını, kalıcı öğrenmeyi olumlu yönde etkilediği tespit edilmiştir. Bu çalışmada da artırılmış gerçeklik teknolojisinin,
			ortaöğretim 10. sınıf öğrencilerinde, biyoloji dersinin temel konularından birisi olan mitoz ve mayoz bölünme konusundaki akademik başarıları üzerine olan etkisinin incelenmesi amaçlanmıştır. Artırılmış gerçeklik uygulamalarının ortaöğretim 10. sınıf biyoloji dersi için araştırılıyor olması bu
			çalışmanın ayrıcalıklarındandır. Çünkü ilgili literatür incelendiğinde biyoloji dersinde ortaöğretim düzeyinde artırılmış gerçeklik ile yapılan çalışmaların yeterli olmadığı görülmektedir. Çalışmamızda mitoz ve mayoz bölünme konusunun ele alınmış olmasının sebebi ise il genelinde yapılan
			biyoloji zümre toplantı tutanakları incelenmiştir. Bu tutanaklarda öğrencilerin mitoz ve mayoz bölünme konusunda soyut kavramların çok fazla olması ve görsel öğelerin yetersiz kalmasından dolayı zorlandıkları belirtilmiştir. Bu bağlamda, artırılmış gerçeklik uygulamalarının soyut kavramları
			somut hale getirme özelliğinden dolayı mitoz ve mayoz bölünme konusunun ele alınmış olması bu çalışmayı farklı kılmıştır. Kendi tasarladığımız artırılmış gerçeklik uygulaması ile hazırlanan mitoz ve mayoz bölünme çalışmamız literatürdeki boşluğu doldurmaya yardımcı olacaktır. Yeni yapılacak
			artırılmış gerçeklik uygulamalarının biyoloji eğitiminde kullanımının artmasına katkı sağlayacağı düşünülmektedir. Ayrıca yaptığımız çalışma ile biyoloji konuları kapsamında yer alan soyut olayları somutlaştırma, görsel ve dikkat çekici ögelerin öğrencilere bir web sitesinde sunulması, derste
			etkili ve eğlenceli zamanlar geçirilmesinin sağlanması, konuyu pekiştirecek oyunlarla öğrenme, zamandan ve mekandan bağımsız istediği an web sitesi ile konuya ulaşabilmesi gibi avantajları da bulunmaktadır.
		</h2>
	</main>
	<main class="flex flex-col items-center justify-center gap-4" id="field2">
		<h1>Proje Ekibimiz</h1>
		<div class="flex w-[50%] justify-around gap-8">
			<div class="flex flex-col">
				<div class="avatar">
					<div class="w-24 rounded-full">
						<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
					</div>
				</div>
				<h1 class="text-center">...</h1>
			</div>
			<div class="flex flex-col">
				<div class="avatar">
					<div class="w-24 rounded-full">
						<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
					</div>
				</div>
				<h1 class="text-center">...</h1>
			</div>
			<div class="flex flex-col">
				<div class="avatar">
					<div class="w-24 rounded-full">
						<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
					</div>
				</div>
				<h1 class="text-center">...</h1>
			</div>
		</div>
	</main>
	<main class="flex flex-col items-center justify-center" id="field3">
		<h1>E kitaplık</h1>
	</main>
</div>

<style lang="scss">
	main {
		height: 100vh !important;
	}
	h1 {
		@apply my-8 flex items-center justify-center font-mono text-5xl;
	}
</style>
