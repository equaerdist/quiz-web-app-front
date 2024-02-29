import axios from "axios";
import { TokenProvider } from "./utils";

const config = {
  api: "api/",
  RefreshAlias: "RefreshToken",
  AuthorizationAlias: "Authorization",
  tokenExpirationTime: "exp_token_time",
  updateTimeInMillis: 2 * 60 * 1000,
};
axios.defaults.headers.post["Content-Type"] = "application/json charset=utf-8;";
axios.interceptors.request.use(
  (cfg) => {
    cfg.headers.Authorization = `${TokenProvider.GetToken()}`;
    cfg.headers[config.RefreshAlias] = TokenProvider.GetRefreshToken();

    return cfg;
  },
  (error) => Promise.reject(error)
);
export default config;
