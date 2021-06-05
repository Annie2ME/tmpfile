
import axios from 'axios'

const url = 'api/stocks/'

class StockService {
  // Get stocks
  static async getStocks() {
    const res = await axios.get(url)
      try {
        const data = res.data
        return data.map(stock => ({
          ...stock
        }))
      } catch (err) {
        return err
      }
  }

  // Get specific stock
  static async getOneStock(ticker) {
    const res = await axios.get(`${url}${ticker}`)
      try {
        const data = [res.data]
        return data.map(stock => ({
          ...stock
        }))
      } catch (err) {
        return err
      }
  }

  // Get top 10 stocks of the day
  static async getTopStocks() {
    const res = await axios.get(`${url}top/overall`)
      try {
        const data = res.data
        return data.map(stock => ({
          ...stock
        }))
      } catch (err) {
        return err
      }
  }

  // Get top 10 stocks of the day by industry
  static async getTopStocksByIndustry(industry) {
    const res = await axios.get(`${url}top/${encodeURIComponent(industry)}`)
      try {
        return res.data
      } catch (err) {
        return err
      }
  }

  // Get all industries
  static async getIndustries() {
    const res = await axios.get(`${url}get/industries`)
      try {
        return res.data
      } catch (err) {
        return err
      }
  }

  // Get all tickers
  static async getTickers() {
    const res = await axios.get(`${url}get/tickers`)
      try {
        return res.data
      } catch (err) {
        return err
      }
  }

  // Create stock
  static insertStock(stock) {
    return axios.post(url, stock)
  }

  // Update stock
  static updateStock(id, updateKey, updateValue) {
    try {
      return axios.patch(`${url}${id}`, {
        updateKey, updateValue
      })
    } catch (err) {
      return err
    }
  }

  // Delete field
  static removeStockField(id, updateKey, updateValue) {
    try {
      return axios.patch(`${url}remove/${id}`, {
        updateKey, updateValue
      })
    } catch (err) {
      return err
    }
  }

  // Delete stock
  static deleteStock(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default StockService