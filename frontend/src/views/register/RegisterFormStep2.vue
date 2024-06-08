<template>
    <div style="padding: 5px">
      <h2 class="text-center">ขั้นตอนที่ 2</h2>
      <h3 class="text-center">การใช้งานของคุณ</h3>
      <v-row class="text-center my-10">
        <v-col cols="6">
          <v-card elevation="2" class="pa-10">
            เจ้าของร้าน / เจ้าของธุรกิจ
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="2" class="pa-10">
            เจ้าของร้าน / เจ้าของธุรกิจ
          </v-card>
        </v-col>
        <v-col cols="12">
          <link @click="$router.push('/profile')">ข้ามไปก่อน</link>
        </v-col>
      </v-row>
    </div>
</template>

<script>
export default {
    props: {
        form: {
            type: Object,
        }
    },
  data() {
      return {
        select: null
      }
  },
  methods: {
      updateForm(value) {
        console.log(value)
        // this.$emit("update", value)
      }
  }
}
</script>
