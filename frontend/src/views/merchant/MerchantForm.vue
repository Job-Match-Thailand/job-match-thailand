<template>
  <v-form ref="form">
  <v-card>
    Mechant Card
    {{form}}
    <v-card-text>

        <v-row>
          <v-col cols="12"><h3>ข้อมูลร้านค้า</h3></v-col>
      <v-col cols="12">
        {{form.name}}
        <v-text-field :model-value="form.name" label="ชื่อ" @update:modelValue="$emit('update',{ name: $event })"/>
      </v-col>
        <v-col cols="12">
        <v-select :items="type_options" item-title="name" item-value="id" :model-value="form.type" label="ประเภท" rows="2" @update:modelValue="$emit('update',{ type: $event })"/>
      </v-col>
        <v-col cols="12">
        <v-textarea :model-value="form.description" label="รายละเอียด" rows="2" @update:modelValue="$emit('update',{ description: $event })"/>
      </v-col>
        <v-col cols="12">
        <v-text-field :model-value="form.image" label="url รูป" rows="2" @update:modelValue="$emit('update',{ image: $event })"/>
      </v-col>
        <v-col cols="12">
        <v-text-field :model-value="form.tel" label="เบอร์ติดต่อ" rows="2" @update:modelValue="$emit('update',{ tel: $event })"/>
      </v-col>
          <v-col cols="12"><h3>ที่อยู่ร้านค้า</h3></v-col>
         <v-col cols="12">
           <v-textarea label="ที่อยู่" :model-value="form.address" @update:modelValue="$emit('update',{ address: $event })"/></v-col>
        <v-col cols="12"><v-text-field label="ตำบล" :model-value="form.sub_district" @update:modelValue="$emit('update',{ sub_district: $event })"/></v-col>
        <v-col cols="12"><v-text-field label="อำเภอ" :model-value="form.district" @update:modelValue="$emit('update',{ district: $event })"/></v-col>
        <v-col cols="12"><v-text-field label="จังหวัด" :model-value="form.province" @update:modelValue="$emit('update',{ province: $event })"/></v-col>
        <v-col cols="12"><v-text-field label="รหัส" :model-value="form.post_code" @update:modelValue="$emit('update',{ post_code: $event })"/></v-col>
    </v-row>


    </v-card-text>
    <v-card-actions><v-spacer/>
      <v-btn flat color="success" @click="$emit('submit')">สร้างร้านค้า</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>

<script>
export default {
  name: "MerchantForm",
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      type_options: []
    }
  },
  created() {
    this.fetchMerchantType()
  },
  methods: {
    updateForm(value) {
      this.$emit("update", value)
    },
    fetchMerchantType() {
      this.$axios.get('/api/v1/merchant/type/')
        .then(res=> {
          this.type_options = res.data
        }).catch(e => console.error(e))
    },
  }
}
</script>

<style scoped>

</style>
