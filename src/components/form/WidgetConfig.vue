<template>
  <div v-if="show">
    <el-form label-position="top">

        <!--Name-->
        <el-form-item
                v-if="data.type !== 'title' && data.type !== 'someText' && data.type !== 'button'"
                label="Name">
            <el-input class="small" v-if="Object.keys(data.options).indexOf('name')>=0" v-model="data.options.name"></el-input>
            <el-input class="small" v-else v-model="data.model"></el-input>
            <el-tooltip content="Указывает имя элемента, используется в качестве эталона при отправке данных. Должно быть уникальным и не повторяться." placement="top">
                <span class="el-prompt el-icon-question" type="primary"></span>
            </el-tooltip>
        </el-form-item>

        <!--Заголовок-->
        <el-form-item label="Заголовок">
            <el-input class="small" v-model="data.label"></el-input>
            <el-tooltip content="Представляет собой подпись к полю ввода." placement="top">
                <span class="el-prompt el-icon-question" type="primary"></span>
            </el-tooltip>
        </el-form-item>

        <!--Placeholder-->
      <el-form-item
              label="Placeholder"
              v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!=='time' || data.type!=='date')"
      >
        <el-input class="small" v-model="data.options.placeholder"></el-input>
          <el-tooltip content="Подсказка отображается в поле ввода до того, как пользователь вводит значение." placement="top">
              <span class="el-prompt el-icon-question" type="primary"></span>
          </el-tooltip>
      </el-form-item>
      <el-form-item
              label="Выравнивание"
              v-if="Object.keys(data.options).indexOf('inline')>=0"
      >
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">В строку</el-radio-button>
          <el-radio-button :label="true">В колонку</el-radio-button>
        </el-radio-group>
      </el-form-item>

        <!--Value-->
      <el-form-item
              label="Значение по умолчанию"
              v-if="Object.keys(data.options).indexOf('defaultValue')>=0
                && data.type !== 'radio'
                && data.type !== 'checkbox'"
      >
          <el-input class="small" v-model="data.options.defaultValue"></el-input>
          <el-tooltip content="Определяет значение поля ввода по умолчанию (отображается при загрузке формы и может быть отредактировано пользователем)." placement="top">
              <span class="el-prompt el-icon-question" type="primary"></span>
          </el-tooltip>
      </el-form-item>


        <template v-if="data.type === 'title' || data.type === 'someText'">
            <el-form-item label="Выравнивание">
                <el-radio-group v-model="data.style.textAlign">
                    <el-radio-button label="left">Слева</el-radio-button>
                    <el-radio-button label="center">По центру</el-radio-button>
                    <el-radio-button label="right">Справа</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="Начертание">
                <el-radio-group v-model="data.style.fontWeight">
                    <el-radio-button label="700">Полужирное</el-radio-button>
                    <el-radio-button label="400">Среднее</el-radio-button>
                    <el-radio-button label="300">Тонкое</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="Размер текста">
                <el-slider v-model="data.style.fontSize"></el-slider>
            </el-form-item>

            <el-form-item label="Цвет текста">
                <el-color-picker v-model="data.style.color"></el-color-picker>
            </el-form-item>

            <el-form-item label="Отступ сверху">
                <el-slider v-model="data.style.marginTop"></el-slider>
            </el-form-item>
            <el-form-item label="Отступ снизу">
                <el-slider v-model="data.style.marginBottom"></el-slider>
            </el-form-item>
        </template>

        <!--Маска-->
        <el-form-item v-if="data.type === 'phone'">
            <el-form-item label="Маска">
                <el-select v-model="data.options.maskValue" placeholder="Маска телефона" style="width: 100%;">
                    <el-option
                            v-for="mask in data.options.maskRules"
                            :key="mask.value"
                            :label="mask.label"
                            :value="mask.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form-item>


      <el-form-item
              label="Минимум"
              v-if="Object.keys(data.options).indexOf('min')>=0"
      >
        <el-input-number v-model="data.options.min" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item
              label="Максимум"
              v-if="Object.keys(data.options).indexOf('max')>=0"
      >
        <el-input-number v-model="data.options.max" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item
              label="Шаг"
              v-if="Object.keys(data.options).indexOf('step')>=0"
      >
        <el-input-number v-model="data.options.step" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item
              label="Мультисписок"
              v-if="data.type==='select' || data.type==='imgupload'"
      >
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <el-form-item
              label="Allow Half"
              v-if="Object.keys(data.options).indexOf('allowHalf')>=0"
      >
        <el-switch v-model="data.options.allowHalf"></el-switch>
      </el-form-item>
      <el-form-item
              label="Support transparency options"
              v-if="Object.keys(data.options).indexOf('showAlpha')>=0"
      >
        <el-switch v-model="data.options.showAlpha"></el-switch>
      </el-form-item>

        <el-form-item
              label="Показывать дополнительный текст"
              v-if="Object.keys(data.options).indexOf('showLabel')>=0"
      >
        <el-switch v-model="data.options.showLabel"></el-switch>
            <el-tooltip content="Установить разные значения, которые будут отображаться и передаваться." placement="top">
                <span class="el-prompt el-icon-question" type="primary"></span>
            </el-tooltip>
      </el-form-item>



      <!-- TODO: table config   START-->
      <!-- TODO: table config   END-->


        <!--Опции списка и радио кнопок-->
      <el-form-item
              label="Опции"
              v-if="Object.keys(data.options).indexOf('options')>=0"
      >
        <template>
          <template v-if="data.type ==='radio' || (data.type ==='select'&&!data.options.multiple)">
              <div class="faq_value" v-if="data.options.showLabel">
                  <div class="faq_value-list">Передаваемые <br>в форме</div>
                  <div class="faq_value-list">Отображаемые <br>в форме</div>
              </div>
            <el-radio-group v-model="data.options.defaultValue">
              <draggable
                      tag="ul"
                      :list="data.options.options"
                      v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                      handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-radio :label="item.value" style="margin-right: 5px;">
                    <el-input
                            :style="{'width': data.options.showLabel? '120px': '240px' }"
                            size="mini"
                            v-model="item.value"
                    ></el-input>
                    <el-input
                            style="width:120px;"
                            size="mini"
                            v-if="data.options.showLabel"
                            v-model="item.label"
                    ></el-input>
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;">
                    <i class="iconfont icon-bars"></i>
                  </i>
                  <el-button
                          @click="handleOptionsRemove(index)"
                          circle
                          plain
                          type="danger"
                          size="mini"
                          icon="el-icon-minus"
                          style="padding: 4px;margin-left: 5px;"
                  ></el-button>
                </li>
              </draggable>
            </el-radio-group>
          </template>

          <template v-if="data.type ==='checkbox' || (data.type ==='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">
                <div class="faq_value" v-if="data.options.showLabel">
                    <div class="faq_value-list">Передаваемые <br>в форме</div>
                    <div class="faq_value-list">Отображаемые <br>в форме</div>
                </div>
              <draggable
                      tag="ul"
                      :list="data.options.options"
                      v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                      handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-checkbox :label="item.value" style="margin-right: 5px;">
                    <el-input
                            :style="{'width': data.options.showLabel? '120px': '240px' }"
                            size="mini"
                            v-model="item.value"
                    ></el-input>
                    <el-input
                            style="width: 120px;"
                            size="mini"
                            v-if="data.options.showLabel"
                            v-model="item.label"
                    ></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;">
                    <i class="iconfont icon-bars"></i>
                  </i>
                  <el-button
                          @click="handleOptionsRemove(index)"
                          circle
                          plain
                          type="danger"
                          size="mini"
                          icon="el-icon-minus"
                          style="padding: 4px;margin-left: 5px;"
                  ></el-button>
                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddOption">Добавить опцию</el-button>
          </div>
        </template>
      </el-form-item>


        <!--Дата/время-->
      <template v-if="data.type === 'time' || data.type === 'date'">
        <el-form-item label="Range Time" v-if="data.type === 'time'">
          <el-switch v-model="data.options.isRange"></el-switch>
        </el-form-item>
        <el-form-item
                label="Default Value"
                v-if="data.type ==='time' && Object.keys(data.options).indexOf('isRange')>=0"
        >
          <el-time-picker
                  key="1"
                  style="width: 100%;"
                  v-if="!data.options.isRange"
                  v-model="data.options.defaultValue"
                  :arrowControl="data.options.arrowControl"
                  :value-format="data.options.format"
          ></el-time-picker>
          <el-time-picker
                  key="2"
                  v-if="data.options.isRange"
                  style="width: 100%;"
                  v-model="data.options.defaultValue"
                  is-range
                  :arrowControl="data.options.arrowControl"
                  :value-format="data.options.format"
          ></el-time-picker>
        </el-form-item>
      </template>

      <!--Картинка-->
      <template v-if="data.bgIcon">
        <el-form-item label="Иконка">
          <el-select v-model="data.className" placeholder="Выберите иконку">
            <el-option
                    v-for="icon in icons"
                    class="icon"
                    :class="'icon-' + icon.value"
                    :key="icon.value"
                    :label="icon.name"
                    :value="icon.value">
            </el-option>
          </el-select>
            <el-tooltip content="Установить фоновое изображение для элемента." placement="top">
                <span class="el-prompt el-icon-question" type="primary"></span>
            </el-tooltip>
        </el-form-item>
      </template>




      <template v-if="Object.keys(data.options).indexOf('readonly')>=0 && Object.keys(data.options).indexOf('required')>=0">
        <el-form-item label="Дополнительные атрибуты">
          <el-checkbox
                  v-model="data.options.disabled"
                  v-if="Object.keys(data.options).indexOf('disabled')>=0"
          >Disabled (нельзя редактировать поле)</el-checkbox>
            <el-checkbox
                    v-model="data.options.required"
                    v-if="Object.keys(data.options).indexOf('required')>=0"
            >Required (обязательное поле)</el-checkbox>
        </el-form-item>
      </template>
    </el-form>


  </div>
    <div v-else>
        <span>Выберите компонент для редактирования</span>
    </div>
