<template>
    <div class="wrapper">
      <div v-if="data.list.length === 0" class="aside__title-empty">
        <p>Для создания формы <br>перетащите нужные компоненты слева <br>в эту колонку</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="85.71" height="26.86">
          <g fill="none">
            <g stroke-linecap="round" stroke-linejoin="round">
              <path d="M83.93 0l-6.2 1.78L81.71 4l3.99 2.22z"></path>
              <path d="M79.28 1.96l2.73 1.51 2.72 1.51L83.52.74l-4.24 1.22m-1.56-.18L83.92 0l1.79 6.2-4-2.2-3.99-2.22z" fill="#409eff"></path>
            </g>
            <path d="M.18 11.98s49.24 37.54 81.55-8.1" stroke="#409eff" stroke-width=".6"></path>
          </g>
        </svg>
      </div>

      <draggable
              tag="div"
              class="aside__block-item-edit-wrapper"
              v-model="data.list"
              v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
              @end="handleMoveEnd"
              @add="handleWidgetAdd"
      >
        <transition-group name="fade" tag="ul" class="aside__block-lists aside__block-lists-edit">
          <template v-for="(element, index) in data.list">
            <li
                    class="aside__block-list aside__block-list-edit drag-widget"
                    :class="{active: selectWidget.key === element.key, 'is_req': element.options.required}"
                    v-if="element && element.key"
                    :key="element.key"
                    :element="element"
                    :select.sync="selectWidget"
                    :index="index"
                    :data="data"
                    @click.stop="handleSelectWidget(index)"
            >
              <a href="#">
                <i class="icon iconfont" :class="element.icon"></i>
                <span>{{element.name}}</span>
              </a>
              <span class="widget-view-action" v-if="selectWidget.key === element.key">
                <i title="Копировать" class="iconfont icon-clone" @click.stop="handleWidgetClone(index)"></i>
                <i title="Удалить" class="iconfont icon-delete" @click.stop="handleWidgetDelete(index)"></i>
              </span>
            </li>
          </template>
        </transition-group>
      </draggable>
    </div>
</template>



<script>
  import Draggable from "vuedraggable";
  import { genUniqKey } from "../../util/index";

  export default {
    components: {
      Draggable,
    },
    props: ["element", "select", "index", "data"],
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
