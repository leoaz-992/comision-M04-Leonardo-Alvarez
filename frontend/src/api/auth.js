import axios from "./axios.js";

export const registerRequest = async (user) => axios.post(`/registrar`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get(`/verificar-token`);
