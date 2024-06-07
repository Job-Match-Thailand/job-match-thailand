<template>
    <v-card>
      select {{select}}
      <h2 class="text-center">ขั้นตอนที่ 2</h2>
      <h3 class="text-center">การใช้งานของคุณ</h3>
        <v-form ref="form" class="mt-5">
              <v-item-group mandatory :model-value="select">
    <v-container>
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          md="4"
        >
          <v-item v-slot="{ isSelected, toggle }" :key="n">
            <v-card
              :color="isSelected ? 'primary' : ''"
              class="d-flex align-center"
              height="200"
              dark
              @click="toggle"
            >
              <v-scroll-y-transition>
                <div
                  class="text-h3 flex-grow-1 text-center"
                >
                  {{ isSelected ? 'Selected' : 'Click Me!' }}
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
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