</template>

<script>
  import Draggable from "vuedraggable";

  export default {
    components: {
      Draggable,
    },
    props: ["data"],
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
    computed: {
      show() {
        if (this.data && Object.keys(this.data).length > 0) {
          return true;
        }
        return false;
      },
      icons () {
        let defaultClass = 'cForm__input-icon ';
        return [
            { name: 'нет', value: '' },
            { name: 'user2', value: defaultClass + 'user2' },
            { name: 'user3', value: defaultClass+ 'user3' },
            { name: 'phone1', value: defaultClass+ 'phone1'},
            { name: 'user1', value: defaultClass+ 'phone2' },
            { name: 'phone3', value: defaultClass+ 'phone3' },
            { name: 'message1', value: defaultClass+ 'message1' },
            { name: 'message2', value: defaultClass+ 'message2' },
            { name: 'email1', value: defaultClass+ 'email1' },
            { name: 'email2', value: defaultClass+ 'email2' },
            { name: 'date', value: defaultClass+ 'date' },
            { name: 'clock', value: defaultClass+ 'clock' },
            { name: 'map', value: defaultClass+ 'map' }
        ]
      }
    },
    methods: {
      handleOptionsRemove(index) {
        if (this.data.type === "grid") {
          this.data.columns.splice(index, 1);
        } else {
          this.data.options.options.splice(index, 1);
        }
      },
      handleAddOption() {
        if (this.data.options.showLabel) {
          this.data.options.options.push({
            value: 'Новая опция',
            label: 'Новая опция'
          });
        } else {
          this.data.options.options.push({
            value: 'Новая опция'
          });
        }
      },
      handleAddColumn() {
        this.data.columns.push({
          span: "",
          list: []
        });
      },
      handleSelectMuliple(value) {
        if (value) {
          if (this.data.options.defaultValue) {
            this.data.options.defaultValue = [this.data.options.defaultValue];
          } else {
            this.data.options.defaultValue = [];
          }
        } else {
          if (this.data.options.defaultValue.length > 0) {
            this.data.options.defaultValue = this.data.options.defaultValue[0];
          } else {
            this.data.options.defaultValue = "";
          }
        }
      }
    }
  };
