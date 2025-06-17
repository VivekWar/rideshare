// Base User interface
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  password?: string; // Only present during registration/login, removed in responses
}

// User registration data
export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

// User login data
export interface LoginUserData {
  email: string;
  password: string;
}

// User profile update data
export interface UpdateUserData {
  name?: string;
  phone?: string;
  profileImage?: string;
}

// User authentication context
export interface AuthUser extends Omit<User, 'password'> {
  // User object without password field for client-side use
}

// User with additional computed properties
export interface UserWithStats extends User {
  totalTrips: number;
  completedTrips: number;
  rating?: number;
  joinedAt: string;
}

// User search/filter criteria
export interface UserSearchCriteria {
  name?: string;
  email?: string;
  isVerified?: boolean;
  createdAfter?: string;
  createdBefore?: string;
}

// User preferences (for future features)
export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    showPhone: boolean;
    showEmail: boolean;
  };
  defaultSearchRadius: number;
  preferredPaymentMethod?: string;
}

// Extended user profile
export interface UserProfile extends User {
  preferences?: UserPreferences;
  stats?: {
    totalTrips: number;
    completedTrips: number;
    cancelledTrips: number;
    rating: number;
    reviewCount: number;
  };
}

// User role enumeration (for future admin features)
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

// User with role
export interface UserWithRole extends User {
  role: UserRole;
}

// API response types
export interface UserResponse {
  user: User;
  message?: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

// Form validation types
export interface UserFormErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  general?: string;
}

// User activity log (for future features)
export interface UserActivity {
  id: number;
  userId: number;
  action: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}
