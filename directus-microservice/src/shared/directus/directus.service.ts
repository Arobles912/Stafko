import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import fetch, { RequestInit } from 'node-fetch';
import { GlobalService } from './global.service';
import { MulterFile } from 'multer';
import * as FormData from 'form-data';

@Injectable()
export class DirectusService {
  private readonly baseUrl: string = 'http://localhost:8055';

  async login(email: string, password: string): Promise<any> {
    const response = await this.fetchFromDirectus('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response && response.data && response.data.access_token) {
      GlobalService.token = response.data.access_token;
    } else {
      throw new HttpException('Login failed: No access token returned', HttpStatus.UNAUTHORIZED);
    }

    return response;
  }

  async register(
    email: string,
    password: string,
    first_name: string,
    role: string,
  ): Promise<any> {
    return this.fetchFromDirectus('/users', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        first_name,
        role,
      }),
    });
  }

  async refreshToken(refreshToken: string, mode: string): Promise<void> {
    return this.fetchFromDirectus('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken, mode: mode }),
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

  async uploadFile(file: MulterFile): Promise<any> {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const options: RequestInit = {
      method: 'POST',
      body: formData as any,
      headers: {
        Authorization: `Bearer ${GlobalService.token}`,
      },
    };

    const response = await fetch(`${this.baseUrl}/files`, options);
    const responseText = await response.text();

    if (!response.ok) {
      throw new HttpException(
        `Error uploading file to Directus: ${response.statusText} - ${responseText}`,
        response.status,
      );
    }

    return JSON.parse(responseText);
  }

  async fetchFromDirectus(endpoint: string, options: RequestInit = {}) {
    if (GlobalService.token !== null) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GlobalService.token}`,
      };
    } else {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
    }
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, options);
    const responseText = await response.text();

    console.log(response);
    console.log(responseText);
    

    if (!response.ok) {
      throw new HttpException(
        `Error fetching from Directus: ${response.statusText} - ${responseText}`,
        response.status,
      );
    }

    return JSON.parse(responseText);
  }
}
