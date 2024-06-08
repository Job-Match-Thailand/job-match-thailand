<template>
  <div>
    <h2>Merchant(s)</h2>
    <v-card v-for="item in items" :key="item.id" class="mb-2 py-4">
      <v-row>
        <v-col cols="2" class="text-center align-self-center">
          <v-avatar size="84" color="grey"/>
        </v-col>
        <v-col cols="8">
          <h3 class="title">{{item.name}}</h3>
          <span>{{item.address}}</span><br>
          <span>{{item.sub_district}} {{item.district}} {{item.province}}</span>
        </v-col>
        <v-col cols="2" class="text-center align-self-center">
          <v-btn icon color="success" @click="$router.push(`/merchant/edit/${item.id}`)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-btn color="success" @click="$router.push('/merchant/add/')">สร้างร้านค้า</v-btn>
  </div>
</template>

<script>
export default {
  name: "MerchantList",
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetchMerchant()
  },
  methods: {
    fetchMerchant() {
      this.$axios.get('/api/v1/merchant/')
        .then(res => {
          this.items = res.data
        })
        .catch(e => console.error(e))
    },
  }
}
</script>

<style scoped>

</style>
