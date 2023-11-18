<script lang="ts" setup>
import {Ref, onMounted, ref, watch} from "vue";
import Card from '../components/Card.vue'

const cards: Ref<string[]> = ref([]);
const selectedCards: Ref<number[]> = ref([]);
const foundedCards: Ref<number[]> = ref([]);
const level = 6;

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
		}, 500);
	}
};

onMounted(() => {
	cards.value = generateCards(level);
});

watch(() => level, () => {
  cards.value = generateCards(level)
})
</script>
<template>
	<div class="card-container" :style="{gridTemplateColumns: `repeat(${level}, 1fr)`, gridTemplateRows: `repeat(${level}, 1fr)`}">
		<Card
			v-for="(value, index) in cards"
			:key="index"
			:selected="selectedCards.includes(index)"
			:finded="foundedCards.includes(index)"
			@click="() => selectCard(index)"
		>
			{{ value }}
		</Card>
	</div>
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