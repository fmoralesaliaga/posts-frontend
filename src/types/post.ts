export interface Post {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface PostCreateDto {
  name: string;
  description: string;
}

export interface PostUpdateDto extends PostCreateDto {
  id: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
