<template>
    <div
            class="widget-view"
            v-if="element && element.key"
            :class="{active: selectWidget.key === element.key, 'is_req': element.options.required}"
            @click.stop="handleSelectWidget(index)"
    >

    <span class="widget-view-title" v-text="'*' + element.name"></span>
    <items-template
            v-if="element && element.key"
            :key="element.key"
            :element="element"
            :select.sync="selectWidget"
            :index="index"
            :data="data"
    >
    </items-template>
        <div class="widget-view-action" v-if="selectWidget.key === element.key">
            <i title="Копировать" class="iconfont icon-clone" @click.stop="handleWidgetClone(index)"></i>
            <i title="Удалить" class="iconfont icon-delete" @click.stop="handleWidgetDelete(index)"></i>
        </div>

        <div class="widget-view-drag" v-if="selectWidget.key === element.key">
            <i class="iconfont icon-drag drag-widget"></i>
        </div>
    </div>
</template>



<script>
    import { genUniqKey } from "../../util/index";
    import itemsTemplate from "./itemsTemplate";

    export default {
        props: ["element", "select", "index", "data"],
        components: {
            itemsTemplate
        },
        data() {
            return {
                selectWidget: this.select,
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
