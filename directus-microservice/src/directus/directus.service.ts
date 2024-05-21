import { Injectable } from '@nestjs/common';

@Injectable()
export class DirectusService {
  private readonly baseUrl: string = process.env.DIRECTUS_BACKEND_URL; 
  private readonly apiKey: string = process.env.DIRECTUS_API_KEY; 

  private async fetchFromDirectus(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching from Directus: ${response.statusText}`);
    }

    return response.json();
  }

  async getItems(collection: string): Promise<any> {
    return this.fetchFromDirectus(`/items/${collection}`);
  }

  async getItem(collection: string, id: number): Promise<any> {
    return this.fetchFromDirectus(`/items/${collection}/${id}`);
  }

  async createItem(collection: string, data: any): Promise<any> {
    return this.fetchFromDirectus(`/items/${collection}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateItem(collection: string, id: number, data: any): Promise<any> {
    return this.fetchFromDirectus(`/items/${collection}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteItem(collection: string, id: number): Promise<any> {
    return this.fetchFromDirectus(`/items/${collection}/${id}`, {
      method: 'DELETE',
    });
  }
}
