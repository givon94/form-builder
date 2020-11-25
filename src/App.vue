<template>
    <div id="app">
        <header class="header">
            <h1 class="header__title">Генератор форм</h1>
        </header>
        <div class="content">
            <div class="content-wrapper">
                <main class="content__main">
                    <div class="content__main-container">

                        <!--Меню слева-->
                        <aside class="aside aside-left">
                            <div class="aside__block">
                                <div class="aside__block-items">

                                    <div class="aside__block-item aside__block-item-config">
                                        <h4 class="aside__block-item-title">Шаблон</h4>
                                        <draggable
                                                tag="ul"
                                                class="aside__block-lists aside__block-lists-config"
                                                :list="basicComponents"
                                                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                                                :move="handleMove"
                                        >
                                            <li
                                                    class="aside__block-list"
                                                    v-for="(item, index) in basicComponents"
                                                    :key="index"
                                            >
                                                <a href="#">
                                                    <i class="icon iconfont" :class="item.icon"></i>
                                                    <span>{{item.name}}</span>
                                                </a>
                                            </li>
                                        </draggable>
                                    </div>

                                    <div class="aside__block-item aside__block-item-edit">
                                        <h4 class="aside__block-item-title">Форма</h4>
                                        <widget-form
                                                v-if="!resetJson"
                                                ref="widgetForm"
                                                :data="widgetForm"
                                                :select.sync="widgetFormSelect"
                                        ></widget-form>
                                    </div>
                                </div>
                            </div>
                        </aside>


                        <!--Главная страница-->
                        <section class="main">
                            <div class="main__header">
                                <ul class="main__header-links">
                                    <li class="main__header-link">
                                        <a href="#" @click="downloadForm">
                                            <i class="icon iconfont icon-download"></i>
                                            <span>Скачать форму</span>
                                        </a>
                                    </li>
                                    <li class="main__header-link">
                                        <a href="#" @click="handleClear">
                                            <i class="icon iconfont icon-delete"></i>
                                            <span>Удалить форму</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="main__block-wrapper">
                                <div class="main__block">
                                    <view-form
                                            v-if="!resetJson"
                                            ref="widgetForm"
                                            :data="widgetForm"
                                            :select.sync="widgetFormSelect"
                                    ></view-form>
                                </div>
                            </div>

                        </section>

                        <!--Меню справа-->
                        <el-aside class="aside-right widget-config-container" style="width: 390px;">
                            <el-container>
                                <el-header class="aside-right-header" height="45px">
                                    <div
                                            class="config-tab"
                                            :class="{active: configTab ==='form'}"
                                            @click="handleConfigSelect('form')"
                                    >Общие настройки</div>
                                    <div
                                            class="config-tab"
                                            :class="{active: configTab ==='widget'}"
                                            @click="handleConfigSelect('widget')"
                                    >Настройки компонента</div>

                                </el-header>
                                <el-main class="config-content">
                                    <form-config v-show="configTab ==='form'" :data="widgetForm.config"></form-config>
                                    <widget-config v-show="configTab ==='widget'" :data="widgetFormSelect"></widget-config>
                                </el-main>
                            </el-container>
                        </el-aside>
                    </div>
                </main>

                <footer class="footer">
                    <p class="white--text">&copy; {{ new Date().getFullYear() }}</p>
                </footer>
            </div>
        </div>
    </div>







</template>

