import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:9091"
  // change if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:9090", // ✅ your backend port
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔐 Attach JWT to every request EXCEPT login
// api.interceptors.request.use((config) => {
//   if (!config.url.includes("/admin/login")) {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// export default api;
