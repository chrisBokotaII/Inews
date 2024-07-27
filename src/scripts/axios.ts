import axios from "axios";

const apikey = import.meta.env.VITE_API_KEY;
export class ApiRequest {
  static async homeFeeds() {
    const url = `https://newsapi.org/v2/everything?q=world&apiKey=${apikey}`;
    const response = await axios.get(url);
    localStorage.setItem("homeFeeds", JSON.stringify(response.data));
    return response.data;
  }

  static async searchFeeds(search: string) {
    const url = `https://newsapi.org/v2/everything?q=${search}&apiKey=${apikey}`;
    const response = await axios.get(url);
    localStorage.setItem("searchFeeds", JSON.stringify(response.data));
    return response.data;
  }

  static async categoryFeeds(category: string) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apikey}`;
    const response = await axios.get(url);
    localStorage.setItem(category, JSON.stringify(response.data));
    return response.data;
  }
  static async sourceFeeds(source: string) {
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`;
    const response = await axios.get(url);
    localStorage.setItem("sourceFeeds", JSON.stringify(response.data));
    return response.data;
  }
  static async sideBarFeeds() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`;
    const response = await axios.get(url);
    localStorage.setItem("sideFeeds", JSON.stringify(response.data));
    return response.data;
  }
  static async getSoureces() {
    const url = `https://newsapi.org/v2/sources?apiKey=${apikey}`;
    const response = await axios.get(url);
    localStorage.setItem("Sources", JSON.stringify(response.data));
    return response.data;
  }
}
