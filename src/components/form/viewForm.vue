<template>
    <div class="main__block-form main__block-form-view">
        <div class="cForm-wrapper" :class="data.config.formShadowStyle">
            <div class="cForm" :class="[data.config.formStyle]">
                <template v-for="(element, index) in data.list">
                    <items-template
                            v-if="element && element.key"
                            :key="element.key"
                            :element="element"
                            :index="index"
                            :data="data"
                    >
                    </items-template>
                </template>
            </div>
        </div>
    </div>
</template>


<script>
    import itemsTemplate from "./itemsTemplate";

    export default {
        props: ["element", "select", "index", "data"],
        components: {
            itemsTemplate
        },
    }
</script>