</script>


<style lang="scss">
    .el-select-dropdown__item.icon {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        position: relative;
        padding-left: 44px;
        &:before {
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            bottom: 0;
            width: 24px;
        }
        &.icon- {
            &phone1:before {
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAALBAMAAABfd7ooAAAALVBMVEVHcEwGBgYAAADAwMDU1NQPDw8nJyc3Nzd2dnb39/dYWFiBgYHk5ORLS0uYmJjEr0k7AAAAAXRSTlMAQObYZgAAADlJREFUCNdjcA9mAIIiDRAppA0ik1aCyKYFIPKgCIjkUJ8AJDmT1jwGUo6KShsYGJiDlAKAHF8xAwAn2gm7o3iZ6wAAAABJRU5ErkJggg==") left center no-repeat;
            }
            &phone2:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' widht='14' height='14'%3E%3Cpath d='M12.88 9.19a7.88 7.88 0 01-2.5-.4A1.18 1.18 0 009.27 9L7.7 10.21A8.61 8.61 0 013.79 6.3l1.15-1.53a1.12 1.12 0 00.27-1.14 8.23 8.23 0 01-.39-2.51A1.13 1.13 0 003.69 0H1.12A1.12 1.12 0 000 1.12 12.9 12.9 0 0012.88 14 1.12 1.12 0 0014 12.88v-2.57a1.12 1.12 0 00-1.12-1.12z' fill='%23afafaf'%3E%3C/path%3E%3C/svg%3E") left center no-repeat;
            }
            &phone3:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17 19' width='17' height='19'%3E%3Cpath d='M13.44 11.77a1.59 1.59 0 00-1.21-.62 1.64 1.64 0 00-1.23.62L9.86 13l-.27-.16-.36-.21a13.25 13.25 0 01-3-3 8.53 8.53 0 01-1-1.71c.3-.3.57-.61.84-.91l.3-.34a2 2 0 000-2.78l-1-1.09-.34-.39-.67-.74a1.61 1.61 0 00-1.2-.59A1.67 1.67 0 002 1.69L.79 3.07A3.12 3.12 0 000 4.94a8 8 0 00.46 3A18.2 18.2 0 003.22 13a17.42 17.42 0 005.63 5A8.11 8.11 0 0012 19h.22a2.6 2.6 0 002.08-1 7.16 7.16 0 01.63-.73l.47-.52a2.13 2.13 0 00.6-1.4 2 2 0 00-.58-1.35zM14.73 16l-.44.49c-.16.17-.47.51-.69.8a1.64 1.64 0 01-1.35.64h-.17a7.18 7.18 0 01-2.8-.93A16.37 16.37 0 014 12.34a16.74 16.74 0 01-2.58-4.8A6.34 6.34 0 011 5a2 2 0 01.5-1.19l1.21-1.34a.75.75 0 01.54-.29.75.75 0 01.53.28c.22.23.43.47.64.72l.35.39 1 1.1a.82.82 0 010 1.24l-.31.34a29 29 0 01-.9 1 .9.9 0 00-.19.91 9.35 9.35 0 001.16 2.11 13.85 13.85 0 003.19 3.24c.14.1.29.18.44.27l.35.21h.05a.78.78 0 00.35.1.74.74 0 00.55-.28l1.23-1.37a.76.76 0 01.54-.3.7.7 0 01.52.29l2 2.21a.84.84 0 01-.02 1.36zM9.19 4.52A4.43 4.43 0 0111.67 6 5.31 5.31 0 0113 8.72a.5.5 0 00.48.45h.08a.52.52 0 00.4-.62 6.45 6.45 0 00-1.55-3.35 5.41 5.41 0 00-3-1.74.49.49 0 00-.56.44.53.53 0 00.34.62zM17 8.38a10.58 10.58 0 00-2.56-5.51A8.82 8.82 0 009.49 0a.5.5 0 00-.56.44.54.54 0 00.4.62 8 8 0 014.42 2.56A9.55 9.55 0 0116 8.56a.5.5 0 00.47.45h.09a.53.53 0 00.44-.63z' fill='%23010101'%3E%3C/path%3E%3C/svg%3E") left center no-repeat;
            }
            &user1:before {
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALBAMAAAC5XnFsAAAAIVBMVEVHcEwBAQH29vZYWFh9fX2RkZEfHx8nJyfV1dXp6elnZ2eFBNCqAAAAAXRSTlMAQObYZgAAAEFJREFUCNdjYGAyFFZgYGBgFRQMAFJcgoILgBSzoKABguIUFJwApBgcRUAkU6AoUAOTm6BgigJDmyAQZDAUgihxAN2jBtj/Ui0DAAAAAElFTkSuQmCC") left center no-repeat;
            }
            &user2:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='16.78'%3E%3Cg fill='%23afafaf'%3E%3Cpath d='M6.9 8.13a3.87 3.87 0 002.84-1.19 3.96 3.96 0 001.18-2.87 3.96 3.96 0 00-1.18-2.88 4 4 0 00-5.7 0 3.96 3.96 0 00-1.17 2.88 3.96 3.96 0 001.18 2.87 3.87 3.87 0 002.84 1.2zm0 0'%3E%3C/path%3E%3Cpath d='M13.97 12.88a10.1 10.1 0 00-.14-1.07 8.45 8.45 0 00-.26-1.07 5.32 5.32 0 00-.44-1 3.77 3.77 0 00-.66-.87 2.91 2.91 0 00-.95-.6 3.26 3.26 0 00-1.21-.22 1.23 1.23 0 00-.66.28l-.68.44a3.9 3.9 0 01-.89.4 3.42 3.42 0 01-2.16 0 3.9 3.9 0 01-.89-.4l-.68-.44a1.22 1.22 0 00-.66-.28 3.26 3.26 0 00-1.21.22 2.9 2.9 0 00-.95.6 3.77 3.77 0 00-.66.87 5.33 5.33 0 00-.44 1 8.47 8.47 0 00-.26 1.07 10.07 10.07 0 00-.14 1.07c-.02.32-.03.65-.03 1A2.81 2.81 0 00.83 16a2.97 2.97 0 002.13.78h8.08a2.97 2.97 0 002.13-.78 2.81 2.81 0 00.83-2.12c0-.34-.01-.68-.03-1zm0 0'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") left center no-repeat;
            }
            &user3:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 19 23' width='19' height='23'%3E%3Cg fill='%23010101'%3E%3Cpath d='M9.42 12.39h.15a4.2 4.2 0 003.26-1.45c1.78-2.07 1.48-5.61 1.45-5.94A4.9 4.9 0 0012 .67 5.11 5.11 0 009.55 0h-.08A5.12 5.12 0 007 .65 4.9 4.9 0 004.71 5c0 .34-.33 3.88 1.45 5.95a4.18 4.18 0 003.26 1.44zM6 5.11c.1-3.45 2.46-3.82 3.47-3.82 1.25 0 3.37.55 3.52 3.78s.33 3.27-1.14 5a3 3 0 01-2.38 1 3 3 0 01-2.38-1C5.63 8.39 5.94 5.14 6 5.11z'%3E%3C/path%3E%3Cpath d='M19 18.27v-.12c0-.95-.08-3.15-2.09-3.86A13.52 13.52 0 0113 12.47a.61.61 0 00-.87.16.64.64 0 00.16.89 14 14 0 004.22 2c1.08.39 1.2 1.58 1.23 2.67v.11a8.92 8.92 0 01-.09 1.48 16.77 16.77 0 01-8.15 1.94 16.73 16.73 0 01-8.16-2 8.73 8.73 0 01-.09-1.47v-.12c0-1.09.15-2.27 1.23-2.67a14.39 14.39 0 004.22-2 .65.65 0 00.16-.9.62.62 0 00-.86-.1 12.79 12.79 0 01-3.84 1.8C.09 15 0 17.19 0 18.13a.45.45 0 010 .12 7.49 7.49 0 00.24 2.15.55.55 0 00.24.3 17 17 0 009 2.28 17.19 17.19 0 009-2.28.66.66 0 00.24-.3 8.07 8.07 0 00.28-2.13z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") left center no-repeat;
            }
            &message1:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 15' width='16' height='15'%3E%3Cg fill='%23212121'%3E%3Cpath d='M13.25 0H2.85A2.8 2.8 0 000 2.79V9a2.8 2.8 0 002.85 2.79h6.57l3.18 3.1c.11.11.22.11.44.11h.21a.59.59 0 00.33-.54v-2.67A2.69 2.69 0 0016 9.11V2.89A2.67 2.67 0 0013.25 0zM15 9a1.67 1.67 0 01-1.65 1.61h-.21a.51.51 0 00-.55.53v1.93l-2.41-2.36c-.11-.1-.22-.1-.44-.1H3A1.67 1.67 0 011.31 9V2.79A1.67 1.67 0 013 1.18h10.4A1.67 1.67 0 0115 2.79z'%3E%3C/path%3E%3Cpath d='M12.27 3.86H4.05a.5.5 0 00-.54.53.51.51 0 00.54.54h8.22a.52.52 0 00.55-.54.58.58 0 00-.55-.53zm0 3H4.05a.5.5 0 00-.54.53.51.51 0 00.54.54h8.22a.52.52 0 00.55-.54.7.7 0 00-.55-.53z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") left center no-repeat;
            }
            &message2:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 15' width='16' height='15'%3E%3Cg fill='%23AFAFAF'%3E%3Cpath d='M13.25 0H2.85A2.8 2.8 0 000 2.79V9a2.8 2.8 0 002.85 2.79h6.57l3.18 3.1c.11.11.22.11.44.11h.21a.59.59 0 00.33-.54v-2.67A2.69 2.69 0 0016 9.11V2.89A2.67 2.67 0 0013.25 0zM15 9a1.67 1.67 0 01-1.65 1.61h-.21a.51.51 0 00-.55.53v1.93l-2.41-2.36c-.11-.1-.22-.1-.44-.1H3A1.67 1.67 0 011.31 9V2.79A1.67 1.67 0 013 1.18h10.4A1.67 1.67 0 0115 2.79z'%3E%3C/path%3E%3Cpath d='M12.27 3.86H4.05a.5.5 0 00-.54.53.51.51 0 00.54.54h8.22a.52.52 0 00.55-.54.58.58 0 00-.55-.53zm0 3H4.05a.5.5 0 00-.54.53.51.51 0 00.54.54h8.22a.52.52 0 00.55-.54.7.7 0 00-.55-.53z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") left center no-repeat;
            }
            &date:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewbox='0 0 19 19' width='19' height='19'%3E%3Cpath d='M18.6 3.1a1.5 1.5 0 0 0-1-.4H16v-1a1.6 1.6 0 0 0-.6-1.2 1.9 1.9 0 0 0-1.3-.5h-.7a1.9 1.9 0 0 0-1.3.5 1.6 1.6 0 0 0-.5 1.2v1H7.3v-1A1.6 1.6 0 0 0 6.8.5 1.9 1.9 0 0 0 5.5 0h-.8a1.9 1.9 0 0 0-1.2.5 1.6 1.6 0 0 0-.6 1.2v1H1.5a1.5 1.5 0 0 0-1 .4 1.2 1.2 0 0 0-.5 1v13.5a1.3 1.3 0 0 0 .5 1 1.5 1.5 0 0 0 1 .4h16a1.5 1.5 0 0 0 1-.4 1.3 1.3 0 0 0 .5-1V4.1a1.2 1.2 0 0 0-.4-1zM13 1.7a.3.3 0 0 1 .2-.3.4.4 0 0 1 .2 0h.7a.4.4 0 0 1 .3 0 .3.3 0 0 1 .1.3v3a.3.3 0 0 1 0 .3.3.3 0 0 1-.3 0h-.8a.3.3 0 0 1-.2 0 .3.3 0 0 1-.2-.2zm-8.7 0a.3.3 0 0 1 0-.3.4.4 0 0 1 .4 0h.7a.4.4 0 0 1 .2 0 .3.3 0 0 1 .2.3v3a.3.3 0 0 1-.2.3.3.3 0 0 1-.2.1h-.8a.3.3 0 0 1-.2-.1.3.3 0 0 1-.1-.2zm13.1 16h-16v-11h16z' fill='%23010101'%3E%3C/path%3E%3C/svg%3E") left center no-repeat;
            }
            &map:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewbox='0 0 14 18' width='14' height='18'%3E%3Cpath d='M7 0a6.8 6.8 0 0 0-7 6.5c0 4.5 6.3 11 6.5 11.3a.7.7 0 0 0 1 0C7.7 17.5 14 11 14 6.5A6.8 6.8 0 0 0 7 0zm0 9.8a3.4 3.4 0 0 1-3.5-3.3A3.4 3.4 0 0 1 7 3.2a3.4 3.4 0 0 1 3.5 3.3A3.4 3.4 0 0 1 7 9.8z' fill='%23010101'%3E%3C/path%3E%3C/svg%3E") left center no-repeat;
            }
            &clock:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' width='14' height='14'%3E%3Cg fill='%23010101'%3E%3Cpath d='M7 0a7 7 0 107 7 7 7 0 00-7-7zm0 13.12A6.12 6.12 0 1113.12 7 6.12 6.12 0 017 13.12z'%3E%3C/path%3E%3Cpath d='M7.44 2.63h-.88v4.55l2.76 2.75.61-.61-2.49-2.5z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")  left center no-repeat;
            }
            &email1:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.4 10.6' width='14.4' height='10.6'%3E%3Cpath d='M14.3 8.8a2.92 2.92 0 0 1-.2.9l-4.5-5L14.1.8a1.61 1.61 0 0 1 .3.9v7.1zM7.2 5.6L13.4.2a2.35 2.35 0 0 0-.8-.2H1.8a1.88 1.88 0 0 0-.8.2zm1.7-.4L7.5 6.5a.37.37 0 0 1-.3.1.37.37 0 0 1-.3-.1L5.5 5.2.9 10.3a1.61 1.61 0 0 0 .9.3h10.7a1.4 1.4 0 0 0 .9-.3zM.3.7a1.61 1.61 0 0 0-.3.9v7.1a2.92 2.92 0 0 0 .2.9l4.5-5z'%3E%3C/path%3E%3C/svg%3E") left center no-repeat;
            }
            &email2:before {
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 14' widht='18' height='14'%3E%3Cpath d='M18 1.2v-.12A1.18 1.18 0 0016.88 0H1.13A1.18 1.18 0 000 1.08v11.84A1.18 1.18 0 001.13 14h15.75A1.18 1.18 0 0018 12.92v-.12V1.27 1.2zm-1.5.07l-6.26 5.18L9 7.48l-1.24-1-6.25-5.21zM1.13 2.53L6.52 7l-5.39 4.47zm.38 10.2l6-4.94 1.2 1a.51.51 0 00.66 0l1.2-1 6 4.94zm15.37-1.26L11.48 7l5.4-4.47z' fill='%23333'%3E%3C/path%3E%3C/svg%3E") left center no-repeat;
            }
        }
    }


    .faq_value {
        padding-left: 25px;
        display: flex;
        &-list {
            width: 120px;
            text-align: center;
            font-size: 14px;
            line-height: 1.2;
            color: #000;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            background: #f8f8f8;
            padding: 5px 0;
        }
    }
</style>
