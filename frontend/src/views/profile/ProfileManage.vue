<template>
  <v-container>
    <h1>Profile Manage</h1>
  </v-container>

</template>

<script>
import {fetchUser} from '../../utils/auth'
export default {
  name: "ProfileManage",
  created() {
    fetchUser()
  }
}
</script>

<style scoped>

</style>
