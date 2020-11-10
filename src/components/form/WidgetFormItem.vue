<template>
<!--    <el-form-item-->
<!--            class="widget-view"-->
<!--            v-if="element && element.key"-->
<!--            :class="{active: selectWidget.key === element.key, 'is_req': element.options.required}"-->
<!--            :label="element.name"-->
<!--            @click.native.stop="handleSelectWidget(index)"-->
<!--    >-->
    <div
            class="widget-view"
            v-if="element && element.key"
            :class="{active: selectWidget.key === element.key, 'is_req': element.options.required}"
            :label="element.name"
            @click.native.stop="handleSelectWidget(index)"
    >



        <template v-if="element.type === 'title'">
            <h4 class="cFormTitle widget-view">{{element.name}}</h4>
        </template>

        <template v-if="element.type === 'someText'">
            <p class="cFormTitle">{{element.name}}</p>
        </template>

        <template v-if="element.type === 'input'">
            <label class="cForm_item">
                <div class="cForm_item-text"><p v-text="element.label"></p></div>
                <input
                    type="text"
                    :class="element.style.className"
                    v-model="element.options.defaultValue"
                    :name="element.options.name"
                    :style="{width: element.options.width}"
                    :placeholder="element.options.placeholder"
                    :disabled="element.options.disabled"
                >
            </label>
        </template>


        <template v-if="element.type === 'number'">
            <label class="cForm_item">
                <input
                    type="number"
                    :class="element.style.className"
                    v-model="element.options.defaultValue"
                    :name="element.options.name"
                    :style="{width: element.options.width}"
                    :placeholder="element.options.placeholder"
                    :disabled="element.options.disabled"
                >
            </label>
        </template>


        <template v-if="element.type === 'name'">
            <label class="cForm_item">
                <input
                    type="text"
                    :class="element.style.className"
                    v-model="element.options.defaultValue"
                    :name="element.options.name"
                    :style="{width: element.options.width}"
                    :placeholder="element.options.placeholder"
                    :disabled="element.options.disabled"
                >
            </label>
        </template>


        <template v-if="element.type === 'phone'">
            <label class="cForm_item">
                <input
                    type="tel"
                    :class="element.style.className"
                    v-model="element.options.defaultValue"
                    :name="element.options.name"
                    :style="{width: element.options.width}"
                    :placeholder="element.options.placeholder"
                    :disabled="element.options.disabled"
                >
            </label>
        </template>


        <template v-if="element.type === 'email'">
            <label class="cForm_item">
                <input
                    type="email"
                    :class="element.style.className"
                    v-model="element.options.defaultValue"
                    :name="element.options.name"
                    :style="{width: element.options.width}"
                    :placeholder="element.options.placeholder"
                    :disabled="element.options.disabled"
                >
            </label>
        </template>


        <template v-if="element.type === 'textarea'">
            <label class="cForm_item">
                <textarea
                        type="textarea"
                        :class="element.style.className"
                        :name="element.options.name"
                        v-model="element.options.defaultValue"
                        :style="{width: element.options.width}"
                        :disabled="element.options.disabled"
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
                <input
                        type="date"
                        :class="element.style.className"
                        v-model="element.options.defaultValue"
                        :name="element.options.name"
                        :style="{width: element.options.width}"
                        :placeholder="element.options.placeholder"
                        :start-placeholder="element.options.startPlaceholder"
                        :end-placeholder="element.options.endPlaceholder"
                        :disabled="element.options.disabled"
                        :editable="element.options.editable"
                >
            </label>
        </template>


        <template v-if="element.type === 'time'">
            <label class="cForm_item">
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
                        :style="{width: element.options.width}"
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




        <template v-if="element.type === 'select'">
            <select
                :class="element.style.className"
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
                :multiple="element.options.multiple"
                :clearable="element.options.clearable"
                :placeholder="element.options.placeholder"
                :style="{width: element.options.width}"
            >
                <option
                    v-for="item in element.options.options"
                    :key="item.value"
                    :value="item.value"
                    :label="element.options.showLabel?item.label:item.value"
                >
                </option>
            </select>
        </template>



        <template v-if="element.type === 'slider'">
            <label class="cForm_item">
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



        <template v-if="element.type === 'editor'">
            <vue-editor v-model="element.options.defaultValue" :style="{width: element.options.width}"></vue-editor>
        </template>

        <template v-if="element.type === 'blank'">
            <div
                    style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;"
            >Custom</div>
        </template>

        <template v-if="element.type === 'text'">
            <span>{{element.options.defaultValue}}</span>
        </template>
        <template v-if="element.type === 'table'">
            <el-table
                    :data="element.options.defaultValue"
                    :height="element.options.height"
                    :border="element.options.border"
                    :stripe="element.options.stripe"
                    style="width: 100%"
            >
                <el-table-column
                        v-for="column in element.options.columns"
                        :key="column.field"
                        :prop="column.field"
                        :label="column.label"
                        :width="column.width"
                ></el-table-column>
            </el-table>
        </template>

        <div class="widget-view-action" v-if="selectWidget.key === element.key">
            <i class="iconfont icon-clone" @click.stop="handleWidgetClone(index)"></i>
            <i class="iconfont icon-delete" @click.stop="handleWidgetDelete(index)"></i>
        </div>

        <div class="widget-view-drag" v-if="selectWidget.key === element.key">
            <i class="iconfont icon-drag drag-widget"></i>
        </div>
    </div>
</template>





<script>
    // import FmUpload from "./Upload";
    import { genUniqKey } from "../../util/index";

    export default {
        props: ["element", "select", "index", "data"],
        data() {
            return {
                selectWidget: this.select
            };
        },
        mounted() {},
        methods: {
            handleSelectWidget(index) {
                this.selectWidget = this.data.list[index];
            },
            handleWidgetDelete(index) {
                if (this.data.list.length - 1 === index) {
                    if (index === 0) {
                        this.selectWidget = {};
                    } else {
                        this.selectWidget = this.data.list[index - 1];
                    }
                } else {
                    this.selectWidget = this.data.list[index + 1];
                }

                this.$nextTick(() => {
                    this.data.list.splice(index, 1);
                });
            },
            handleWidgetClone(index) {
                let cloneData = {
                    ...this.data.list[index],
                    options: { ...this.data.list[index].options },
                    key: genUniqKey()
                };

                if (
                    this.data.list[index].type === "radio" ||
                    this.data.list[index].type === "checkbox" ||
                    this.data.list[index].type === "select"
                ) {
                    cloneData = {
                        ...cloneData,
                        options: {
                            ...cloneData.options,
                            options: cloneData.options.options.map(item => ({ ...item }))
                        }
                    };
                }

                this.data.list.splice(index, 0, cloneData);

                this.$nextTick(() => {
                    this.selectWidget = this.data.list[index + 1];
                });
            }
        },
        watch: {
            select(val) {
                this.selectWidget = val;
            },
            selectWidget: {
                handler(val) {
                    this.$emit("update:select", val);
                },
                deep: true
            }
        }
    };
</script>