<script>
    import Draggable from "vuedraggable";
    import WidgetConfig from "./components/form/WidgetConfig";
    import FormConfig from "./components/form/FormConfig";
    import widgetForm from "./components/form/widgetForm";
    import viewForm from "./components/form/viewForm";
    import {
        basicComponents,
    } from "./components/form/componentsConfig.js";

    export default {
        components: {
          Draggable,
          WidgetConfig,
          FormConfig,
          widgetForm,
          viewForm
        },
        props: {
          preview: {
              type: Boolean,
              default: false
          },
          generateJson: {
              type: Boolean,
              default: false
          },
          upload: {
              type: Boolean,
              default: false
          },
          clearable: {
              type: Boolean,
              default: false
          },
          basicFields: {
              type: Array,
              default: () => [
                  "input",
                  "textarea",
                  "number",
                  "radio",
                  "checkbox",
                  "time",
                  "date",
                  "rate",
                  "color",
                  "select",
                  "switch",
                  "slider",
                  "text"
              ]
          },
          advanceFields: {
              type: Array,
              default: () => ["blank", "imgupload", "editor", "cascader"]
          },
          layoutFields: {
              type: Array,
              default: () => ["grid"]
          }
        },
        data() {
          return {
              basicComponents,
              resetJson: false,
              widgetForm: {
                  list: [],
                  config: {
                      formValue: 'Название формы',
                      formEmail: '',
                      labelBlockPaddingColumn: 10,
                      labelBlockPaddingRow: 0,
                      addLabelTitle: true,
                      formStyle: 'basic',
                      formBgColor: '#fff',
                      formBorderRadius: 0,
                      formBorderWidth: 0,
                      formBorderStyle: 'solid',
                      formBorderColor: '#000',
                      formShadow: 'cForm-shadow1',
                      formPaddingVertical: 40,
                      formPaddingHorizontal: 40,
                      inputWidth: 100,
                      inputHeight: 50,
                      inputBgColor: '#fff',
                      inputTitleWeight: 400,
                      inputTitleSize: 18,
                      inputColor: '#333',
                      multiInputColor: '#333',
                      multiInputSize: 13,
                      multiInputTitleSize: 16,
                      inputBorderRadius: 4,
                      inputBorderWidth: 1,
                      inputBorderStyle: 'solid',
                      inputBorderColor: '#d9d9d9',
                      inputShadowStyle: 'no',
                      labelInlinePosition: 'align_center',
                      labelWidth: 200,
                      labelTitleWidth: 0,
                      labelTitleWeight: 400,
                      labelTitleSize: 18,
                      labelTitleColor: '#333',
                      buttonPosition: 'left',
                      buttonWidth: 20,
                      buttonHeight: 15,
                      buttonBgColor: '#3f51b5',
                      buttonTextSize: 18,
                      buttonTextWeight: 400,
                      buttonTextColor: '#fff',
                      buttonBorderRadius: 4,
                      buttonBorderWidth: 0,
                      buttonBorderStyle: 'solid',
                      buttonBorderColor: '#000',
                      buttonAnimation: true,
                  }
              },
              configTab: "form",
              widgetFormSelect: null,
              previewVisible: false,
              jsonVisible: false,
              codeVisible: false,
              uploadVisible: false,
              widgetModels: {},
              blank: "",
              htmlTemplate: "",
              vueTemplate: "",
              jsonTemplate: "",
              uploadEditor: null,
              jsonCopyValue: "",
              jsonClipboard: null,
              codeActiveName: "vue",
          };
        },
        methods: {
            handleClear() {
                this.widgetForm = {
                    list: [],
                    config: {
                        formValue: 'Название формы',
                        formEmail: 'test@yandex.by',
                        labelBlockPaddingColumn: 10,
                        labelBlockPaddingRow: 0,
                        addLabelTitle: true,
                        formStyle: 'basic',
                        formBgColor: '#fff',
                        formBorderRadius: 0,
                        formBorderWidth: 0,
                        formBorderStyle: 'solid',
                        formBorderColor: '#000',
                        formShadow: 'cForm-shadow1',
                        formPaddingVertical: 40,
                        formPaddingHorizontal: 40,
                        inputWidth: 100,
                        inputHeight: 50,
                        inputBgColor: '#fff',
                        inputTitleWeight: 400,
                        inputTitleSize: 18,
                        inputColor: '#333',
                        multiInputColor: '#333',
                        multiInputSize: 13,
                        multiInputTitleSize: 16,
                        inputBorderRadius: 4,
                        inputBorderWidth: 1,
                        inputBorderStyle: 'solid',
                        inputBorderColor: '#d9d9d9',
                        inputShadowStyle: 'no',
                        labelInlinePosition: 'align_center',
                        labelWidth: 200,
                        labelTitleWidth: 0,
                        labelTitleWeight: 400,
                        labelTitleSize: 18,
                        labelTitleColor: '#333',
                        buttonPosition: 'left',
                        buttonWidth: 20,
                        buttonHeight: 15,
                        buttonBgColor: '#3f51b5',
                        buttonTextSize: 18,
                        buttonTextWeight: 400,
                        buttonTextColor: '#fff',
                        buttonBorderRadius: 4,
                        buttonBorderWidth: 0,
                        buttonBorderStyle: 'solid',
                        buttonBorderColor: '#000',
                        buttonAnimation: true,
                    }
                };
                this.widgetFormSelect = {};
                this.$store.dispatch('setSuccess', 'Форма успешно удалена')
            },
            handleConfigSelect(value) {
              this.configTab = value;
            },
            handleMove() {
              return true;
            },
            downloadForm() {
                const form = document.querySelector('.cForm-wrapper');

                if (form) {
                    const formResult = (form.outerHTML),
                        formResultStr = formResult.replaceAll('<!---->', ''),
                        jsonTemplate = this.widgetForm.list.filter((item) => !item.infoTemplate),
                        resultName =  jsonTemplate.filter((item) => item.options.name).map(a => `${a.name}: ${a.options.name}`),
                        resultModel = jsonTemplate.filter((item) => !item.options.name).map(a => `${a.name}: ${a.model}`);

                    let result = resultName.concat(resultModel);
                    result.unshift('Название формы: form_name');

                    this.$store.dispatch('saveForm', {
                        form: formResultStr,
                        attr_name: result
                    })
                } else {
                    this.$store.dispatch('setWarning', 'Сначала создайте форму')
                }
            },
        },
    }
