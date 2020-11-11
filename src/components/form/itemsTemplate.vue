<template>
    <div>


        <!--Заголовок-->
        <template v-if="element.type === 'title'">
            <h4 class="cForm-title">{{element.label}}</h4>
        </template>

        <!--Обычный текст-->
        <template v-if="element.type === 'someText'">
            <p class="cForm-text">{{element.label}}</p>
        </template>


        <!--Обычное поле-->
        <template v-if="element.type === 'input'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <input
                        type="text"
                        :class="element.className"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :placeholder="element.options.placeholder"
                        :style="styleInput"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>


        <!--Числовое поле-->
        <template v-if="element.type === 'number'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <input
                        type="number"
                        :class="element.className"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :placeholder="element.options.placeholder"
                        :min="element.options.min"
                        :max="element.options.max"
                        :step="element.options.step"
                        :style="styleInput"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>


        <template v-if="element.type === 'name'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <input
                        type="text"
                        :class="element.className"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :style="styleInput"
                        :placeholder="element.options.placeholder"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>


        <template v-if="element.type === 'phone'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <input
                        type="tel"
                        :class="element.className"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :style="styleInput"
                        :placeholder="element.options.placeholder"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>


        <template v-if="element.type === 'email'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <input
                        type="email"
                        :class="element.className"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :style="styleInput"
                        :placeholder="element.options.placeholder"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>


        <template v-if="element.type === 'textarea'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <textarea
                        type="textarea"
                        :class="element.className"
                        :name="element.options.name"
                        v-model="element.options.defaultValue"
                        :style="styleInput"
                        :disabled="element.options.disabled"
                        :required="element.options.required"
                        :placeholder="element.options.placeholder"
                ></textarea>
            </label>
        </template>



        <template v-if="element.type === 'checkbox'">
            <label class="cForm_item"
                   v-for="(item, index) in element.options.options"
                   :key="item.value + index"
            >
                <input type="checkbox"
                       v-model="element.options.defaultValue"
                       :name="element.options.name"
                >
                <span>{{element.options.showLabel ? item.label : item.value}}</span>
            </label>
        </template>



        <template v-if="element.type === 'date'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <input
                        type="date"
                        :class="element.style.className"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :style="styleInput"
                        :placeholder="element.options.placeholder"
                        :start-placeholder="element.options.startPlaceholder"
                        :end-placeholder="element.options.endPlaceholder"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                        :editable="element.options.editable"
                >
            </label>
        </template>


        <template v-if="element.type === 'time'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <input
                        type="time"
                        :class="element.style.className"
                        v-model="element.options.defaultValue"
                        :is-range="element.options.isRange"
                        :placeholder="element.options.placeholder"
                        :start-placeholder="element.options.startPlaceholder"
                        :end-placeholder="element.options.endPlaceholder"
                        :readonly="element.options.readonly"
                        :disabled="element.options.disabled"
                        :editable="element.options.editable"
                        :clearable="element.options.clearable"
                        :arrowControl="element.options.arrowControl"
                        :style="styleInput"
                >
            </label>
        </template>


        <template v-if="element.type === 'button'">
            <label class="cForm_item">
                <input
                        type="submit"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :style="{width: element.options.width}"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>



        <!--Выпадающий список-->
        <template v-if="element.type === 'select'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <select
                        :class="element.className"
                        v-model="element.options.defaultValue"
                        :multiple="element.options.multiple"
                        :style="styleInput"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
                    <option
                            v-for="(item, index) in element.options.options"
                            :key="item.value"
                            :value="index > 0 ? item.value : ''"
                            :disabled="index === 0"
                            v-text="element.options.showLabel?item.label:item.value"
                    >
                    </option>
                </select>
            </label>
        </template>



        <template v-if="element.type === 'slider'">
            <label class="cForm_item">
                <div class="cForm_item-text" :style="styleLabel"><p v-text="element.label"></p></div>
                <input
                        type="range"
                        v-model="element.options.defaultValue"
                        :min="element.options.min"
                        :max="element.options.max"
                        :disabled="element.options.disabled"
                        :step="element.options.step"
                        :show-input="element.options.showInput"
                        :range="element.options.range"
                        :style="{width: element.options.width}"
                >
            </label>
        </template>



    </div>
</template>

<script>
    export default {
        props: ["element", "select", "index", "data"],
        computed: {
            styleInput() {
                let config = this.data.config;
                return {
                    width: config.inputWidth,
                    height: config.inputHeight + 'px',
                    backgroundColor: config.inputBgColor,
                    color: config.inputColor,
                    borderRadius: config.inputBorderRadius + 'px',
                    border: `${config.inputBorderWidth}px ${config.inputBorderStyle} ${config.inputBorderColor}`
                }
            },
            styleLabel() {
                let config = this.data.config;
                return {
                    fontWeight: config.labelTitleWeight,
                    fontSize: config.labelTitleSize + 'px',
                    color: config.labelTitleColor

                }
            },
        },
    }
</script>
