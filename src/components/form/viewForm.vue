<template>
    <div class="main__block-form main__block-form-view">
        <p v-if="data.list.length === 0" class="main__block-form-empty">Для создания формы <br>перетащите нужные компоненты <br>из левой в правую колонку</p>
        <form v-else class="cForm-wrapper" :class="data.config.formShadow" :style="styleForm" @submit.prevent>
            <div class="cForm" :class="[data.config.formStyle]">
                <input type="hidden" name="form_name" v-model="data.config.formValue">
                <input type="hidden" name="form_email" v-model="data.config.formEmail">
                <template class="cForm_item-wrapper"  v-for="(element, index) in data.list">
                    <items-template
                            :class="element.classNameLabel ? 'cForm_item-wrapper-title' : 'cForm_item-wrapper ' + data.config.labelInlinePosition"
                            v-if="element && element.key"
                            :key="element.key"
                            :element="element"
                            :index="index"
                            :data="data"
                    >
                    </items-template>
                </template>
            </div>
        </form>
    </div>
</template>


<script>
    import itemsTemplate from "./itemsTemplate";

    export default {
        props: ["element", "select", "index", "data"],
        components: {
            itemsTemplate
        },
        computed: {
            styleForm() {
                let config = this.data.config;
                return {
                    padding: `${config.formPaddingVertical}px ${config.formPaddingHorizontal}px`,
                    backgroundColor: config.formBgColor,
                    borderRadius: `${config.formBorderRadius}px`,
                    border: `${config.formBorderWidth}px ${config.formBorderStyle} ${config.formBorderColor}`,
                }
            }
        },
    }
</script>