</script>


<style lang="scss">
    @-ms-viewport { width: 1200; }
    @-webkit-viewport { width: 1200; }
    @-moz-viewport { width: 1200; }
    @-o-viewport { width: 1200; }
    @viewport { width: 1200; }

    html, body {
        height: 100% !important;
    }

    #app {
        overflow: hidden;
        font-family: 'Source Sans Pro', sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        min-height: 100%;
        height: 100%;
    }

    .el-scrollbar__view {
        font-family: 'Source Sans Pro', sans-serif !important;
    }

    .el-message__content {
        font-family: 'Source Sans Pro', sans-serif !important;
        font-size: 22px !important;
    }

    .el-tooltip__popper {
        font-family: 'Source Sans Pro', sans-serif !important;
        font-size: 14px !important;
    }

    .el-button span {
        font-family: 'Source Sans Pro', sans-serif !important;
    }

    .header {
        background: #3f51b5;
        box-shadow: 0 2px 10px rgba(70, 160, 252, 0.6);
        padding: 15px 10px;
        height: auto;
        &__title {
            display: inline-block;
            vertical-align: middle;
            color: #fff;
            font-size: 20px;
            font-weight: 600;
        }
    }

    .content {
        height: calc(100% - 50px);
        &-wrapper {
            display: flex;
            flex: 1;
            background: #fff;
            height: 100%;
            border: 1px solid #e0e0e0;
            flex-basis: auto;
            min-width: 0;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
        }
        &__main {
            overflow: hidden;
            position: relative;
            padding: 0;
            display: block;
            flex: 1;
            flex-basis: auto;
            &-container {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100% !important;
                display: flex;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                flex-direction: row;
                flex: 1;
                min-width: 0;
            }
        }
    }


    .aside {
        &-left {
            width: 450px;
            overflow-x: hidden;
            overflow-y: auto;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            scrollbar-color: rgba(144,147,153,.3) #fff;
            &::-webkit-scrollbar-thumb {
                border-radius: 6px;
                background: rgba(144,147,153,.3);
            }
            &::-webkit-scrollbar {
                background: rgba(144,147,153,.1);
                -webkit-appearance: none;
            }
            &::-webkit-scrollbar:vertical {
                width: 5px;
                border-radius: 6px;
            }
        }
        &-right {
            scrollbar-color: rgba(144,147,153,.3) #fff;
            &::-webkit-scrollbar-thumb {
                border-radius: 6px;
                background: rgba(144,147,153,.3);
            }
            &::-webkit-scrollbar {
                background: rgba(144,147,153,.1);
                -webkit-appearance: none;
            }
            &::-webkit-scrollbar:vertical {
                width: 5px;
                border-radius: 6px;
            }
            &-header {
                position: sticky;
                top: 0;
                background: #fff;
                border-bottom: solid 2px #e4e7ed;
                padding: 0 !important;
                user-select: none;
                z-index: 9999;
                & .config-tab {
                    height: 45px;
                    line-height: 45px;
                    display: inline-block;
                    width: 50%;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 600;
                    position: relative;
                    cursor: pointer;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    &.active {
                        background: #409EFF;
                        color: #fff;
                    }
                }
            }
        }
        &__block {
            width: 100%;
            height: calc(100% - 20px);
            &-title {
                font-size: 18px;
                padding: 8px 12px;
            }
            &-items {
                display: flex;
                align-items: stretch;
                height: calc(100% - 26px);
            }
            &-item {
                &-config {
                    width: 200px;
                }
                &-edit {
                    flex: 1;
                    &-wrapper {
                        width: 100%;
                        height: 100%;
                    }
                    & .wrapper {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        border-left: 2px solid #c0c0c0;
                    }
                }
                &-title {
                    text-align: center;
                    height: 45px;
                    font-weight: 600;
                    line-height: 45px;
                    background: #409eff;
                    color: #fff;
                    user-select: none;
                }
            }
            &-lists {
                width: 100%;
                height: 100%;
            }
            &-list {
                font-size: 16px;
                display: block;
                width: 100%;
                line-height: 30px;
                position: relative;
                float: left;
                left: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 2px 0;
                color: #333;
                border: 1px solid #f7f8fc;
                user-select: none;
                &:active {
                    border: 1px dashed #409EFF;
                    &>a {
                        color: #409EFF !important;
                    }
                }
                &:hover {
                    border: 1px dashed #409EFF;
                    &>a {
                        color: #409EFF !important;
                    }
                }
                &>a {
                    display: block;
                    color: #333;
                    cursor: move;
                    background: #f7f8fc;
                    border: 1px solid #f7f8fc;
                    &>span {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    &>.icon {
                        margin-right: 6px;
                        margin-left: 8px;
                        font-size: 16px;
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
            }
        }
        &__title {
            &-empty {
                position: absolute;
                top: 50px;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 20px;
                line-height: 1.2;
                &>p {
                    opacity: .7;
                }
                &>svg {
                    position: absolute;
                    left: 10px;
                    bottom: -45px;
                    transform: translate3d(0,0,0);
                    -webkit-animation: floating 2s ease-in-out 250ms infinite;
                    animation: floating 2s ease-in-out 250ms infinite;
                    will-change: transform;
                }
            }
        }
    }


    .main {
        height: 100% !important;
        background: #fafafa;
        display: flex;
        flex: 1;
        flex-basis: auto;
        min-width: 0;
        flex-direction: column;
        border-left: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
        &__header {
            background: #fff;
            font-size: 18px;
            border-bottom: solid 2px #e4e7ed;
            text-align: right;
            flex-shrink: 0;
            padding: 20px;
            user-select: none;
            overflow: auto;
            scrollbar-color: rgba(144,147,153,.3) #fff;
            &::-webkit-scrollbar-thumb {
                border-radius: 6px;
                background-color: rgba(144,147,153,.3);
            }
            &::-webkit-scrollbar {
                -webkit-appearance: none;
            }
            &::-webkit-scrollbar:horizontal {
                height: 5px;
                border-radius: 6px;
            }
            &-links {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin: 0 -15px !important;
            }
            &-link {
                display: block;
                margin: 0 15px;
                white-space: nowrap;
                &>a {
                    font-size: 18px;
                    display: block;
                    text-decoration: none;
                    color: #409EFF;
                    &>.icon {
                        margin-right: 5px;
                    }
                    &>span {
                        border-bottom: 1px solid transparent;
                        padding: 2px 0;
                    }
                    &.active {
                        color: darken(#409EFF, 25%);
                        &>span {
                            border-bottom: 1px solid darken(#409EFF, 25%);
                        }
                    }
                }
            }
        }
        &__block {
            overflow: auto;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            scrollbar-color: rgba(144,147,153,.3) #fff;
            &::-webkit-scrollbar-thumb {
                border-radius: 6px;
                background-color: rgba(144,147,153,.3);
            }
            &::-webkit-scrollbar {
                -webkit-appearance: none;
            }
            &::-webkit-scrollbar:vertical {
                width: 5px;
                border-radius: 6px;
            }
            &::-webkit-scrollbar:horizontal {
                height: 5px;
                border-radius: 6px;
            }
            &-wrapper {
                background: #fff;
                position: relative;
                height: 100%;
                overflow: hidden;
                margin: 10px;
                border: 1px dashed #999;
            }
            &-form {
                &-view {
                    position: relative;
                    display: flex;
                    height: 100%;
                    text-align: center;
                    user-select: none;
                    & form {
                        text-align: initial;
                        vertical-align: middle;
                        margin: auto;
                    }
                }
                &-empty {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    font-size: 1.3vw;
                    line-height: 1.5;
                    opacity: .7;
                }
            }
        }
    }

    /*Поля формы*/
    .widget-view {
        position: relative;
        padding: 20px 70px;
        border: 3px solid transparent;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
        }
        &-title {
            font-size: 12px;
            margin-bottom: 10px;
            display: block;
            color: #409EFF;
        }
        &.active {
            border: 3px solid #409EFF;
        }
        &-drag {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
        }
        &-action {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            background: #409EFF;
            z-index: 9;
            padding: 0 5px;
            &>i {
                font-size: 14px;
                color: #fff;
                margin: 0 5px;
                cursor: pointer;
            }
        }
    }

    .sortable-chosen.ghost {
        border-top: 3px solid red;
    }

    .el-form-item__content {
        position: static !important;
    }

    .widget-form-container .widget-form-list .widget-view .widget-view-action i {
        font-size: 14px;
        color: #fff;
        margin: 0 5px;
        cursor: pointer;
    }

    .el-form-item.widget-view.el-form-item--small {
        padding: 20px;
    }

    /*Временные*/
    .widget-form-container {
        height: 100%;
    }

    .el-form {
        height: 100%;
        &>div {
            height: 100%;
        }
    }

    .widget-form-list {
        height: 100%;
    }

    .form-empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 24px;
        opacity: .8;
    }

    .el-form-item__label {
        line-height: 1.3 !important;
    }

    .footer {
        height: 30px;
        line-height: 30px;
        border-top: 1px solid #e0e0e0;
        font-size: 12px;
        color: #409EFF;
        background: #fafafa;
        padding: 0 10px;
    }

    @keyframes floating {
        0% {
            transform: translate3d(0,0,0) rotate(0);
            -webkit-transform: translate3d(0,0,0) rotate(0);
        }
        50% {
            transform: translate3d(30px,0,0) rotate(-15deg);
            -webkit-transform: translate3d(30px,0,0) rotate(-15deg);
        }
        100% {
            transform: translate3d(0,0,0) rotate(0);
            -webkit-transform: translate3d(0,0,0) rotate(0);
        }
    }
</style>
