// API Configuration and utilities
import type { 
  ApiResponse, 
  Post, 
  Category, 
  Author, 
  Comment, 
  SearchFilters, 
  SearchResult,
  ContactFormData,
  NewsletterFormData,
  PostsResponse,
  PostResponse,
  CategoriesResponse,
  AuthorsResponse,
  AuthorResponse,
  CommentsResponse,
  SearchResponse
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
  contact: '/api/contact/contact',
  newsletter: '/api/contact/newsletter',
  posts: '/api/posts',
  categories: '/api/categories',
  tags: '/api/tags',
  authors: '/api/authors',
  search: '/api/search',
  analytics: '/api/analytics',
  health: '/health'
};

// API Response handler
export const handleApiResponse = async <T = any>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Generic API request function
export const apiRequest = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    console.log('Making API request to:', url);
    const response = await fetch(url, config);
    console.log('API response status:', response.status);
    return await handleApiResponse<T>(response);
  } catch (error) {
    console.error('API request failed:', error);
    console.error('Request URL:', url);
    console.error('Request config:', config);
    throw error;
  }
};

// Contact API functions
export const contactApi = {
  submitContact: async (contactData: ContactFormData): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(API_ENDPOINTS.contact, {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

// Newsletter API functions
export const newsletterApi = {
  subscribe: async (email: string, preferences: any = {}): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(API_ENDPOINTS.newsletter, {
      method: 'POST',
      body: JSON.stringify({ email, preferences }),
    });
  },
  unsubscribe: async (email: string, reason?: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`${API_ENDPOINTS.newsletter}/unsubscribe`, {
      method: 'POST',
      body: JSON.stringify({ email, reason }),
    });
  },
};

// Posts API functions
export const postsApi = {
  getPosts: async (params: SearchFilters = {}): Promise<PostsResponse> => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();
    const endpoint = queryString ? `${API_ENDPOINTS.posts}?${queryString}` : API_ENDPOINTS.posts;
    return apiRequest<PostsResponse>(endpoint);
  },
  getPost: async (slug: string): Promise<PostResponse> => {
    return apiRequest<PostResponse>(`${API_ENDPOINTS.posts}/${slug}`);
  },
  getPopularPosts: async (limit: number = 10, timeframe: string = '30d'): Promise<PostsResponse> => {
    return apiRequest<PostsResponse>(`${API_ENDPOINTS.posts}/popular?limit=${limit}&timeframe=${timeframe}`);
  },
  getFeaturedPosts: async (limit: number = 5): Promise<PostsResponse> => {
    return apiRequest<PostsResponse>(`${API_ENDPOINTS.posts}/featured?limit=${limit}`);
  },
  getPinnedPosts: async (limit: number = 3): Promise<PostsResponse> => {
    return apiRequest<PostsResponse>(`${API_ENDPOINTS.posts}/pinned?limit=${limit}`);
  },
  getRecentPosts: async (limit: number = 10): Promise<PostsResponse> => {
    return apiRequest<PostsResponse>(`${API_ENDPOINTS.posts}/recent?limit=${limit}`);
  },
  getRelatedPosts: async (postId: string, limit: number = 5): Promise<PostsResponse> => {
    return apiRequest<PostsResponse>(`${API_ENDPOINTS.posts}/${postId}/related?limit=${limit}`);
  },
  searchPosts: async (query: string, params: SearchFilters = {}): Promise<PostsResponse> => {
    const searchParams = { q: query, ...params };
    const queryString = new URLSearchParams(
      Object.entries(searchParams)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();
    return apiRequest<PostsResponse>(`${API_ENDPOINTS.posts}/search/${encodeURIComponent(query)}?${queryString}`);
  },
  likePost: async (postId: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`${API_ENDPOINTS.posts}/${postId}/like`, {
      method: 'POST',
    });
  },
  unlikePost: async (postId: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`${API_ENDPOINTS.posts}/${postId}/unlike`, {
      method: 'POST',
    });
  },
  sharePost: async (postId: string, platform: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`${API_ENDPOINTS.posts}/${postId}/share`, {
      method: 'POST',
      body: JSON.stringify({ platform }),
    });
  },
};

