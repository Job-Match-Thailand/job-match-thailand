<template>
    <v-card>
      <h2 class="text-center">ขั้นตอนแรก</h2>
      <h3 class="text-center">ลงทะเบียนผู้ใช้ก่อน</h3>
        <v-form ref="form" class="mt-5">
            <v-row row wrap>
                <v-col cols="12">
                    <v-text-field :value="form.first_name" label="ชื่อ" @update:modelValue="$emit('update',{ first_name: $event })"/>
                </v-col>
                <v-col cols="12">
                    <v-text-field :value="form.last_name" label="นามสกุล" @update:modelValue="$emit('update',{ last_name: $event })"/>
                </v-col>
                <v-col cols="12">
                    <v-text-field :value="form.mobile" label="เบอร์" @update:modelValue="$emit('update',{ mobile: $event })"/>
                </v-col>
            </v-row>
        </v-form>
        <v-card-actions>
            <v-spacer/>
            <v-btn variant="flat" color="success" @click="register()">ลงทะเบียน</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        form: {
            type: Object,
        }
    },
  methods: {
      updateForm(value) {
        this.$emit("update", value)
      },
      async register() {
        try {
            let line_data = JSON.parse(localStorage.getItem(`LIFF_STORE:${this.$env.VITE_LIFF_ID}:context`))
            let r = await this.$axios.post('/api/v1/users/', {...this.form, line_token: line_data.userId})
            console.log(r.data)
        } catch (error) {
            console.error(error)
        }
      }
  }
}
</script>
