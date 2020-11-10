<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item >
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="left">Влево</el-radio-button>
          <el-radio-button label="right">Вправо</el-radio-button>
          <el-radio-button label="top">Вверх</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
      </el-form-item>

      <el-form-item >
        <el-radio-group v-model="data.size">
          <el-radio-button label="medium">Средний</el-radio-button>
          <el-radio-button label="small">Маленький</el-radio-button>
          <el-radio-button label="mini">Мини</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