// Categories API functions
export const categoriesApi = {
  getCategories: async (): Promise<CategoriesResponse> => {
    return apiRequest<CategoriesResponse>(API_ENDPOINTS.categories);
  },
  getCategory: async (slug: string): Promise<Category> => {
    return apiRequest<Category>(`${API_ENDPOINTS.categories}/${slug}`);
  },
  getPostsByCategory: async (slug: string, params: SearchFilters = {}): Promise<PostsResponse> => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();
    const endpoint = queryString 
      ? `${API_ENDPOINTS.categories}/${slug}/posts?${queryString}` 
      : `${API_ENDPOINTS.categories}/${slug}/posts`;
    return apiRequest<PostsResponse>(endpoint);
  },
};

// Authors API functions
export const authorsApi = {
  getAuthors: async (params: {
    featured?: boolean;
    role?: string;
    search?: string;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<AuthorsResponse> => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();
    const endpoint = queryString ? `${API_ENDPOINTS.authors}?${queryString}` : API_ENDPOINTS.authors;
    return apiRequest<AuthorsResponse>(endpoint);
  },
  getAuthor: async (slug: string): Promise<AuthorResponse> => {
    return apiRequest<AuthorResponse>(`${API_ENDPOINTS.authors}/${slug}`);
  },
  getFeaturedAuthors: async (limit: number = 6): Promise<AuthorsResponse> => {
    return apiRequest<AuthorsResponse>(`${API_ENDPOINTS.authors}/featured?limit=${limit}`);
  },
  getTopAuthorsByPosts: async (limit: number = 10): Promise<AuthorsResponse> => {
    return apiRequest<AuthorsResponse>(`${API_ENDPOINTS.authors}/top/posts?limit=${limit}`);
  },
  getTopAuthorsByViews: async (limit: number = 10): Promise<AuthorsResponse> => {
    return apiRequest<AuthorsResponse>(`${API_ENDPOINTS.authors}/top/views?limit=${limit}`);
  },
  getAuthorPosts: async (slug: string, params: SearchFilters = {}): Promise<PostsResponse> => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();
    const endpoint = queryString 
      ? `${API_ENDPOINTS.authors}/${slug}/posts?${queryString}` 
      : `${API_ENDPOINTS.authors}/${slug}/posts`;
    return apiRequest<PostsResponse>(endpoint);
  },
  getAuthorPopularPosts: async (slug: string, limit: number = 5): Promise<PostsResponse> => {
    return apiRequest<PostsResponse>(`${API_ENDPOINTS.authors}/${slug}/posts/popular?limit=${limit}`);
  },
  getAuthorStats: async (slug: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`${API_ENDPOINTS.authors}/${slug}/stats`);
  },
  searchAuthors: async (query: string, params: {
    limit?: number;
    role?: string;
  } = {}): Promise<AuthorsResponse> => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();
    const endpoint = queryString 
      ? `${API_ENDPOINTS.authors}/search/${encodeURIComponent(query)}?${queryString}` 
      : `${API_ENDPOINTS.authors}/search/${encodeURIComponent(query)}`;
    return apiRequest<AuthorsResponse>(endpoint);
  },
};

// Tags API functions
export const tagsApi = {
  getTags: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(API_ENDPOINTS.tags);
  },
  getPostsByTag: async (slug: string, params: SearchFilters = {}): Promise<PostsResponse> => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();
    const endpoint = queryString 
      ? `${API_ENDPOINTS.tags}/${slug}/posts?${queryString}` 
      : `${API_ENDPOINTS.tags}/${slug}/posts`;
    return apiRequest<PostsResponse>(endpoint);
  },
};

// Search API functions
export const searchApi = {
  search: async (query: string, params: SearchFilters = {}): Promise<SearchResponse> => {
    const searchParams = { q: query, ...params };
    const queryString = new URLSearchParams(
      Object.entries(searchParams)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();
    return apiRequest<SearchResponse>(`${API_ENDPOINTS.search}?${queryString}`);
  },
};

// Analytics API functions
export const analyticsApi = {
  trackEvent: async (eventData: {
    type: string;
    path: string;
    data?: any;
  }): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(API_ENDPOINTS.analytics, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },
  trackPageView: async (pageData: {
    path: string;
    title?: string;
    referrer?: string;
  }): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`${API_ENDPOINTS.analytics}/pageview`, {
      method: 'POST',
      body: JSON.stringify(pageData),
    });
  },
};

// Health check
export const healthCheck = async (): Promise<ApiResponse> => {
  return apiRequest<ApiResponse>(API_ENDPOINTS.health);
};

const api = {
  contactApi,
  newsletterApi,
  postsApi,
  categoriesApi,
  authorsApi,
  tagsApi,
  searchApi,
  analyticsApi,
  healthCheck,
};

export default api;
