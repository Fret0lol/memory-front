<script setup lang="ts">
defineProps({
	selected: Boolean,
	finded: Boolean,
});
</script>
<template>
	<div class="card" :class="{selected: selected, finded: finded}">
		<div class="front"></div>
		<div class="back"><slot></slot></div>
	</div>
</template>
<style lang="scss">
.card {
	cursor: pointer;
	border-radius: 4px;
	border: 1px solid #42b883aa;
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	&.selected {
		background-color: #42b883;
		animation: flip-horizontal-bottom 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
		.front {
			opacity: 0;
		}
		.back {
			opacity: 1;
		}
	}
	&.finded {
		background-color: aquamarine;
		.front {
			opacity: 0;
		}
		.back {
			opacity: 1;
		}
	}
	.front {
		opacity: 1;
	}
	.back {
		opacity: 0;
	}
}

@keyframes flip-horizontal-bottom {
	0% {
		-webkit-transform: rotateX(-180deg);
		transform: rotateX(-180deg);
	}
	100% {
		-webkit-transform: rotateX(0);
		transform: rotateX(0);
	}
}
</style>
