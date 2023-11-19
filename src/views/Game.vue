<script lang="ts" setup>
import {Ref, onMounted, ref, watch} from "vue";
import Card from "../components/Card.vue";
import {useGameStore} from "../store/game.store";

const {level} = useGameStore();
const cards: Ref<string[]> = ref([]);
const selectedCards: Ref<number[]> = ref([]);
const foundedCards: Ref<number[]> = ref([]);
const timer: Ref<number> = ref(0);
const allTilesFound: Ref<boolean> = ref(false);
const gameStarted: Ref<boolean> = ref(false);

const emojiArray: string[] = ["😀", "🎉", "💖", "🎩", "🐶", "🐱", "🦄", "🐬", "🌍", "🌛", "🌞", "💫", "🍎", "🍌", "🍓", "🍐", "🍟", "🍿"];

function shuffle(array: string[]): string[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
function generateCards(level: number): string[] {
	let result: string[] = [];
	const size: number = level * level;
	const candidates: string[] = shuffle(emojiArray);
	candidates.length = size / 2;

	result = [...candidates, ...candidates];
	return shuffle(result);
}

const selectCard = (cardIndex: number) => {
	let newSelectedCards: number[] = [];

	if (!gameStarted.value) {
		gameStarted.value = true;
		startTimer();
	}

	if (selectedCards.value.length < 2 && !selectedCards.value.includes(cardIndex)) {
		newSelectedCards = [...selectedCards.value, cardIndex];
		selectedCards.value = newSelectedCards;
	}

	if (newSelectedCards.length === 2) {
		const [card1Index, card2Index] = newSelectedCards;
		const card1 = cards.value[card1Index];
		const card2 = cards.value[card2Index];

		if (card1 === card2) {
			foundedCards.value = [...foundedCards.value, card1Index, card2Index];
		}

		setTimeout(() => {
			selectedCards.value = [];

			if (foundedCards.value.length === cards.value.length) {
				stopTimer();
			}
		}, 500);
	}
};

const startTimer = (): void => {
	const interval = setInterval(() => {
		timer.value++;
	}, 1);

	watch(allTilesFound, () => {
		clearInterval(interval);
	});
};

const stopTimer = (): void => {
	allTilesFound.value = true;
};

const formatTimer = (time: number): string => {
	const minutes = Math.floor(time / 60000);
	const seconds = Math.floor(time / 1000);
	const milliseconds = (time % 1000).toString().padStart(3, "0");
	return `${minutes}:${seconds}.${milliseconds}`;
};

onMounted(() => {
	cards.value = generateCards(level);
});

watch(
	() => level,
	() => {
		cards.value = generateCards(level);
	}
);
</script>
<template>
	<div class="card-container" :style="{gridTemplateColumns: `repeat(${level}, 1fr)`, gridTemplateRows: `repeat(${level}, 1fr)`}">
		<Card
			v-for="(value, index) in cards"
			:key="index"
			:selected="selectedCards.includes(index)"
			:finded="foundedCards.includes(index)"
			@click="!foundedCards.includes(index) ? selectCard(index) : null"
		>
			{{ value }}
		</Card>
	</div>
	<div v-if="!allTilesFound">Timer: {{ formatTimer(timer) }}</div>
	<div v-else>Game Over! You found all tiles in {{ formatTimer(timer) }} seconds.</div>
</template>
<style lang="scss">
.card-container {
	width: 100%;
	height: 100%;
	display: grid;
	gap: 8px;
	user-select: none;
}
</style>
