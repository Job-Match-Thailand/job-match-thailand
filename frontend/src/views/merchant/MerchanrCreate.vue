<template>
  <v-container>
    <MerchantForm :form="form" @update="updateForm($event)" @submit="submit()"/>
  </v-container>
</template>

<script>
import MerchantForm from "@/views/merchant/MerchantForm";
export default {
  name: "MerchanrCreate",
  components: {MerchantForm},
  data() {
    return {
      form: {
        name: '',
        description: '',
        image: '',
        tel: '',
        type: '',
        address: '',
        sub_district: '',
        district: '',
        province: '',
        post_code: ''
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getMerchant()
    }
  },
  methods: {
    updateForm(data) {
      Object.assign(this.form, data)
    },
    getMerchant() {
      this.$axios.get(`/api/v1/merchant/${this.$route.params.id}/`)
      .then(res=> {
        Object.assign(this.form, res.data)
      }).catch(e => console.error(e))
    },
    submit() {
      if (this.$route.params.id) {
        this.$axios.put(`/api/v1/merchant/${this.$route.params.id}/`, this.form)
      .then(res=> {
        this.$router.push('/profile')
      }).catch(e => console.error(e))
      } else {
        this.$axios.post('/api/v1/merchant/', this.form)
      .then(res=> {
        this.$router.push('/profile')
      }).catch(e => console.error(e))
      }
    }
  }
}
</script>

<style scoped>

</style>
