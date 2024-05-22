import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class DirectusService {
  private readonly baseUrl: string = "http://localhost:8055"; 

  private async fetchFromDirectus(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching from Directus: ${response.statusText}`);
    }

    return response.json();
  }

  async login(email: string, password: string): Promise<any> {
    return this.fetchFromDirectus('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, additionalData: any): Promise<any> {
    return this.fetchFromDirectus('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, ...additionalData }),
    });
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
