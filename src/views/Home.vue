<script lang="ts" setup>
import gsap from "gsap";
import {onMounted} from "vue";

onMounted(() => {
	const rightPart = document.getElementById("right");
	rightPart?.addEventListener("mousemove", (e: MouseEvent) => {		
		gsap.to(".emoji", {
			x: e.clientX - window.innerWidth / 2,
			y: e.clientY,
			duration: 0.3,
			ease: 'power2.out',
			stagger: -0.1,
		});
	});
});
</script>
<template>
	<div id="home">
		<div class="left">
			<header>
				<h1>Memory Game</h1>
			</header>
			<main>
				<RouterLink to="/game">Play</RouterLink>
				<!-- <RouterLink to="/">Multiplayer</RouterLink> -->
			</main>
			<footer>
				<p>All right reserved @2023</p>
				<p>@Fret0lol</p>
			</footer>
		</div>
		<div id="right" class="right">
			<div class="emoji">😀</div>
			<div class="emoji">🎉</div>
			<div class="emoji">💖</div>
			<div class="emoji">🎩</div>
			<div class="emoji">🐶</div>
			<div class="emoji">🐱</div>
			<div class="emoji">🦄</div>
		</div>
	</div>
</template>
<style lang="scss">
#home {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
	.left {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 2.5rem 15%;
		header {
			margin-top: 5rem;
		}
		main {
			display: flex;
			flex-direction: column;
			margin-bottom: 6.75rem;
			a {
				font-size: 3.25rem;
				font-weight: 500;
				letter-spacing: 0.325rem;
				text-transform: uppercase;
				color: #ffffff;
				background-image: linear-gradient(to right, #5fb3a1 0, #5fb3a1 100%);
				background-position: 0 1.2em;
				background-size: 0 100%;
				background-repeat: no-repeat;
				transition: background 0.5s;
				&:hover {
					background-size: 100% 100%;
				}
			}
		}
		footer {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-size: 0.625rem;
			font-weight: 400;
		}
	}
	.right {
		margin: 0;
		width: 100%;
		height: 100%;
		background-color: #5fb3a1;
    cursor: none;
		.emoji {
			font-size: clamp(1rem, -3.308rem + 6.731vw, 2.75rem);
			z-index: 1;
			position: absolute;
			pointer-events: none;
		}
	}
}
@media screen and (max-width: 1024px) {
	.right {
		display: none;
	}
}
// 1024
</style>
