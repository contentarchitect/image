<template>
	<div class="image-block">
		<figure v-for="(image, i) in value.images" :key="i" ref="figure" class="image-block-image">
			<!-- <transition name="bounce" mode="out-in">
				<div key="1" v-if="image.url" class="image">
					<img :src="image.url" style="width:100%">

					<div class="image-overlay" v-if="!image.uploading">
						<ui-button @click="removeImage(i)" square class="ui-button--danger remove-button">
							✕
						</ui-button>
					</div>

					<div class="image-overlay upload-info" v-if="value.constructor.settings.uploadImages">
						<transition
							mode="out-in"
							enter-active-class="bounce-enter-active hide-after-enter-active"
							leave-active-class="bounce-leave-active"
						>
							<div key="1" class="three-dot upload-text" v-if="image.uploading">
								Uploading
							</div>
							<div key="2" class="sa upload-text upload-success" v-if="image.uploaded">
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
								Uploaded
							</div>
							<div key="3" class="three-dot upload-text" v-if="image.removing">
								Removing
							</div>
						</transition>
					</div>
				</div>

				<div key="2" v-else class="no-image">
					<div class="no-image-border">
						<div v-if="value.constructor.settings.uploadImages">
							<button @click="selectImage(i)">Select</button> your computer
						</div>
						<div class="upload-divider" v-if="value.constructor.settings.uploadImages">
							<hr />
							<span>OR</span>
							<hr />
						</div>
						<div class="input-group">
							<input type="text" placeholder="Image URL" v-model="url" /><button @click="addUrl(i)">Add</button>
						</div>
					</div>
				</div>
			</transition>

			<input type="file" v-show="false" ref="imageInput" @change="readURL($event, i)"> -->

			<img
				:src="image.url"
				v-select-image:[imageSelectSettings(i)].complex.upload="{ obj: image, exp: 'url' }"
			/>

			<figcaption v-edit:[captionSettings].complex="{ obj: value.images[i], exp: 'caption' }"></figcaption>
		</figure>
	</div>
</template>

<script>
import { UiButton, EditDirective, SelectImage } from "@contentarchitect/core"

export default {
	props: ['value'],
	components: {
		[UiButton.name]: UiButton,
	},
	directives: {
		SelectImage,
		edit: EditDirective,
	},
	data () {
		return {
			captionSettings: {
				placeholder: "Image caption"
			},
		}
	},
	methods: {
		imageSelectSettings (index) {
			const _this = this;

			return  {
				uploadMethod (imageFile) {
					const reader = new FileReader();
				
					return new Promise((resolve, reject) => {
						reader.readAsDataURL(imageFile);
						reader.onload = e => {
							if (reader.error) {
								reject(reader.error.message)
							} else {
								const imageId = parseInt(Math.random() * 100)

								_this.value.images[index].data = { imageId }

								setTimeout(() => {
									resolve(e.target.result)
								}, 2000)
							}
						}
					})
				},
				removeMethod () {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve()
						}, 2000)
					})
				}
			}
		}
	}
}
</script>

<style>
.image-block {
	display: flex;
}

.image-block > div {
	flex: 1;
}

.image-block > div .image-block-image {
	width: 100%;
	max-width: 100%;
}
</style>