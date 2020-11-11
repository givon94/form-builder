<template>
    <div class="main__block-form">
        <form class="cForm-wrapper">
            <template v-for="(element, index) in data.list">
                <template>
<!--                    <div-->
<!--                            v-if="element && element.key"-->
<!--                            :key="element.key"-->
<!--                            :index="index"-->
<!--                    >-->
<!--                        <div>{{element}}</div>-->
<!--                    </div>-->


                    <widget-form-item
                            v-if="element && element.key"
                            :key="element.key"
                            :element="element"
                            :select.sync="selectWidget"
                            :index="index"
                            :data="data"
                    ></widget-form-item>
                </template>
            </template>
        </form>
    </div>
</template>



<script>
    import WidgetFormItem from "./WidgetFormItem";
    import { genUniqKey } from "../../util/index";

    export default {
        components: {
            WidgetFormItem
        },
        props: ["data", "select"],
        data() {
            return {
                selectWidget: this.select
            };
        },
        mounted() {
            document.body.ondrop = function(event) {
                let isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
                if (isFirefox) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
        },
        methods: {
            handleMoveEnd({ newIndex, oldIndex }) {
                console.log("index", newIndex, oldIndex);
            },
            handleSelectWidget(index) {
                console.log(index, "#####");
                this.selectWidget = this.data.list[index];
            },
            handleWidgetAdd(evt) {
                console.log("add", evt);
                console.log("end", evt);
                const newIndex = evt.newIndex;
                const to = evt.to;
                console.log(to);

                //key
                const key = genUniqKey();
                this.$set(this.data.list, newIndex, {
                    ...this.data.list[newIndex],
                    options: {
                        ...this.data.list[newIndex].options,
                        remoteFunc: "func_" + key
                    },
                    key,

                    model: this.data.list[newIndex].type + "_" + key,
                    rules: []
                });

                if (
                    this.data.list[newIndex].type === "radio" ||
                    this.data.list[newIndex].type === "checkbox" ||
                    this.data.list[newIndex].type === "select"
                ) {
                    this.$set(this.data.list, newIndex, {
                        ...this.data.list[newIndex],
                        options: {
                            ...this.data.list[newIndex].options,
                            options: this.data.list[newIndex].options.options.map(item => ({
                                ...item
                            }))
                        }
                    });
                }

                if (this.data.list[newIndex].type === "grid") {
                    this.$set(this.data.list, newIndex, {
                        ...this.data.list[newIndex],
                        columns: this.data.list[newIndex].columns.map(item => ({ ...item }))
                    });
                }

                this.selectWidget = this.data.list[newIndex];
            },
            handleWidgetColAdd($event, row, colIndex) {
                console.log("coladd", $event, row, colIndex);
                const newIndex = $event.newIndex;
                const oldIndex = $event.oldIndex;
                const item = $event.item;

                if (item.className.indexOf("data-grid") >= 0) {

                    item.tagName === "DIV" &&
                    this.data.list.splice(
                        oldIndex,
                        0,
                        row.columns[colIndex].list[newIndex]
                    );

                    row.columns[colIndex].list.splice(newIndex, 1);

                    return false;
                }

                console.log("from", item);

                const key = genUniqKey();

                this.$set(row.columns[colIndex].list, newIndex, {
                    ...row.columns[colIndex].list[newIndex],
                    options: {
                        ...row.columns[colIndex].list[newIndex].options,
                        remoteFunc: "func_" + key
                    },
                    key,


                    model: row.columns[colIndex].list[newIndex].type + "_" + key,
                    rules: []
                });

                if (
                    row.columns[colIndex].list[newIndex].type === "radio" ||
                    row.columns[colIndex].list[newIndex].type === "checkbox" ||
                    row.columns[colIndex].list[newIndex].type === "select"
                ) {
                    this.$set(row.columns[colIndex].list, newIndex, {
                        ...row.columns[colIndex].list[newIndex],
                        options: {
                            ...row.columns[colIndex].list[newIndex].options,
                            options: row.columns[colIndex].list[newIndex].options.options.map(
                                item => ({
                                    ...item
                                })
                            )
                        }
                    });
                }

                this.selectWidget = row.columns[colIndex].list[newIndex];
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
