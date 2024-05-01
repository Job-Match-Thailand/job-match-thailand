<template>
  <div>
    <h1>create-liff-app</h1>
    <p v-if="message">{{ message }}</p>
    <p v-if="error">
      <code>{{ error }}</code>
    </p>
    <a href="https://developers.line.biz/ja/docs/liff/" target="_blank" rel="noreferrer">
      LIFF Documentation
    </a>
    {{profile}}
     <br>
     {{decode_token}}
     <br>
     {{email}}
  </div>
</template>

<script>
import liff from "@line/liff";

export default {
  data() {
    return {
      message: "",
      error: "",
      profile: {},
      decode_token: {}, 
      email: '---------------'
    };
  },
  mounted() {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        this.message = "LIFF init succeeded.";
        if (liff.isLoggedIn()) {
          this.runApp()
        } else {
          liff.login();
        }
      })
      .catch((e) => {
        this.message = "LIFF init failed.";
        this.error = `${e}`;
      });
  },
  methods: {
    runApp() {
      liff.getProfile().then(profile => {
        this.profile = profile
        this.decode_token = liff.getDecodedIDToken()
        this.email = liff.getDecodedIDToken().email
        console.log('email', this.email)
      }).catch(e => console.error(e))
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
