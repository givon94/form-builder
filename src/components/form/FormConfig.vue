<template>
  <div class="form-config-container">
    <el-form label-position="top">

      <el-tabs tab-position="top">
        <el-tab-pane label="Форма">

          <el-form-item label="Название формы">
            <el-input class="small" v-model="data.formValue"></el-input>
            <el-tooltip content="Значение будет передаваться как тема формы" placement="top">
              <span class="el-prompt el-icon-question" type="primary"></span>
            </el-tooltip>
          </el-form-item>


          <el-form-item label="Стиль">
            <el-radio-group v-model="data.formStyle">
              <el-radio-button label="basic">Базовый</el-radio-button>
              <el-radio-button label="horizontal">Горизонтальный</el-radio-button>
              <el-radio-button label="inline">В ряд</el-radio-button>
            </el-radio-group>
            <el-tooltip content="Варианты расположения элементов в форме" placement="top">
              <span class="el-prompt el-icon-question" type="primary"></span>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="Заголовки полей">
            <el-checkbox v-model="data.addLabelTitle" border size="medium">Отображать заголовки</el-checkbox>
            <el-tooltip content="Отображение заголовков над полем ввода" placement="top">
              <span class="el-prompt el-icon-question" type="primary"></span>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="Ширина">
            <el-input v-model="data.formMaxWidth"></el-input>
          </el-form-item>

          <el-form-item label="Отступ сверху/снизу">
            <el-slider v-model="data.formPaddingVertical"></el-slider>
          </el-form-item>

          <el-form-item label="Отступ справа/слева">
            <el-slider v-model="data.formPaddingHorizontal"></el-slider>
          </el-form-item>

          <el-form-item label="Цвет заливки" label-position="left">
            <el-color-picker v-model="data.formBgColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Радиус скругления">
            <el-slider v-model="data.formBorderRadius"></el-slider>
          </el-form-item>

          <el-form-item label="Размер обводки">
            <el-slider :max="15" v-model="data.formBorderWidth"></el-slider>
          </el-form-item>

          <el-form-item label="Стиль обводки">
            <el-select v-model="data.formBorderStyle" placeholder="Стиль обводки">
              <el-option label="Сплошная" value="solid"></el-option>
              <el-option label="Пунктирная" value="dashed"></el-option>
              <el-option label="Точечная" value="dotted"></el-option>
              <el-option label="Двойная" value="double"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Цвет обводки">
            <el-color-picker v-model="data.formBorderColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Тень">
            <el-select v-model="data.formShadow" placeholder="Тень">
              <el-option label="Нет" value="no"></el-option>
              <el-option label="Тень 1" value="cForm-shadow1"></el-option>
              <el-option label="Тень 2" value="cForm-shadow2"></el-option>
              <el-option label="Тень 3" value="cForm-shadow3"></el-option>
              <el-option label="Тень 4" value="cForm-shadow4"></el-option>
              <el-option label="Тень 5" value="cForm-shadow5"></el-option>
              <el-option label="Тень 6" value="cForm-shadow6"></el-option>
              <el-option label="Тень 7" value="cForm-shadow7"></el-option>
              <el-option label="Тень 8" value="cForm-shadow8"></el-option>
              <el-option label="Тень 9" value="cForm-shadow9"></el-option>
            </el-select>
            <el-tooltip content="Выберите нужны стиль тени" placement="top">
              <span class="el-prompt el-icon-question" type="primary"></span>
            </el-tooltip>
          </el-form-item>



        </el-tab-pane>
        <el-tab-pane label="Поля ввода">
          <el-form-item label="Ширина">
            <el-input v-model="data.labelWidth"></el-input>
          </el-form-item>

          <el-form-item v-if="data.formStyle === 'inline'" label="Выравнивание">
            <el-radio-group v-model="data.labelInlinePosition">
              <el-radio-button label="align_top">Вверху</el-radio-button>
              <el-radio-button label="align_center">Центру</el-radio-button>
              <el-radio-button label="align_bottom">Низу</el-radio-button>
              <el-radio-button label="align_baseline">Базовой линии</el-radio-button>
            </el-radio-group>
            <el-tooltip content="Выравнивание элементов относительно друг друга" placement="top">
              <span class="el-prompt el-icon-question" type="primary"></span>
            </el-tooltip>
          </el-form-item>


          <el-form-item label="Высота">
            <el-input v-model="data.inputHeight"></el-input>
          </el-form-item>

          <el-form-item label="Отступ сверху/снизу между полями">
            <el-slider v-model="data.labelBlockPaddingColumn"></el-slider>
          </el-form-item>

          <el-form-item label="Отступ слева/справа между полями">
            <el-slider v-model="data.labelBlockPaddingRow"></el-slider>
          </el-form-item>

          <el-form-item label="Цвет заливки поля">
            <el-color-picker v-model="data.inputBgColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Начертание">
            <el-radio-group v-model="data.inputTitleWeight">
              <el-radio-button label="700">Полужирное</el-radio-button>
              <el-radio-button label="400">Среднее</el-radio-button>
              <el-radio-button label="300">Тонкое</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Размер текста">
            <el-slider :max="40" v-model="data.inputTitleSize"></el-slider>
          </el-form-item>

          <el-form-item label="Цвет текста">
            <el-color-picker v-model="data.inputColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Радиус скругления">
            <el-slider v-model="data.inputBorderRadius"></el-slider>
          </el-form-item>

          <el-form-item label="Стиль обводки">
            <el-select v-model="data.inputBorderStyle" placeholder="Стиль обводки">
              <el-option label="Сплошная" value="solid"></el-option>
              <el-option label="Пунктирная" value="dashed"></el-option>
              <el-option label="Точечная" value="dotted"></el-option>
              <el-option label="Двойная" value="double"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Размер обводки">
            <el-slider :max="15" v-model="data.inputBorderWidth"></el-slider>
          </el-form-item>

          <el-form-item label="Цвет обводки">
            <el-color-picker v-model="data.inputBorderColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Тень">
            <el-select v-model="data.inputShadowStyle" placeholder="Тень">
              <el-option label="Нет" value="no"></el-option>
              <el-option label="Вариант 1" value="cForm-input-shadow1"></el-option>
              <el-option label="Вариант 2" value="cForm-input-shadow2"></el-option>
              <el-option label="Вариант 3" value="cForm-input-shadow3"></el-option>
            </el-select>
          </el-form-item>


        </el-tab-pane>
        <el-tab-pane label="Текст">
          <el-form-item label="Максимальная ширина, %">
            <el-slider v-model="data.labelTitleWidth"></el-slider>
          </el-form-item>


          <el-form-item label="Начертание">
            <el-radio-group v-model="data.labelTitleWeight">
              <el-radio-button label="700">Полужирное</el-radio-button>
              <el-radio-button label="400">Среднее</el-radio-button>
              <el-radio-button label="300">Тонкое</el-radio-button>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="Размер текста заголовков полей">
            <el-slider :max="40" v-model="data.labelTitleSize"></el-slider>
          </el-form-item>

          <el-form-item label="Цвет заголовков полей">
            <el-color-picker v-model="data.labelTitleColor"></el-color-picker>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="Кнопка">

          <el-form-item label="Положение">
            <el-radio-group v-model="data.buttonPosition">
              <el-radio-button label="left">Слева</el-radio-button>
              <el-radio-button label="center">Поцентру</el-radio-button>
              <el-radio-button label="right">Справа</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Ширина">
            <el-slider v-model="data.buttonWidth"></el-slider>
          </el-form-item>

          <el-form-item label="Высота">
            <el-slider v-model="data.buttonHeight"></el-slider>
          </el-form-item>

          <el-form-item label="Цвет заливки" label-position="left">
            <el-color-picker v-model="data.buttonBgColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Размер текста">
            <el-slider :max="40" v-model="data.buttonTextSize"></el-slider>
          </el-form-item>

          <el-form-item label="Начертание">
            <el-radio-group v-model="data.buttonTextWeight">
              <el-radio-button label="700">Полужирное</el-radio-button>
              <el-radio-button label="400">Среднее</el-radio-button>
              <el-radio-button label="300">Тонкое</el-radio-button>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="Цвет текста">
            <el-color-picker v-model="data.buttonTextColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Радиус скругления">
            <el-slider v-model="data.buttonBorderRadius"></el-slider>
          </el-form-item>

          <el-form-item label="Размер обводки">
            <el-slider :max="15" v-model="data.buttonBorderWidth"></el-slider>
          </el-form-item>

          <el-form-item label="Стиль обводки">
            <el-select v-model="data.buttonBorderStyle" placeholder="Стиль обводки">
              <el-option label="Сплошная" value="solid"></el-option>
              <el-option label="Пунктирная" value="dashed"></el-option>
              <el-option label="Точечная" value="dotted"></el-option>
              <el-option label="Двойная" value="double"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Цвет обводки">
            <el-color-picker v-model="data.buttonBorderColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Анимация эффект волны">
            <el-switch v-model="data.buttonAnimation"></el-switch>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data'],
}
</script>


<style lang="scss">
  .form-config-container  .el-tabs__content {
    overflow: visible;
  }

  .el-input.small {
    width: calc(100% - 30px) !important;
  }

  .el-prompt {
    color: #409EFF;
    font-size: 20px;
    margin-left: 10px;
  }
</style>
