<template>
  <css-grid :columns="['2fr', '3fr']" gap="8px">
	<label for="">Image Count</label>
	<div class="image-control">
		<v-button @click="decreaseImagesCount" :disabled="value.images.length == 1">-</v-button>
		<span>{{imagesCount}}</span>
		<v-button @click="increaseImagesCount">+</v-button>
	</div>
  </css-grid>
</template>

<script>
import { CssGrid, Button } from "@contentarchitect/editor"

export default {
	components: { CssGrid, "v-button": Button },
	props: ['value'],
	data () {
		return {
			emptyImage: { url: null, caption: null },
		}
	},
	computed: {
		imagesCount () {
			return this.value.images.length;
		}
	},
	methods: {
		decreaseImagesCount () {
			if (this.value.images.length == 1) {
				return;
			}
				
			this.value.images.pop()
		},
		increaseImagesCount () {
			const newImage = {
				...this.value.constructor.defaultData().images[0]
			}

			this.value.images.push(newImage);
		}
	}
}
</script>

<style scoped>
.image-control {
	display: flex;
	align-items: center;
}

.image-control > span {
	flex: 1;
	display: flex;
	justify-content: center;
}
</style>