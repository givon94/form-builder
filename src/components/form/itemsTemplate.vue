<template>

    <div>

        <!--Заголовок-->
        <template v-if="element.type === 'title'">
            <h4 class="cForm-title" :style="styleText">{{element.label}}</h4>
        </template>

        <!--Обычный текст-->
        <template v-if="element.type === 'someText'">
            <p class="cForm-text" :style="styleText">{{element.label}}</p>
        </template>


        <!--Обычное поле-->
        <template v-if="element.type === 'input'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <input
                        type="text"
                        :class="[element.className, data.config.inputShadowStyle]"
                        v-model="element.options.defaultValue"
                        :name="element.model"
                        :placeholder="element.options.placeholder"
                        :style="styleInput"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>


        <!--Числовое поле-->
        <template v-if="element.type === 'number'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <input
                        type="number"
                        :class="[element.className, data.config.inputShadowStyle]"
                        v-model="element.options.defaultValue"
                        :name="element.model"
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

        <!--Имя-->
        <template v-if="element.type === 'name'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <input
                        type="text"
                        :class="[element.className, data.config.inputShadowStyle]"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :style="styleInput"
                        :placeholder="element.options.placeholder"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>

        <!--Телефон-->
        <template v-if="element.type === 'phone'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <input
                        type="tel"
                        :name="element.options.name"
                        :data-inputmask="element.options.maskValue !== '' ? element.options.maskAttr + element.options.maskValue : ''"
                        :class="[element.className, data.config.inputShadowStyle]"
                        v-model="element.options.defaultValue"
                        :style="styleInput"
                        :placeholder="element.options.placeholder"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>


        <!--Email-->
        <template v-if="element.type === 'email'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <input
                        type="email"
                        :class="[element.className, data.config.inputShadowStyle]"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :style="styleInput"
                        :placeholder="element.options.placeholder"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>

        <!--Сообщение-->
        <template v-if="element.type === 'textarea'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <textarea
                        type="textarea"
                        :class="[element.className, data.config.inputShadowStyle]"
                        :name="element.model"
                        v-model="element.options.defaultValue"
                        :style="[styleInput, styleTextarea]"
                        :disabled="element.options.disabled"
                        :required="element.options.required"
                        :placeholder="element.options.placeholder"
                ></textarea>
            </label>
        </template>


        <!--Чекбокс-->
        <template v-if="element.type === 'checkbox'">
            <div class="cForm_item cForm_item-checkbox" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <div class="cForm_item-checkbox" :class="element.options.inline ? 'cForm_item-checkbox-column' : 'cForm_item-checkbox-row'">
                    <label
                            class="cForm_item-checkbox-list"
                            v-for="(item, index) in element.options.options"
                            :key="item.value + index"
                    >
                        <input
                                type="checkbox"
                                :name="element.options.options.length > 1 ? element.model + '[]' : element.model"
                                :value="element.options.showLabel ? item.value : item.label"
                        >
                        <span>{{element.options.showLabel ? item.label : item.value}}</span>
                    </label>
                </div>
            </div>
        </template>


        <!--Радио кнопка-->
        <template v-if="element.type === 'radio'">
            <div class="cForm_item cForm_item-radio" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <div class="cForm_item-radio" :class="element.options.inline ? 'cForm_item-radio-column' : 'cForm_item-radio-row'">
                    <label
                            class="cForm_item-radio-list"
                            v-for="(item, index) in element.options.options"
                            :key="item.value + index"
                    >
                        <input
                                type="radio"
                                :name="element.model"
                                :checked="index === 0"
                                :value="element.options.showLabel ? item.value : item.label"
                        >
                        <span>{{element.options.showLabel ? item.label : item.value}}</span>
                    </label>
                </div>
            </div>
        </template>


        <!--Дата-->
        <template v-if="element.type === 'date'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <input
                        type="date"
                        :name="element.model"
                        :class="[element.className, data.config.inputShadowStyle]"
                        v-model="element.options.defaultValue"
                        :placeholder="element.options.placeholder"
                        :style="styleInput"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>

        <!--Время-->
        <template v-if="element.type === 'time'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>

                <input
                        type="time"
                        :name="element.model"
                        :class="[element.className, data.config.inputShadowStyle]"
                        v-model="element.options.defaultValue"
                        :placeholder="element.options.placeholder"
                        :style="styleInput"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
            </label>
        </template>


        <!--Кнопка-->
        <template v-if="element.type === 'button'">
            <label class="cForm_item" :style="styleLabelBlock" :class="data.config.buttonPosition">
                <button
                        class="cForm_item-btn"
                        :class="data.config.buttonAnimation ? 'shine' : ''"
                        :style="styleButton"
                        :disabled="element.options.disabled"
                >
                {{ element.options.defaultValue }}
                </button>
            </label>
        </template>


        <!--Выпадающий список-->
        <template v-if="element.type === 'select'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>
                <select
                        :class="[element.className, data.config.inputShadowStyle]"
                        v-model="element.options.defaultValue"
                        :multiple="element.options.multiple"
                        :style="styleInput"
                        :required="element.options.required"
                        :disabled="element.options.disabled"
                >
                    <option
                            v-for="(item, index) in element.options.options"
                            :key="item.value"
                            :value="item.value"
                            :disabled="index === 0 ? 'disabled' : null"
                            v-text="element.options.showLabel ? item.label : item.value"
                    >
                    </option>
                </select>
            </label>
        </template>


        <!--Слайдер-->
        <template v-if="element.type === 'slider'">
            <label class="cForm_item" :style="styleLabelBlock">
                <div class="cForm_item-text" v-if="data.config.addLabelTitle" :style="styleLabel">
                    <p>{{ element.label }}<span v-if="element.options.required"> *</span></p>
                </div>
                <input
                        type="range"
                        v-model="element.options.defaultValue"
                        :min="element.options.min"
                        :max="element.options.max"
                        :disabled="element.options.disabled"
                        :step="element.options.step"
                        :style="{width: element.options.width}"
                >
            </label>
        </template>



    </div>
