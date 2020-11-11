<template>
  <div class="form-config-container">
    <el-form label-position="top">

      <el-tabs tab-position="top">
        <el-tab-pane label="Форма">

          <el-form-item label="Стиль">
            <el-select v-model="data.formStyle" placeholder="Стиль формы">
              <el-option label="Базовый" value="basic"></el-option>
              <el-option label="Горизонтальный" value="horizontal"></el-option>
              <el-option label="В ряд" value="inline"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Ширина">
            <el-input v-model="data.formMaxWidth"></el-input>
          </el-form-item>

          <el-form-item label="Цвет заливки">
            <el-color-picker v-model="data.formBgColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Радиус скругления">
            <el-slider v-model="data.formBorderRadius"></el-slider>
          </el-form-item>

          <el-form-item label="Размер обводки">
            <el-slider v-model="data.formBorderWidth"></el-slider>
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
            <el-select v-model="data.formShadowStyle" placeholder="Тень">
              <el-option label="Нет" value="no"></el-option>
              <el-option label="Вариант 1" value="form-shadow1"></el-option>
              <el-option label="Вариант 2" value="form-shadow1"></el-option>
              <el-option label="Вариант 3" value="form-shadow1"></el-option>
            </el-select>
          </el-form-item>



        </el-tab-pane>
        <el-tab-pane label="Поля">
          <el-form-item label="Ширина">
            <el-input v-model="data.inputWidth"></el-input>
          </el-form-item>

          <el-form-item label="Высота">
            <el-input v-model="data.inputHeight"></el-input>
          </el-form-item>

          <el-form-item label="Цвет заливки">
            <el-color-picker v-model="data.inputBgColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Цвет текста">
            <el-color-picker v-model="data.inputColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Радиус скругления">
            <el-slider v-model="data.inputBorderRadius"></el-slider>
          </el-form-item>

          <el-form-item label="Размер обводки">
            <el-slider v-model="data.inputBorderWidth"></el-slider>
          </el-form-item>

          <el-form-item label="Стиль обводки">
            <el-select v-model="data.inputBorderStyle" placeholder="Стиль обводки">
              <el-option label="Сплошная" value="solid"></el-option>
              <el-option label="Пунктирная" value="dashed"></el-option>
              <el-option label="Точечная" value="dotted"></el-option>
              <el-option label="Двойная" value="double"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Цвет обводки">
            <el-color-picker v-model="data.inputBorderColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="Тень">
            <el-select v-model="data.inputShadowStyle" placeholder="Тень">
              <el-option label="Нет" value="no"></el-option>
              <el-option label="Вариант 1" value="v1"></el-option>
              <el-option label="Вариант 2" value="v2"></el-option>
              <el-option label="Вариант 3" value="v3"></el-option>
            </el-select>
          </el-form-item>


        </el-tab-pane>
        <el-tab-pane label="Текст">
          <el-form-item label="Начертание">
            <el-select v-model="data.labelTitleWeight" placeholder="Начертание">
              <el-option label="Полужирный" value="bold"></el-option>
              <el-option label="Нормальный" value="normal"></el-option>
              <el-option label="Тонкий" value="300"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Размер текста заголовков полей">
            <el-slider v-model="data.labelTitleSize"></el-slider>
          </el-form-item>

          <el-form-item label="Цвет заголовков полей">
            <el-color-picker v-model="data.labelTitleColor"></el-color-picker>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="Кнопка">Кнопка</el-tab-pane>
      </el-tabs>









    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
