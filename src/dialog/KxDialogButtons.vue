<!--
	常用的对话框按钮组，包含确定、取消、应用三个按钮。
	经测试给按钮加图标会导致元素过长，限制布局，故不采用。
 -->
<template>
	<div class='btn-group' :class='$style.container'>
		<KxButton
			v-if='onCancel'
			color='second'
			@click='onCancel'
		>
			取消
		</KxButton>
		<KxButton
			v-if='onAccept'
			:disabled='!acceptable'
			@click='onAccept'
		>
			确定
		</KxButton>
		<KxButton
			v-if='onApply'
			:disabled='!acceptable'
			@click='onApply'
		>
			应用
		</KxButton>
	</div>
</template>

<script setup lang='ts'>
import KxButton from "../input/KxButton.vue";

export interface KxDialogButtonsProps{
	/** 确定和应用按钮是否禁用 */
	acceptable?: boolean;

	/**
	 * 各个按钮的事件，false 则等效于不设置。
	 *
	 * 这些属性可以用 v-on，但要注意其与 v-bind 对表达式的计算处理不同。
	 */
	onCancel?: false | (() => void);
	onApply?: false | (() => void);
	onAccept?: false | (() => void);
}

withDefaults(defineProps<KxDialogButtonsProps>(), {
	acceptable: true, // 默认不是 undefined 而是 false？
});
</script>

<style module lang="less">
.container {
	margin-top: 20px;
	text-align: right;
}
</style>
