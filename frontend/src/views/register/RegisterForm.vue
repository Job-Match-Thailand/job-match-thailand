<template>
    <v-container>
        <v-stepper :items="['Step 1', 'Step 2', 'Step 3']" v-model="step" hide-actions>
          {{form}}
            <template v-slot:item.1>
                <RegisterFormStep1 :form="form" @update="updateForm($event)"/>
            </template>

            <template v-slot:item.2>
                <RegisterFormStep2 :form="form" @update="updateForm($event)"/>
            </template>

            <template v-slot:item.3>
                <RegisterFormStep3 :form="form" @update="updateForm($event)"/>
            </template>
        </v-stepper>
    </v-container>
</template>

<script>
import RegisterFormStep1 from './RegisterFormStep1.vue'
import RegisterFormStep2 from './RegisterFormStep2.vue'
import RegisterFormStep3 from './RegisterFormStep3.vue'
export default {
    components: {RegisterFormStep1, RegisterFormStep2, RegisterFormStep3},
    data() {
        return {
            form:{
                first_name: '',
                last_name: '',
                mobile: '',
              type: ''
            },
            step: 1
        }
    },
    mounted() {
        // let line_data = localStorage.getItem(`LIFF_STORE:${process.env.VITE_LIFF_ID}:context`)
    },
    methods: {
      updateForm(data) {
        Object.assign(this.form, data)
          // this.form = {...this.form, ...data}
      }
    }
}
</script>

<style>

</style>
