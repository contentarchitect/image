(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@contentarchitect/core')) :
	typeof define === 'function' && define.amd ? define(['@contentarchitect/core'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Image = factory(global.core));
}(this, (function (core) { 'use strict';

	//

	var script = {
		props: ['value'],
		components: {
			[core.UiButton.name]: core.UiButton,
		},
		directives: {
			SelectImage: core.SelectImage,
			edit: core.EditDirective,
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
									reject(reader.error.message);
								} else {
									const imageId = parseInt(Math.random() * 100);

									_this.value.images[index].data = { imageId };

									setTimeout(() => {
										resolve(e.target.result);
									}, 2000);
								}
							};
						})
					},
					removeMethod () {
						return new Promise((resolve, reject) => {
							setTimeout(() => {
								resolve();
							}, 2000);
						})
					}
				}
			}
		}
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    const options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    let hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            const originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            const existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	const isOldIE = typeof navigator !== 'undefined' &&
	    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
	function createInjector(context) {
	    return (id, style) => addStyle(id, style);
	}
	let HEAD;
	const styles = {};
	function addStyle(id, css) {
	    const group = isOldIE ? css.media || 'default' : id;
	    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
	    if (!style.ids.has(id)) {
	        style.ids.add(id);
	        let code = css.source;
	        if (css.map) {
	            // https://developer.chrome.com/devtools/docs/javascript-debugging
	            // this makes source maps inside style tags work properly in Chrome
	            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
	            // http://stackoverflow.com/a/26603875
	            code +=
	                '\n/*# sourceMappingURL=data:application/json;base64,' +
	                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
	                    ' */';
	        }
	        if (!style.element) {
	            style.element = document.createElement('style');
	            style.element.type = 'text/css';
	            if (css.media)
	                style.element.setAttribute('media', css.media);
	            if (HEAD === undefined) {
	                HEAD = document.head || document.getElementsByTagName('head')[0];
	            }
	            HEAD.appendChild(style.element);
	        }
	        if ('styleSheet' in style.element) {
	            style.styles.push(code);
	            style.element.styleSheet.cssText = style.styles
	                .filter(Boolean)
	                .join('\n');
	        }
	        else {
	            const index = style.ids.size - 1;
	            const textNode = document.createTextNode(code);
	            const nodes = style.element.childNodes;
	            if (nodes[index])
	                style.element.removeChild(nodes[index]);
	            if (nodes.length)
	                style.element.insertBefore(textNode, nodes[index]);
	            else
	                style.element.appendChild(textNode);
	        }
	    }
	}

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "image-block" },
	    _vm._l(_vm.value.images, function(image, i) {
	      return _c(
	        "figure",
	        {
	          key: i,
	          ref: "figure",
	          refInFor: true,
	          staticClass: "image-block-image"
	        },
	        [
	          _c("img", {
	            directives: [
	              {
	                name: "select-image",
	                rawName:
	                  "v-select-image:[imageSelectSettings(i)].complex.upload",
	                value: { obj: image, exp: "url" },
	                expression: "{ obj: image, exp: 'url' }",
	                arg: _vm.imageSelectSettings(i),
	                modifiers: { complex: true, upload: true }
	              }
	            ],
	            attrs: { src: image.url }
	          }),
	          _vm._v(" "),
	          _c("figcaption", {
	            directives: [
	              {
	                name: "edit",
	                rawName: "v-edit:[captionSettings].complex",
	                value: { obj: _vm.value.images[i], exp: "caption" },
	                expression: "{ obj: value.images[i], exp: 'caption' }",
	                arg: _vm.captionSettings,
	                modifiers: { complex: true }
	              }
	            ]
	          })
	        ]
	      )
	    }),
	    0
	  )
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__ = function (inject) {
	    if (!inject) return
	    inject("data-v-fc709172_0", { source: "\n.image-block {\r\n\tdisplay: flex;\n}\n.image-block > div {\r\n\tflex: 1;\n}\n.image-block > div .image-block-image {\r\n\twidth: 100%;\r\n\tmax-width: 100%;\n}\r\n", map: {"version":3,"sources":["/mnt/d/projects/@contentarchitect/image/src/view.vue"],"names":[],"mappings":";AAwHA;CACA,aAAA;AACA;AAEA;CACA,OAAA;AACA;AAEA;CACA,WAAA;CACA,eAAA;AACA","file":"view.vue","sourcesContent":["<template>\r\n\t<div class=\"image-block\">\r\n\t\t<figure v-for=\"(image, i) in value.images\" :key=\"i\" ref=\"figure\" class=\"image-block-image\">\r\n\t\t\t<!-- <transition name=\"bounce\" mode=\"out-in\">\r\n\t\t\t\t<div key=\"1\" v-if=\"image.url\" class=\"image\">\r\n\t\t\t\t\t<img :src=\"image.url\" style=\"width:100%\">\r\n\r\n\t\t\t\t\t<div class=\"image-overlay\" v-if=\"!image.uploading\">\r\n\t\t\t\t\t\t<ui-button @click=\"removeImage(i)\" square class=\"ui-button--danger remove-button\">\r\n\t\t\t\t\t\t\t✕\r\n\t\t\t\t\t\t</ui-button>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class=\"image-overlay upload-info\" v-if=\"value.constructor.settings.uploadImages\">\r\n\t\t\t\t\t\t<transition\r\n\t\t\t\t\t\t\tmode=\"out-in\"\r\n\t\t\t\t\t\t\tenter-active-class=\"bounce-enter-active hide-after-enter-active\"\r\n\t\t\t\t\t\t\tleave-active-class=\"bounce-leave-active\"\r\n\t\t\t\t\t\t>\r\n\t\t\t\t\t\t\t<div key=\"1\" class=\"three-dot upload-text\" v-if=\"image.uploading\">\r\n\t\t\t\t\t\t\t\tUploading\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div key=\"2\" class=\"sa upload-text upload-success\" v-if=\"image.uploaded\">\r\n\t\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/></svg>\r\n\t\t\t\t\t\t\t\tUploaded\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div key=\"3\" class=\"three-dot upload-text\" v-if=\"image.removing\">\r\n\t\t\t\t\t\t\t\tRemoving\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</transition>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div key=\"2\" v-else class=\"no-image\">\r\n\t\t\t\t\t<div class=\"no-image-border\">\r\n\t\t\t\t\t\t<div v-if=\"value.constructor.settings.uploadImages\">\r\n\t\t\t\t\t\t\t<button @click=\"selectImage(i)\">Select</button> your computer\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"upload-divider\" v-if=\"value.constructor.settings.uploadImages\">\r\n\t\t\t\t\t\t\t<hr />\r\n\t\t\t\t\t\t\t<span>OR</span>\r\n\t\t\t\t\t\t\t<hr />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Image URL\" v-model=\"url\" /><button @click=\"addUrl(i)\">Add</button>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</transition>\r\n\r\n\t\t\t<input type=\"file\" v-show=\"false\" ref=\"imageInput\" @change=\"readURL($event, i)\"> -->\r\n\r\n\t\t\t<img\r\n\t\t\t\t:src=\"image.url\"\r\n\t\t\t\tv-select-image:[imageSelectSettings(i)].complex.upload=\"{ obj: image, exp: 'url' }\"\r\n\t\t\t/>\r\n\r\n\t\t\t<figcaption v-edit:[captionSettings].complex=\"{ obj: value.images[i], exp: 'caption' }\"></figcaption>\r\n\t\t</figure>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\nimport { UiButton, EditDirective, SelectImage } from \"@contentarchitect/core\"\r\n\r\nexport default {\r\n\tprops: ['value'],\r\n\tcomponents: {\r\n\t\t[UiButton.name]: UiButton,\r\n\t},\r\n\tdirectives: {\r\n\t\tSelectImage,\r\n\t\tedit: EditDirective,\r\n\t},\r\n\tdata () {\r\n\t\treturn {\r\n\t\t\tcaptionSettings: {\r\n\t\t\t\tplaceholder: \"Image caption\"\r\n\t\t\t},\r\n\t\t}\r\n\t},\r\n\tmethods: {\r\n\t\timageSelectSettings (index) {\r\n\t\t\tconst _this = this;\r\n\r\n\t\t\treturn  {\r\n\t\t\t\tuploadMethod (imageFile) {\r\n\t\t\t\t\tconst reader = new FileReader();\r\n\t\t\t\t\r\n\t\t\t\t\treturn new Promise((resolve, reject) => {\r\n\t\t\t\t\t\treader.readAsDataURL(imageFile);\r\n\t\t\t\t\t\treader.onload = e => {\r\n\t\t\t\t\t\t\tif (reader.error) {\r\n\t\t\t\t\t\t\t\treject(reader.error.message)\r\n\t\t\t\t\t\t\t} else {\r\n\t\t\t\t\t\t\t\tconst imageId = parseInt(Math.random() * 100)\r\n\r\n\t\t\t\t\t\t\t\t_this.value.images[index].data = { imageId }\r\n\r\n\t\t\t\t\t\t\t\tsetTimeout(() => {\r\n\t\t\t\t\t\t\t\t\tresolve(e.target.result)\r\n\t\t\t\t\t\t\t\t}, 2000)\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t})\r\n\t\t\t\t},\r\n\t\t\t\tremoveMethod () {\r\n\t\t\t\t\treturn new Promise((resolve, reject) => {\r\n\t\t\t\t\t\tsetTimeout(() => {\r\n\t\t\t\t\t\t\tresolve()\r\n\t\t\t\t\t\t}, 2000)\r\n\t\t\t\t\t})\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n</script>\r\n\r\n<style>\r\n.image-block {\r\n\tdisplay: flex;\r\n}\r\n\r\n.image-block > div {\r\n\tflex: 1;\r\n}\r\n\r\n.image-block > div .image-block-image {\r\n\twidth: 100%;\r\n\tmax-width: 100%;\r\n}\r\n</style>"]}, media: undefined });

	  };
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__ = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    createInjector,
	    undefined,
	    undefined
	  );

	//

	var script$1 = {
		components: { CssGrid: core.CssGrid, "v-button": core.Button },
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
					
				this.value.images.pop();
			},
			increaseImagesCount () {
				const newImage = {
					...this.value.constructor.defaultData().images[0]
				};

				this.value.images.push(newImage);
			}
		}
	};

	/* script */
	const __vue_script__$1 = script$1;

	/* template */
	var __vue_render__$1 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("css-grid", { attrs: { columns: ["2fr", "3fr"], gap: "8px" } }, [
	    _c("label", { attrs: { for: "" } }, [_vm._v("Image Count")]),
	    _vm._v(" "),
	    _c(
	      "div",
	      { staticClass: "image-control" },
	      [
	        _c(
	          "v-button",
	          {
	            attrs: { disabled: _vm.value.images.length == 1 },
	            on: { click: _vm.decreaseImagesCount }
	          },
	          [_vm._v("-")]
	        ),
	        _vm._v(" "),
	        _c("span", [_vm._v(_vm._s(_vm.imagesCount))]),
	        _vm._v(" "),
	        _c("v-button", { on: { click: _vm.increaseImagesCount } }, [
	          _vm._v("+")
	        ])
	      ],
	      1
	    )
	  ])
	};
	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$1 = function (inject) {
	    if (!inject) return
	    inject("data-v-03d28bc4_0", { source: "\n.image-control[data-v-03d28bc4] {\r\n\tdisplay: flex;\r\n\talign-items: center;\n}\n.image-control > span[data-v-03d28bc4] {\r\n\tflex: 1;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\n}\r\n", map: {"version":3,"sources":["/mnt/d/projects/@contentarchitect/image/src/settings.vue"],"names":[],"mappings":";AA+CA;CACA,aAAA;CACA,mBAAA;AACA;AAEA;CACA,OAAA;CACA,aAAA;CACA,uBAAA;AACA","file":"settings.vue","sourcesContent":["<template>\r\n  <css-grid :columns=\"['2fr', '3fr']\" gap=\"8px\">\r\n\t<label for=\"\">Image Count</label>\r\n\t<div class=\"image-control\">\r\n\t\t<v-button @click=\"decreaseImagesCount\" :disabled=\"value.images.length == 1\">-</v-button>\r\n\t\t<span>{{imagesCount}}</span>\r\n\t\t<v-button @click=\"increaseImagesCount\">+</v-button>\r\n\t</div>\r\n  </css-grid>\r\n</template>\r\n\r\n<script>\r\nimport { CssGrid, Button } from \"@contentarchitect/core\"\r\n\r\nexport default {\r\n\tcomponents: { CssGrid, \"v-button\": Button },\r\n\tprops: ['value'],\r\n\tdata () {\r\n\t\treturn {\r\n\t\t\temptyImage: { url: null, caption: null },\r\n\t\t}\r\n\t},\r\n\tcomputed: {\r\n\t\timagesCount () {\r\n\t\t\treturn this.value.images.length;\r\n\t\t}\r\n\t},\r\n\tmethods: {\r\n\t\tdecreaseImagesCount () {\r\n\t\t\tif (this.value.images.length == 1) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\t\t\r\n\t\t\tthis.value.images.pop()\r\n\t\t},\r\n\t\tincreaseImagesCount () {\r\n\t\t\tconst newImage = {\r\n\t\t\t\t...this.value.constructor.defaultData().images[0]\r\n\t\t\t}\r\n\r\n\t\t\tthis.value.images.push(newImage);\r\n\t\t}\r\n\t}\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.image-control {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n}\r\n\r\n.image-control > span {\r\n\tflex: 1;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n}\r\n</style>"]}, media: undefined });

	  };
	  /* scoped */
	  const __vue_scope_id__$1 = "data-v-03d28bc4";
	  /* module identifier */
	  const __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$1 = false;
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    false,
	    createInjector,
	    undefined,
	    undefined
	  );

	var icon = { render: function () { var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","height":"24","width":"24"}},[_c('path',{attrs:{"d":"M0 0h24v24H0z","fill":"none"}}),_c('path',{attrs:{"d":"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"}})]) } };

	class Image extends core.Block {
		static get viewComponent () {
			return __vue_component__;
		}

		static get settingsComponent () {
			return __vue_component__$1;
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
				let data = [];
				Object.keys(image.data).forEach(key => {
					data.push(`data-${core.Util.toKebabCase(key)}="${image.data[key]}"`);
				});

				data = data.join(" ");

				str += `<figure><img src="${image.url}" ${data} />`;
				if (image.caption && image.caption !== '') {
					str += `<figcaption>${image.caption}</figcaption>`;
				}
				str += `</figure>`;
			});

			return `<div>${str}</div>`;
		}

		static serializeFromHTML (doc) {
			let obj = { images: [] };

			Array.from(doc.getElementsByTagName("figure")).forEach(fig => {
				const img = fig.getElementsByTagName("img").item(0);
				const url = img.getAttribute("src");

				let caption = fig.getElementsByTagName("figcaption").item(0);
				caption = caption ? caption.innerHTML : "";

				obj.images.push({
					url,
					caption,
					data: { ...img.dataset }
				});
			});
			
			return obj
		}
	}

	return Image;

})));
