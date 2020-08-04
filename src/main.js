import { Block, Util } from "@contentarchitect/editor"
import view from "./view.vue"
import settings from "./settings.vue"
import icon from "./icon.svg"

export default class Image extends Block {
	static get viewComponent () {
		return view;
	}

	static get settingsComponent () {
		return settings;
	}

	static get icon () {
		return icon;
	}

	static defaultData () {
		return {
			images: [
				{
					url: null,
					caption: null,
					uploading: false,
					uploaded: false,
					removing: false,
					data: {}
				}
			]
		}
	}

	static defaultSettings = {
		uploadImages: false,
		upload: this.upload,
		remove: this.remove
	}

	static upload (image, block) {
		return undefined
	}

	static remove (image, block) {
		return undefined
	}

	toHTML () {
		let str = '';

		this.images.forEach(image => {
			let data = []
			Object.keys(image.data).forEach(key => {
				data.push(`data-${Util.toKebabCase(key)}="${image.data[key]}"`)
			})

			data = data.join(" ")

			str += `<figure><img src="${image.url}" ${data} />`
			if (image.caption && image.caption !== '') {
				str += `<figcaption>${image.caption}</figcaption>`
			}
			str += `</figure>`
		})

		return `<div>${str}</div>`;
	}

	static serializeFromHTML (doc) {
		let obj = { images: [] }

		Array.from(doc.getElementsByTagName("figure")).forEach(fig => {
			const img = fig.getElementsByTagName("img").item(0);
			const url = img.getAttribute("src");

			let caption = fig.getElementsByTagName("figcaption").item(0);
			caption = caption ? caption.innerHTML : ""

			obj.images.push({
				url,
				caption,
				data: { ...img.dataset }
			});
		})
		
		return obj
	}
}