</template>



<script>

    export default {
        props: ["element", "select", "index", "data"],
        data() {
            return {
                validator: {
                    type: null,
                    required: null,
                    pattern: null,
                    range: null,
                    length: null,
                }
            };
        },
        // methods: {
        //     nameInput(el) {
        //         let item = el;
        //         if(Object.keys(item.options).indexOf('name') >= 0) {
        //             return item.options.name;
        //         } else {
        //             return item.model;
        //         }
        //     },
        // },
        computed: {
            styleInput() {
                let config = this.data.config;
                return {
                    width: config.inputWidth,
                    height: `${config.inputHeight}px`,
                    backgroundColor: config.inputBgColor,
                    fontWeight: config.inputTitleWeight,
                    fontSize: `${config.inputTitleSize}px`,
                    color: config.inputColor,
                    borderRadius: `${config.inputBorderRadius}px`,
                    border: `${config.inputBorderWidth}px ${config.inputBorderStyle} ${config.inputBorderColor}`,
                }
            },
            styleLabel() {
                let config = this.data.config;
                return {
                    width: config.labelTitleWidth <= 0 ? '' : `${config.labelTitleWidth}%`,
                    fontWeight: config.labelTitleWeight,
                    fontSize: `${config.labelTitleSize}px`,
                    color: config.labelTitleColor,

                }
            },
            styleLabelBlock() {
                let config = this.data.config;
                return {
                    width: `${config.labelWidth}px`,
                    padding: `${config.labelBlockPaddingColumn}px ${config.labelBlockPaddingRow}px`
                }
            },
            styleButton() {
                let config = this.data.config;
                return {
                    padding: `${config.buttonHeight}px ${config.buttonWidth}px`,
                    backgroundColor: config.buttonBgColor,
                    fontSize: `${config.buttonTextSize}px`,
                    fontWeight: config.buttonTextWeight,
                    color: config.buttonTextColor,
                    borderRadius: `${config.buttonBorderRadius}px`,
                    border: `${config.buttonBorderWidth}px ${config.buttonBorderStyle} ${config.buttonBorderColor}`,
                }
            },
            styleTextarea() {
                let element = this.element.style;
              return {
                  height: `${element.height}px`,
              }
            },
            styleText() {
                let element = this.element.style;
                return {
                    textAlign: element.textAlign,
                    fontSize: `${element.fontSize}px`,
                    fontWeight: element.fontWeight,
                    color: element.color,
                    marginTop: `${element.marginTop}px`,
                    marginBottom: `${element.marginBottom}px`
                }
            }
        },
    }
</script>
