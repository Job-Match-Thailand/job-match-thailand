<template>
    <v-card>
      <h2 class="text-center">ขั้นตอนแรก</h2>
      <h3 class="text-center">ลงทะเบียนผู้ใช้ก่อน</h3>
        <v-form ref="form" class="mt-5">
            <v-row row wrap>
                <v-col cols="12">
                    <v-text-field :value="form.fname" label="ชื่อ" @update:modelValue="$emit('update',{ fname: $event })"/>
                </v-col>
                <v-col cols="12">
                    <v-text-field label="นามสกุล"/>
                </v-col>
                <v-col cols="12">
                    <v-text-field label="เบอร์"/>
                </v-col>
            </v-row>
        </v-form>
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
      }
  }
}
</script>
