// src/plugins/axiosPlugin.js
import axiosInstance from '../utils/axios';

export default {
  install: (app) => {
    app.config.globalProperties.$axios = axiosInstance;
  }
};