<template>
  <div class="main__block-form main__block-form-edit">
    <p v-if="data.list.length === 0" class="main__block-form-empty">Для создания формы <br>перетащите нужные компоненты слева</p>
    <form class="cForm-wrapper-edit">
      <draggable
              class="div"
              v-model="data.list"
              v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
              @end="handleMoveEnd"
              @add="handleWidgetAdd"
      >
        <transition-group name="fade" tag="div" class="cForm-edit" :class="data.config.formStyle">
          <template v-for="(element, index) in data.list">
            <template>
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
        </transition-group>
      </draggable>
    </form>
  </div>
</template>



<script>
  import Draggable from "vuedraggable";
  import WidgetFormItem from "./WidgetFormItem";
  import { genUniqKey } from "../../util/index";

  export default {
    components: {
      Draggable,
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
        const newIndex = evt.newIndex;
        // const to = evt.to;
        // console.log(to);

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

        this.selectWidget = this.data.list[newIndex];
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
