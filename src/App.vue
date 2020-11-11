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
                                <h4 class="aside__block-title">Шаблоны компонентов</h4>
                                <draggable
                                        tag="ul"
                                        class="aside__block-lists"
                                        :list="basicComponents"
                                        v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                                        @end="handleMoveEnd"
                                        @start="handleMoveStart"
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
                        </aside>


                        <!--Главная страница-->
                        <section class="main">
                            <div class="main__header">
                                <ul class="main__header-links">
                                    <li
                                        class="main__header-link"
                                        v-for="link in links"
                                        :key="link.name"
                                    >
                                        <a href="#">
                                            <i class="icon iconfont" :class="link.icon"></i>
                                            <span>{{link.name}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="main__block-wrapper">
                                <div class="main__block" :class="{'widget-empty': widgetForm.list.length == 0}">
                                    <widget-form
                                            v-if="!resetJson"
                                            ref="widgetForm"
                                            :data="widgetForm"
                                            :select.sync="widgetFormSelect"
                                    ></widget-form>
                                </div>
                            </div>

                            <generate-form
                                    v-if="!resetJson"
                                    ref="widgetForm"
                                    :data="widgetForm"
                                    :select.sync="widgetFormSelect"
                            ></generate-form>
                        </section>


                        <el-aside class="widget-config-container" style="width: 360px;">
                            <el-container>
                                <el-header height="45px">
                                    <div
                                            class="config-tab"
                                            :class="{active: configTab ==='form'}"
                                            @click="handleConfigSelect('form')"
                                    >Настройки формы</div>
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
    import GenerateForm from "./components/form/GenerateForm";
    import {
        basicComponents,
    } from "./components/form/componentsConfig.js";

  export default {
      components: {
          Draggable,
          WidgetConfig,
          FormConfig,
          widgetForm,
          GenerateForm
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
      // data() {
      //     return {
      //         basicComponents,
      //         layoutComponents,
      //         advanceComponents,
      //         resetJson: false,
      //         configTab: "widget",
      //         widgetFormSelect: null,
      //         previewVisible: false,
      //         jsonVisible: false,
      //         codeVisible: false,
      //         uploadVisible: false,
      //         widgetModels: {},
      //         blank: "",
      //         htmlTemplate: "",
      //         vueTemplate: "",
      //         jsonTemplate: "",
      //         uploadEditor: null,
      //         jsonCopyValue: "",
      //         jsonClipboard: null,
      //         codeActiveName: "vue"
      //     };
      // },
      data() {
          return {
              basicComponents,
              resetJson: false,
              widgetForm: {
                  list: [],
                  config: {
                      formStyle: 'basic',
                      formMaxWidth: 100,
                      formBgColor: '#fff',
                      formBorderRadius: 0,
                      formBorderWidth: 0,
                      formBorderStyle: 'solid',
                      formBorderColor: '#000',
                      formShadowStyle: 'no',
                      inputWidth: 100,
                      inputHeight: 50,
                      inputBgColor: '#fff',
                      inputColor: '#333',
                      inputBorderRadius: 0,
                      inputBorderWidth: 1,
                      inputBorderStyle: 'solid',
                      inputBorderColor: '#000',
                      inputShadowStyle: 'no',
                      labelTitleWeight: 'normal',
                      labelTitleSize: 18,
                      labelTitleColor: '#333'
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
              codeActiveName: "vue"
          };
      },
    computed: {
      // config() {
      //     return {
      //             formStyle: 'basic',
      //             formMaxWidth: 100,
      //             formBgColor: '#fff',
      //             formBorderRadius: 0,
      //             formBorderWidth: 0,
      //             formBorderStyle: 'solid',
      //             formBorderColor: '#000',
      //             formShadowStyle: 'no',
      //             inputWidth: 100,
      //             inputHeight: 50,
      //             inputBgColor: '#fff',
      //             inputBorderRadius: 0,
      //             inputBorderWidth: 1,
      //             inputBorderStyle: 'solid',
      //             inputBorderColor: '#000',
      //             inputShadowStyle: 'no',
      //             labelTitleWeight: 'normal',
      //             labelTitleSize: 18,
      //             labelTitleColor: '#333'
      //     }
      // },
      links () {
          return [
            {name: 'Настройки', icon: 'icon-settings'},
            {name: 'Предварительный просмотр', icon: 'icon-view'},
            {name: 'Скачать форму', icon: 'icon-download'},
            {name: 'Удалить', icon: 'icon-delete'},
          ]
      }
    },
    methods: {
      _loadComponents() {
          this.basicComponents = this.basicComponents.map(item => {
              return {
                  ...item,
                  name: this.$t(`fm.components.fields.${item.type}`)
              };
          });
          this.advanceComponents = this.advanceComponents.map(item => {
              return {
                  ...item,
                  name: this.$t(`fm.components.fields.${item.type}`)
              };
          });
          this.layoutComponents = this.layoutComponents.map(item => {
              return {
                  ...item,
                  name: this.$t(`fm.components.fields.${item.type}`)
              };
          });
      },
      // handleGoGithub() {
      //     window.location.href = "https://github.com/giscafer/vue-form-builder";
      // },
      handleConfigSelect(value) {
          this.configTab = value;
      },
      handleMoveEnd(evt) {
          console.log("end", evt);
      },
      handleMoveStart({ oldIndex }) {
          console.log("start", oldIndex, this.basicComponents);
      },
      handleMove() {
          return true;
      },
    },
  }
</script>


<style lang="scss">
    html, body {
        height: 100% !important;
    }


    #app {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        min-height: 100%;
        height: 100%;
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
            position: relative;
            padding: 0;
            display: block;
            flex: 1;
            flex-basis: auto;
            overflow: auto;
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
            width: 220px;
            overflow: auto;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            scrollbar-color: rgba(144,147,153,.3) #fff;
            &::-webkit-scrollbar-thumb {
                border-radius: 6px;
                background: rgba(144,147,153,.3);
            }
            &::-webkit-scrollbar {
                -webkit-appearance: none;
            }
            &::-webkit-scrollbar:vertical {
                width: 5px;
                border-radius: 6px;
            }
        }
        &-right {
            width: 300px;
            overflow: auto;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            scrollbar-color: rgba(144,147,153,.3) #fff;
            &::-webkit-scrollbar-thumb {
                border-radius: 6px;
                background: rgba(144,147,153,.3);
            }
            &::-webkit-scrollbar {
                background: rgba(144,147,153,.3);
                -webkit-appearance: none;
            }
            &::-webkit-scrollbar:vertical {
                width: 5px;
                border-radius: 6px;
            }
        }
        &__block {
            padding: 8px 0;
            width: 100%;
            height: 100%;
            &-title {
                font-size: 18px;
                padding: 8px 12px;
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
            &-links {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            &-link {
                display: block;
                margin-left: 20px;
                &>a {
                    display: block;
                    text-decoration: none;
                    &>.icon {
                        margin-right: 5px;
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
            &-wrapper {
                background: #fff;
                position: relative;
                min-height: 600px;
                height: 100%;
                overflow: hidden;
                margin: 10px;
                border: 1px dashed #999;
            }
            &-form {
                height: 100%;
                &-empty {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    font-size: 26px;
                    line-height: 1.5;
                }
            }
        }
    }


    .cForm {
        height: 100%;
        &-wrapper {
            height: 100%;
            &>div {
                height: 100%;
            }
        }
    }

    /*Поля формы*/
    .widget-view {
        position: relative;
        padding: 20px 50px;
        border: 3px solid transparent;
        &.active {
            border: 3px solid #409EFF;
        }
        &-drag {
            position: absolute;
            left: -2px;
            top: -2px;
            bottom: -18px;
            height: 28px;
            line-height: 28px;
            background: #409EFF;
            z-index: 9;
            &>i {
                font-size: 14px;
                color: #fff;
                margin: 0 5px;
                cursor: move;
            }
        }
        &-action {
            position: absolute;
            right: 0;
            bottom: 0;
            height: 28px;
            line-height: 28px;
            background: #409EFF;
            z-index: 9;
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

    .cForm_item input, textarea, select {
        font-size: 18px;
        width: 220px;
        color: #212121;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        padding-left: 15px;
        &::-webkit-input-placeholder {
            color: #999;
        }
        &:-ms-input-placeholder {
            color: #999;
        }
        &::-moz-placeholder {
            color: #999;
            opacity: 1;
        }
        &:-moz-placeholder {
            color: #999;
            opacity: 1;
        }
        &:focus {
            outline: none;
        }
    }

    .cForm_item input, textarea {
        &:focus {
            outline: none;
            &::-webkit-input-placeholder {
                color: transparent
            }
            &::-moz-placeholder {
                color: transparent
            }
            &:-moz-placeholder {
                color: transparent
            }
            &:-ms-input-placeholder {
                color: transparent
            }
        }
    }

    .cForm_item textarea  {
        resize: none;
    }



    /*Настройки формы*/
    .cForm {
        &.horizontal {
            & .cForm_item {
                display: flex;
                align-items: center;
                &-text {
                    margin: 0 15px 0 0;
                }
            }
        }
        &.basic {
            & .cForm_item {
                &-text {
                    margin: 0 0 10px 0;
                }
            }
        }
    }


    .el-form-item__label {
        line-height: 1.3 !important;
    }



    .footer {
        height: 30px;
        line-height: 30px;
        border-top: 1px solid #e0e0e0;
        font-size: 12px;
        text-align: right;
        color: #409EFF;
        background: #fafafa;
    }
</style>
