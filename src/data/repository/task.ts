import axios, { AxiosRequestConfig } from "axios"
import { TaskEntity } from "../entity/task"

export default class TaskRepository {
  private static readonly baseURL = `/api/task`

  /**
   *
   * @param formData
   * @param options
   * @returns
   */
  public static async create(formData: TaskEntity, options?: AxiosRequestConfig) {
    const response = await axios.post(this.baseURL, formData, options)
    return response.data
  }

  /**
   *
   * @param id
   * @param formData
   * @param options
   * @returns
   */
  public static async update(id: string, formData: TaskEntity, options?: AxiosRequestConfig) {
    const response = await axios.put(`${this.baseURL}/${id}`, formData, options)
    return response.data
  }

  /**
   *
   * @param id
   * @param options
   * @returns
   */
  public static async delete(id: string, options?: AxiosRequestConfig) {
    const response = await axios.delete(`${this.baseURL}/${id}`, options)
    return response.data
  }
}
