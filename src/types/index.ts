/**
 * Global app types
 */

/**
 * Common user role types
 */
export type UserRole = 'user' | 'moderator' | 'admin';

/**
 * Common status enums used across the app
 */
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  PENDING = 'pending',
}

/**
 * Common pagination params
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * Common API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

/**
 * Common API error structure
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: Record<string, string[]>;

  constructor(message: string, statusCode: number, details?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}
