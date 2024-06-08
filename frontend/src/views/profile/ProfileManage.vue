<template>
  <v-container>
    <template v-if="user">
<!--      <h1 class="text-center">Profile Manage</h1>-->
      <h1 class="text-center">{{user.first_name}} {{user.last_name}}</h1>
      <h3 class="text-center"><v-icon>mdi-phone</v-icon>{{user.mobile}}</h3>
      <MerchantList/>
      <hr class="my-4">
      <h2>Profile(s)</h2>
    </template>
  </v-container>

</template>

<script>
import {fetchUser} from '../../utils/auth'
import MerchantList from "@/views/merchant/MerchantList";
export default {
  name: "ProfileManage",
  components: {MerchantList},
  created() {
    fetchUser()
  },
  computed: {
    user() {
      return this.$store.state.user || null
    }
  }
}
</script>

<style scoped>

</style>
