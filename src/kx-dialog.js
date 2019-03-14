import KxDialogContainer from "./components/KxDialogContainer.vue";
import KxBaseDialog from "./components/KxBaseDialog.vue";
import KxContextMenu from "./components/KxContextMenu.vue";
import MessageBox from "./components/KxMessageBox.vue";


export default function (Vue) {
	Vue.component(KxDialogContainer.name, KxDialogContainer);
	Vue.component(KxBaseDialog.name, KxBaseDialog);
	Vue.component(KxContextMenu.name, KxContextMenu);
	Vue.component(MessageBox.name, MessageBox);

	const eventBus = new Vue();

	const commands = {
		eventBus,
		/**
		 * 弹出一个窗口。
		 *
		 * @param component 弹窗组件
		 * @param data 传递给弹窗的数据
		 * @return {Promise<*>} 一个Promise，在窗口关闭后完成，使用then函数来获取窗口的返回值
		 */
		show (component, data = null) {
			return new Promise(resolve => eventBus.$emit("show", { component, data, resolve }));
		},
		/**
		 * 关闭最上层的弹窗，并返回一个结果。
		 *
		 * @param data 返回给调用方的结果。
		 */
		close (data) {
			eventBus.$emit("close", data);
		},

		/** 关闭所有弹窗，该方法不能传递结果 */
		clear () {
			eventBus.$emit("clear");
		},

		/**
		 * 弹出一个简单的消息对话框。
		 *
		 * @param title 消息框的标题，或者一个对象包含了所有参数，如果使用了对象那么
		 *                 后面的参数将无效。
		 * @param content    消息框的内容
		 * @param type 类型，error、warn 或 info（默认）
		 * @param cancelable 是否显示取消按钮和右上角的关闭
		 * @param dimmerClose 点击遮罩是否关闭窗口
		 *
		 * @return Promise<Boolean> 一个Promise，指示了窗口的状态和用户操作的结果，如果接受了true说
		 *                             明用户点击了确定，false则点击了取消、遮罩或关闭按钮。
		 */
		messageBox (title, content, type, cancelable, dimmerClose) {
			if (typeof title === "object") {
				return this.show(MessageBox, title);
			}
			return this.show(MessageBox, { title, content, type, cancelable, dimmerClose });
		},

		contextMenu (component, event, data) {
			this.show(KxContextMenu, { component, event, data });
		},
	};

	// 指令不支持字面量，还得加个引号优点烦。
	Vue.directive("context-menu", {
		bind (el, { arg, value }, vnode) {
			const vm = vnode.context;
			if (typeof value === "string") {
				value = vm.$options.components[value] || value;
			}
			el.addEventListener("contextmenu", event => {
				event.preventDefault();
				commands.contextMenu(value, event, arg && vm[arg]);
			});
		},
	});

	Vue.prototype.$dialog = commands;

	const dialog = new Vue(KxDialogContainer).$mount();
	document.body.appendChild(dialog.$el);
}
