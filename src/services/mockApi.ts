import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UsersResponse,
  DashboardStats,
  UserQueryParams,
  Product,
  ProductsResponse,
  ProductQueryParams,
  CreateProductRequest,
  UpdateProductRequest,
} from '../types';

// Comprehensive mock data with 30+ users
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20person%20avatar%20headshot%20corporate%20style&image_size=square',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20male%20professional%20avatar%20business%20casual&image_size=square',
    created_at: '2024-01-20T14:30:00Z',
    updated_at: '2024-01-20T14:30:00Z',
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20business%20avatar%20corporate%20headshot&image_size=square',
    created_at: '2024-02-01T09:15:00Z',
    updated_at: '2024-02-01T09:15:00Z',
  },
  {
    id: 4,
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    role: 'user',
    status: 'inactive',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=casual%20male%20avatar%20friendly%20approachable&image_size=square',
    created_at: '2024-02-10T16:45:00Z',
    updated_at: '2024-02-15T11:20:00Z',
  },
  {
    id: 5,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20avatar%20modern%20business%20style&image_size=square',
    created_at: '2024-02-20T13:00:00Z',
    updated_at: '2024-02-20T13:00:00Z',
  },
  {
    id: 6,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'admin',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20professional%20business%20suit%20confident&image_size=square',
    created_at: '2024-01-05T08:30:00Z',
    updated_at: '2024-01-05T08:30:00Z',
  },
  {
    id: 7,
    name: 'Sarah Davis',
    email: 'sarah.davis@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=blonde%20female%20professional%20business%20attire%20smiling&image_size=square',
    created_at: '2024-03-01T11:15:00Z',
    updated_at: '2024-03-01T11:15:00Z',
  },
  {
    id: 8,
    name: 'David Rodriguez',
    email: 'david.rodriguez@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=hispanic%20male%20professional%20business%20casual%20friendly&image_size=square',
    created_at: '2024-03-05T14:20:00Z',
    updated_at: '2024-03-05T14:20:00Z',
  },
  {
    id: 9,
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    role: 'user',
    status: 'inactive',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=brunette%20female%20professional%20corporate%20style&image_size=square',
    created_at: '2024-01-25T16:45:00Z',
    updated_at: '2024-02-10T09:30:00Z',
  },
  {
    id: 10,
    name: 'James Miller',
    email: 'james.miller@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=middle%20aged%20male%20professional%20business%20executive&image_size=square',
    created_at: '2024-02-28T10:00:00Z',
    updated_at: '2024-02-28T10:00:00Z',
  },
  {
    id: 11,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=redhead%20female%20professional%20business%20suit%20confident&image_size=square',
    created_at: '2024-03-10T12:30:00Z',
    updated_at: '2024-03-10T12:30:00Z',
  },
  {
    id: 12,
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=senior%20male%20professional%20business%20leader%20gray%20hair&image_size=square',
    created_at: '2024-01-30T15:45:00Z',
    updated_at: '2024-01-30T15:45:00Z',
  },
  {
    id: 13,
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=latina%20female%20professional%20business%20attire%20warm%20smile&image_size=square',
    created_at: '2024-03-15T09:20:00Z',
    updated_at: '2024-03-15T09:20:00Z',
  },
  {
    id: 14,
    name: 'Kevin White',
    email: 'kevin.white@example.com',
    role: 'user',
    status: 'inactive',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=young%20male%20professional%20casual%20business%20attire&image_size=square',
    created_at: '2024-02-05T13:15:00Z',
    updated_at: '2024-02-20T11:00:00Z',
  },
  {
    id: 15,
    name: 'Amanda Thompson',
    email: 'amanda.thompson@example.com',
    role: 'admin',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20executive%20business%20suit%20leadership&image_size=square',
    created_at: '2024-01-10T07:30:00Z',
    updated_at: '2024-01-10T07:30:00Z',
  },
  {
    id: 16,
    name: 'Christopher Lee',
    email: 'christopher.lee@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20young%20professional%20modern%20business&image_size=square',
    created_at: '2024-03-20T14:00:00Z',
    updated_at: '2024-03-20T14:00:00Z',
  },
  {
    id: 17,
    name: 'Jessica Martinez',
    email: 'jessica.martinez@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=hispanic%20female%20professional%20business%20casual%20friendly&image_size=square',
    created_at: '2024-03-25T10:45:00Z',
    updated_at: '2024-03-25T10:45:00Z',
  },
  {
    id: 18,
    name: 'Daniel Harris',
    email: 'daniel.harris@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=african%20american%20male%20professional%20business%20suit&image_size=square',
    created_at: '2024-02-15T16:30:00Z',
    updated_at: '2024-02-15T16:30:00Z',
  },
  {
    id: 19,
    name: 'Nicole Clark',
    email: 'nicole.clark@example.com',
    role: 'user',
    status: 'inactive',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=african%20american%20female%20professional%20business%20attire&image_size=square',
    created_at: '2024-01-18T12:00:00Z',
    updated_at: '2024-02-01T14:30:00Z',
  },
  {
    id: 20,
    name: 'Ryan Lewis',
    email: 'ryan.lewis@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=young%20male%20professional%20startup%20casual%20confident&image_size=square',
    created_at: '2024-03-30T11:20:00Z',
    updated_at: '2024-03-30T11:20:00Z',
  },
  {
    id: 21,
    name: 'Stephanie Walker',
    email: 'stephanie.walker@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=blonde%20female%20professional%20modern%20business%20style&image_size=square',
    created_at: '2024-04-01T08:15:00Z',
    updated_at: '2024-04-01T08:15:00Z',
  },
  {
    id: 22,
    name: 'Anthony Hall',
    email: 'anthony.hall@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=middle%20aged%20male%20professional%20business%20manager&image_size=square',
    created_at: '2024-02-22T15:10:00Z',
    updated_at: '2024-02-22T15:10:00Z',
  },
  {
    id: 23,
    name: 'Rachel Young',
    email: 'rachel.young@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=brunette%20female%20professional%20business%20casual%20approachable&image_size=square',
    created_at: '2024-04-05T13:45:00Z',
    updated_at: '2024-04-05T13:45:00Z',
  },
  {
    id: 24,
    name: 'Mark King',
    email: 'mark.king@example.com',
    role: 'user',
    status: 'inactive',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=senior%20male%20professional%20business%20executive%20experienced&image_size=square',
    created_at: '2024-01-12T09:30:00Z',
    updated_at: '2024-01-25T16:45:00Z',
  },
  {
    id: 25,
    name: 'Laura Wright',
    email: 'laura.wright@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=redhead%20female%20professional%20business%20suit%20leadership&image_size=square',
    created_at: '2024-04-10T10:20:00Z',
    updated_at: '2024-04-10T10:20:00Z',
  },
  {
    id: 26,
    name: 'Steven Lopez',
    email: 'steven.lopez@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=hispanic%20male%20professional%20business%20attire%20confident&image_size=square',
    created_at: '2024-03-08T14:55:00Z',
    updated_at: '2024-03-08T14:55:00Z',
  },
  {
    id: 27,
    name: 'Michelle Scott',
    email: 'michelle.scott@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=african%20american%20female%20professional%20modern%20business&image_size=square',
    created_at: '2024-04-12T12:10:00Z',
    updated_at: '2024-04-12T12:10:00Z',
  },
  {
    id: 28,
    name: 'Brian Green',
    email: 'brian.green@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=young%20male%20professional%20tech%20startup%20casual&image_size=square',
    created_at: '2024-04-15T16:25:00Z',
    updated_at: '2024-04-15T16:25:00Z',
  },
  {
    id: 29,
    name: 'Kimberly Adams',
    email: 'kimberly.adams@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=blonde%20female%20professional%20business%20executive%20confident&image_size=square',
    created_at: '2024-04-18T09:40:00Z',
    updated_at: '2024-04-18T09:40:00Z',
  },
  {
    id: 30,
    name: 'Gregory Baker',
    email: 'gregory.baker@example.com',
    role: 'user',
    status: 'inactive',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=middle%20aged%20male%20professional%20business%20consultant&image_size=square',
    created_at: '2024-02-08T11:15:00Z',
    updated_at: '2024-02-25T13:20:00Z',
  },
  {
    id: 31,
    name: 'Samantha Nelson',
    email: 'samantha.nelson@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=brunette%20female%20professional%20business%20manager%20approachable&image_size=square',
    created_at: '2024-04-20T14:30:00Z',
    updated_at: '2024-04-20T14:30:00Z',
  },
  {
    id: 32,
    name: 'Timothy Carter',
    email: 'timothy.carter@example.com',
    role: 'user',
    status: 'active',
    avatar_url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=senior%20male%20professional%20business%20director%20experienced&image_size=square',
    created_at: '2024-04-22T10:05:00Z',
    updated_at: '2024-04-22T10:05:00Z',
  }
];

// Product dataset and helpers
let products: Product[] = [];
let nextProductNumber = 1;
let productsInitialized = false;

const loadProductsFromStorage = (): Product[] => {
  try {
    const stored = localStorage.getItem('mockProducts');
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
};

const saveProductsToStorage = (list: Product[]) => {
  try {
    localStorage.setItem('mockProducts', JSON.stringify(list));
  } catch {}
};

const ensureProductsInitialized = async () => {
  if (productsInitialized) return;
  try {
    const stored = loadProductsFromStorage();
    if (stored.length > 0) {
      products = stored;
    } else {
      const res = await fetch('/products.json');
      if (res.ok) {
        products = await res.json();
      } else {
        products = [];
      }
      saveProductsToStorage(products);
    }
    // Seed additional demo products to exercise pagination and sorting
    if (products.length < 80) {
      const startIndex = products.length + 1;
      const target = 100;
      const extras: Product[] = [];
      for (let i = startIndex; i <= target; i++) {
        const id = `p-${String(i).padStart(3, '0')}`;
        const nameBase = ['Nova', 'Aero', 'Terra', 'Pulse', 'Core', 'Vertex', 'Quantum', 'Nimbus'];
        const name = `${nameBase[i % nameBase.length]} ${i}`;
        const qty = (i * 7) % 120; // varied quantities incl. zeros
        const descBase = ['High-performance unit', 'Legacy component', 'Eco-friendly part', 'Industrial grade', 'Compact model'];
        const description = `${descBase[i % descBase.length]} #${i}`;
        extras.push({ id, name, quantity: qty, description });
      }
      products = [...products, ...extras];
      saveProductsToStorage(products);
    }
    nextProductNumber = Math.max(
      1,
      ...products.map(p => Number(p.id.replace(/\D/g, '')) || 0)
    ) + 1;
    productsInitialized = true;
  } catch {
    products = [];
    nextProductNumber = 1;
    productsInitialized = true;
  }
};

const filterProducts = (list: Product[], params: ProductQueryParams = {}): Product[] => {
  let filtered = [...list];
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  if (params.sortBy) {
    filtered.sort((a, b) => {
      const key = params.sortBy!;
      const aVal = a[key as keyof Product];
      const bVal = b[key as keyof Product];
      const asc = params.sortOrder !== 'desc';
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const cmp = aVal.localeCompare(bVal);
        return asc ? cmp : -cmp;
      }
      if ((aVal as number) < (bVal as number)) return asc ? -1 : 1;
      if ((aVal as number) > (bVal as number)) return asc ? 1 : -1;
      return 0;
    });
  }
  return filtered;
};

const paginateProducts = (list: Product[], page = 1, limit = 10): ProductsResponse => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = list.slice(start, end);
  return {
    data,
    total: list.length,
    page,
    totalPages: Math.max(1, Math.ceil(list.length / limit)),
    limit,
  };
};
// Load users from localStorage or use default mock data
const loadUsersFromStorage = (): User[] => {
  try {
    const storedUsers = localStorage.getItem('mockUsers');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
  } catch (error) {
    console.warn('Failed to load users from localStorage:', error);
  }
  return [...mockUsers];
};

// Save users to localStorage
const saveUsersToStorage = (users: User[]) => {
  try {
    localStorage.setItem('mockUsers', JSON.stringify(users));
  } catch (error) {
    console.warn('Failed to save users to localStorage:', error);
  }
};

let users = loadUsersFromStorage();
let nextUserId = Math.max(...users.map(u => u.id)) + 1;

let usersInitialized = false;

const ensureUsersInitialized = async () => {
  if (usersInitialized) return;
  try {
    const stored = loadUsersFromStorage();
    users = stored;
    nextUserId = Math.max(...users.map(u => u.id)) + 1;
    usersInitialized = true;

    if (users.length === 0) {
      try {
        const response = await fetch('/users.json');
        if (response.ok) {
          const data = await response.json();
          users = data as User[];
          nextUserId = Math.max(0, ...users.map(u => u.id)) + 1;
          saveUsersToStorage(users);
        }
      } catch (err) {
        // Ignore fetch errors, fallback will apply
      }
    }
  } catch (e) {
    // Fallback to bundled mock data
    users = [...mockUsers];
    nextUserId = Math.max(...users.map(u => u.id)) + 1;
    usersInitialized = true;
    saveUsersToStorage(users);
  }
};


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const filterUsers = (users: User[], params: UserQueryParams = {}): User[] => {
  let filtered = [...users];

  // Search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  }

  // Status filter
  if (params.status && params.status !== 'all') {
    filtered = filtered.filter(user => user.status === params.status);
  }

  // Role filter
  if (params.role && params.role !== 'all') {
    filtered = filtered.filter(user => user.role === params.role);
  }

  // Sorting
  if (params.sortBy) {
    filtered.sort((a, b) => {
      const aValue = a[params.sortBy as keyof User];
      const bValue = b[params.sortBy as keyof User];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return params.sortOrder === 'desc' ? -comparison : comparison;
      }
      
      if (aValue < bValue) return params.sortOrder === 'desc' ? 1 : -1;
      if (aValue > bValue) return params.sortOrder === 'desc' ? -1 : 1;
      return 0;
    });
  }

  return filtered;
};

const paginateUsers = (users: User[], page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  return {
    data: paginatedUsers,
    total: users.length,
    page,
    totalPages: Math.ceil(users.length / limit),
    limit,
  };
};

// Mock API service
export class MockApiService {

  // User management
  async getUsers(params: UserQueryParams = {}): Promise<UsersResponse> {
    await delay(500);
    await ensureUsersInitialized();
    
    const filtered = filterUsers(users, params);
    const paginated = paginateUsers(filtered, params.page, params.limit);
    
    return paginated;
  }

  async getUserById(id: number): Promise<User> {
    await delay(300);
    await ensureUsersInitialized();
    
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    await delay(600);
    await ensureUsersInitialized();
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }
    
    const newUser: User = {
      id: nextUserId++,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status || 'active',
      avatar_url: `https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20${userData.role}%20business%20style&image_size=square`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    users.push(newUser);
    saveUsersToStorage(users);
    return newUser;
  }

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    await delay(500);
    await ensureUsersInitialized();
    
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Check if email already exists (excluding current user)
    if (userData.email && users.some(u => u.email === userData.email && u.id !== id)) {
      throw new Error('Email already exists');
    }
    
    const updatedUser = {
      ...users[userIndex],
      ...userData,
      updated_at: new Date().toISOString(),
    };
    
    users[userIndex] = updatedUser;
    saveUsersToStorage(users);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await delay(400);
    await ensureUsersInitialized();
    
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users.splice(userIndex, 1);
    saveUsersToStorage(users);
  }

  async bulkDeleteUsers(ids: number[]): Promise<void> {
    await delay(600);
    await ensureUsersInitialized();
    
    users = users.filter(user => !ids.includes(user.id));
    saveUsersToStorage(users);
  }

  async bulkUpdateUserStatus(ids: number[], status: 'active' | 'inactive'): Promise<void> {
    await delay(500);
    await ensureUsersInitialized();
    
    users = users.map(user => 
      ids.includes(user.id) 
        ? { ...user, status, updated_at: new Date().toISOString() }
        : user
    );
    saveUsersToStorage(users);
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(400);
    await ensureUsersInitialized();
    
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    
    // Calculate new users this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newUsersThisMonth = users.filter(user => {
      const userDate = new Date(user.created_at);
      return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
    }).length;
    
    // Generate mock growth data for the last 6 months
    const userGrowthData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      // Mock growth data
      const baseValue = Math.max(1, totalUsers - (i * 2));
      const randomVariation = Math.floor(Math.random() * 5) - 2;
      
      userGrowthData.push({
        label: monthName,
        value: Math.max(0, baseValue + randomVariation),
      });
    }
    
    return {
      totalUsers,
      activeUsers,
      newUsersThisMonth,
      userGrowthData,
    };
  }

  // Profile
  async updateProfile(userData: UpdateUserRequest): Promise<User> {
    await delay(500);
    await ensureUsersInitialized();
    
    // For demo purposes, update the current user (admin)
    const currentUser = users.find(u => u.email === 'admin@example.com');
    if (!currentUser) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...currentUser,
      ...userData,
      updated_at: new Date().toISOString(),
    };
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    users[userIndex] = updatedUser;
    saveUsersToStorage(users);
    
    return updatedUser;
  }

  async updatePassword(email: string, currentPassword: string, newPassword: string): Promise<void> {
    await delay(600);
    await ensureUsersInitialized();
    
    // Mock password validation
    if (currentPassword !== 'password123') {
      throw new Error('Current password is incorrect');
    }
    
    if (newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long');
    }
    
    // In a real app, this would update the password in the database
  }

  // Product management
  async getProducts(params: ProductQueryParams = {}): Promise<ProductsResponse> {
    await delay(400);
    await ensureProductsInitialized();
    const filtered = filterProducts(products, params);
    const paginated = paginateProducts(filtered, params.page, params.limit);
    return paginated;
  }

  async getProductById(id: string): Promise<Product> {
    await delay(300);
    await ensureProductsInitialized();
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async createProduct(data: CreateProductRequest): Promise<Product> {
    await delay(500);
    await ensureProductsInitialized();
    const nextId = `p-${String(nextProductNumber++).padStart(3, '0')}`;
    const newProduct: Product = {
      id: nextId,
      name: data.name,
      quantity: data.quantity,
      description: data.description,
    };
    products.unshift(newProduct);
    saveProductsToStorage(products);
    return newProduct;
  }

  async updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
    await delay(400);
    await ensureProductsInitialized();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Product not found');
    const updated: Product = { ...products[idx], ...data };
    products[idx] = updated;
    saveProductsToStorage(products);
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    await delay(300);
    await ensureProductsInitialized();
    products = products.filter(p => p.id !== id);
    saveProductsToStorage(products);
  }
}

export const mockApiService = new MockApiService();

import { Order, OrderSearchRequest, OrderSearchResponse, SearchFilters } from '../types';

// Mock Order Data - 25+ realistic orders
let mockOrders: Order[] = [
  {
    id: "10000000",
    account: "10000000",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 11,
    filledQty: 1,
    price: 135.00,
    status: "Waiting",
    date: "2022/12/22 03:02:14",
    expiration: "2022/12/22 03:02:14",
    noRef: "95749207",
    extRef: "2-XXXXXXX1-0",
    netAmount: "1,152.95 USD",
    referenceNumber: "1234567890",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "140.0",
    userId: "12344321",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "A similar order has already been submitted.",
      "Your transaction will be processed the following business day.",
      "It is not possible to calculate the buying power of this order.",
      "A cancellation will not be possible during business hours on market orders. You can call a representative for more information.",
      "For the above-mentioned reason(s), your order will be processed by one of our representatives."
]
  },
  {
    id: "00000001",
    account: "00000001",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 5,
    filledQty: 0,
    price: 526.00,
    status: "Waiting",
    date: "2022/12/08 05:12:36",
    expiration: "2022/12/08 05:12:36",
    noRef: "13830581",
    extRef: "2-XXXXXXX1-1",
    netAmount: "2,630.00 USD",
    referenceNumber: "1234567891",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "530.0",
    userId: "12344322",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "Your transaction will be processed the following business day."
    ]
  },
  {
    id: "00000002",
    account: "00000002",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 90,
    filledQty: 0,
    price: 744.00,
    status: "Waiting",
    date: "2022/12/15 23:30:32",
    expiration: "2022/12/15 23:30:32",
    noRef: "20435409",
    extRef: "2-XXXXXXX1-2",
    netAmount: "66,960.00 USD",
    referenceNumber: "1234567892",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "750.0",
    userId: "12344323",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "It is not possible to calculate the buying power of this order."
    ]
  },
  {
    id: "00000003",
    account: "00000003",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 60,
    filledQty: 0,
    price: 369.00,
    status: "Waiting",
    date: "2023/01/04 02:57:35",
    expiration: "2023/01/04 02:57:35",
    noRef: "09612755",
    extRef: "2-XXXXXXX1-3",
    netAmount: "22,140.00 USD",
    referenceNumber: "1234567893",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "375.0",
    userId: "12344324",
    warnings: [
      "A similar order has already been submitted.",
      "Your transaction will be processed the following business day."
    ]
  },
  {
    id: "00000004",
    account: "00000004",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 1000,
    filledQty: 0,
    price: 909.00,
    status: "Waiting",
    date: "2023/01/04 03:05:44",
    expiration: "2023/01/04 03:05:44",
    noRef: "96674263",
    extRef: "2-XXXXXXX1-4",
    netAmount: "909,000.00 USD",
    referenceNumber: "1234567894",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "915.0",
    userId: "12344325",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "A cancellation will not be possible during business hours on market orders. You can call a representative for more information."
    ]
  },
  {
    id: "00000005",
    account: "00000005",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 32,
    filledQty: 0,
    price: 660.00,
    status: "Waiting",
    date: "2023/01/04 03:05:44",
    expiration: "2023/01/04 03:05:44",
    noRef: "20778443",
    extRef: "2-XXXXXXX1-5",
    netAmount: "21,120.00 USD",
    referenceNumber: "1234567895",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "665.0",
    userId: "12344326",
    warnings: [
      "Your transaction will be processed the following business day.",
      "For the above-mentioned reason(s), your order will be processed by one of our representatives."
    ]
  },
  {
    id: "00000006",
    account: "00000006",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 800,
    filledQty: 0,
    price: 672.00,
    status: "Waiting",
    date: "2023/01/04 03:05:44",
    expiration: "2023/01/04 03:05:44",
    noRef: "61647068",
    extRef: "2-XXXXXXX1-6",
    netAmount: "537,600.00 USD",
    referenceNumber: "1234567896",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "680.0",
    userId: "12344327",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "It is not possible to calculate the buying power of this order."
    ]
  },
  {
    id: "00000007",
    account: "00000007",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 5,
    filledQty: 0,
    price: 526.00,
    status: "Waiting",
    date: "2022/12/08 05:12:36",
    expiration: "2022/12/08 05:12:36",
    noRef: "13830581",
    extRef: "2-XXXXXXX1-7",
    netAmount: "2,630.00 USD",
    referenceNumber: "1234567897",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "530.0",
    userId: "12344328",
    warnings: [
      "A similar order has already been submitted.",
      "A cancellation will not be possible during business hours on market orders. You can call a representative for more information."
    ]
  },
  {
    id: "00000008",
    account: "00000008",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 90,
    filledQty: 0,
    price: 744.00,
    status: "Waiting",
    date: "2022/12/15 23:30:32",
    expiration: "2022/12/15 23:30:32",
    noRef: "20435409",
    extRef: "2-XXXXXXX1-8",
    netAmount: "66,960.00 USD",
    referenceNumber: "1234567898",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "750.0",
    userId: "12344329",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "Your transaction will be processed the following business day."
    ]
  },
  {
    id: "00000009",
    account: "00000009",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 60,
    filledQty: 0,
    price: 369.00,
    status: "Waiting",
    date: "2023/01/04 02:57:35",
    expiration: "2023/01/04 02:57:35",
    noRef: "09612755",
    extRef: "2-XXXXXXX1-9",
    netAmount: "22,140.00 USD",
    referenceNumber: "1234567899",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "375.0",
    userId: "12344330",
    warnings: [
      "It is not possible to calculate the buying power of this order.",
      "For the above-mentioned reason(s), your order will be processed by one of our representatives."
    ]
  },
  {
    id: "00000010",
    account: "00000010",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 1000,
    filledQty: 1,
    price: 909.00,
    status: "Waiting",
    date: "2023/01/04 03:05:44",
    expiration: "2023/01/04 03:05:44",
    noRef: "96674263",
    extRef: "2-XXXXXXX2-1",
    netAmount: "909,000.00 USD",
    referenceNumber: "1234567900",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "915.0",
    userId: "12344331",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "A similar order has already been submitted."
    ]
  },
  {
    id: "00000011",
    account: "00000011",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 32,
    filledQty: 0,
    price: 660.00,
    status: "Waiting",
    date: "2023/01/04 03:05:44",
    expiration: "2023/01/04 03:05:44",
    noRef: "20778443",
    extRef: "2-XXXXXXX2-2",
    netAmount: "21,120.00 USD",
    referenceNumber: "1234567901",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "665.0",
    userId: "12344332",
    warnings: [
      "Your transaction will be processed the following business day.",
      "A cancellation will not be possible during business hours on market orders. You can call a representative for more information."
    ]
  },
  {
    id: "00000012",
    account: "00000012",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 800,
    filledQty: 1,
    price: 672.00,
    status: "Waiting",
    date: "2023/01/04 03:05:44",
    expiration: "2023/01/04 03:05:44",
    noRef: "61647068",
    extRef: "2-XXXXXXX2-3",
    netAmount: "537,600.00 USD",
    referenceNumber: "1234567902",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "680.0",
    userId: "12344333",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "It is not possible to calculate the buying power of this order."
    ]
  },
  {
    id: "00000013",
    account: "00000013",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 5,
    filledQty: 0,
    price: 526.00,
    status: "Waiting",
    date: "2022/12/08 05:12:36",
    expiration: "2022/12/08 05:12:36",
    noRef: "13830581",
    extRef: "2-XXXXXXX2-4",
    netAmount: "2,630.00 USD",
    referenceNumber: "1234567903",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "530.0",
    userId: "12344334",
    warnings: [
      "A similar order has already been submitted.",
      "For the above-mentioned reason(s), your order will be processed by one of our representatives."
    ]
  },
  {
    id: "00000014",
    account: "00000014",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 90,
    filledQty: 0,
    price: 744.00,
    status: "Waiting",
    date: "2022/12/15 23:30:32",
    expiration: "2022/12/15 23:30:32",
    noRef: "20435409",
    extRef: "2-XXXXXXX2-5",
    netAmount: "66,960.00 USD",
    referenceNumber: "1234567904",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "750.0",
    userId: "12344335",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "Your transaction will be processed the following business day."
    ]
  },
  {
    id: "00000015",
    account: "00000015",
    operation: "Buy",
    symbol: "NA",
    description: "NATIONAL BANK OF CDA",
    qty: 60,
    filledQty: 0,
    price: 369.00,
    status: "Waiting",
    date: "2023/01/04 02:57:35",
    expiration: "2023/01/04 02:57:35",
    noRef: "09612755",
    extRef: "2-XXXXXXX2-6",
    netAmount: "22,140.00 USD",
    referenceNumber: "1234567905",
    exchangeRate: "1.3357",
    telephone: "000-000-0000",
    qisLimit: "375.0",
    userId: "12344336",
    warnings: [
      "It is not possible to calculate the buying power of this order.",
      "A cancellation will not be possible during business hours on market orders. You can call a representative for more information."
    ]
  },
  {
    id: "00000016",
    account: "00000016",
    operation: "Sell",
    symbol: "AAPL",
    description: "APPLE INC",
    qty: 150,
    filledQty: 0,
    price: 175.50,
    status: "Waiting",
    date: "2023/01/05 09:15:22",
    expiration: "2023/01/05 09:15:22",
    noRef: "87654321",
    extRef: "2-XXXXXXX3-1",
    netAmount: "26,325.00 USD",
    referenceNumber: "1234567906",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "180.0",
    userId: "12344337",
    warnings: [
      "Your transaction will be processed the following business day.",
      "A similar order has already been submitted."
    ]
  },
  {
    id: "00000017",
    account: "00000017",
    operation: "Buy",
    symbol: "MSFT",
    description: "MICROSOFT CORPORATION",
    qty: 75,
    filledQty: 0,
    price: 285.75,
    status: "Waiting",
    date: "2023/01/05 10:30:45",
    expiration: "2023/01/05 10:30:45",
    noRef: "98765432",
    extRef: "2-XXXXXXX3-2",
    netAmount: "21,431.25 USD",
    referenceNumber: "1234567907",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "290.0",
    userId: "12344338",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "It is not possible to calculate the buying power of this order."
    ]
  },
  {
    id: "00000018",
    account: "00000018",
    operation: "Buy",
    symbol: "GOOGL",
    description: "ALPHABET INC CLASS A",
    qty: 25,
    filledQty: 0,
    price: 2850.00,
    status: "Waiting",
    date: "2023/01/05 11:45:18",
    expiration: "2023/01/05 11:45:18",
    noRef: "11223344",
    extRef: "2-XXXXXXX3-3",
    netAmount: "71,250.00 USD",
    referenceNumber: "1234567908",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "2900.0",
    userId: "12344339",
    warnings: [
      "A cancellation will not be possible during business hours on market orders. You can call a representative for more information.",
      "For the above-mentioned reason(s), your order will be processed by one of our representatives."
    ]
  },
  {
    id: "00000019",
    account: "00000019",
    operation: "Sell",
    symbol: "TSLA",
    description: "TESLA INC",
    qty: 50,
    filledQty: 0,
    price: 195.25,
    status: "Waiting",
    date: "2023/01/05 14:20:33",
    expiration: "2023/01/05 14:20:33",
    noRef: "55667788",
    extRef: "2-XXXXXXX3-4",
    netAmount: "9,762.50 USD",
    referenceNumber: "1234567909",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "200.0",
    userId: "12344340",
    warnings: [
      "Your transaction will be processed the following business day.",
      "A similar order has already been submitted."
    ]
  },
  {
    id: "00000020",
    account: "00000020",
    operation: "Buy",
    symbol: "AMZN",
    description: "AMAZON.COM INC",
    qty: 100,
    filledQty: 0,
    price: 3250.00,
    status: "Waiting",
    date: "2023/01/05 15:35:47",
    expiration: "2023/01/05 15:35:47",
    noRef: "99887766",
    extRef: "2-XXXXXXX3-5",
    netAmount: "325,000.00 USD",
    referenceNumber: "1234567910",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "3300.0",
    userId: "12344341",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "It is not possible to calculate the buying power of this order."
    ]
  },
  {
    id: "00000021",
    account: "00000021",
    operation: "Buy",
    symbol: "META",
    description: "META PLATFORMS INC",
    qty: 200,
    filledQty: 0,
    price: 125.75,
    status: "Waiting",
    date: "2023/01/06 08:15:12",
    expiration: "2023/01/06 08:15:12",
    noRef: "44556677",
    extRef: "2-XXXXXXX4-1",
    netAmount: "25,150.00 USD",
    referenceNumber: "1234567911",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "130.0",
    userId: "12344342",
    warnings: [
      "A cancellation will not be possible during business hours on market orders. You can call a representative for more information.",
      "For the above-mentioned reason(s), your order will be processed by one of our representatives."
    ]
  },
  {
    id: "00000022",
    account: "00000022",
    operation: "Sell",
    symbol: "NFLX",
    description: "NETFLIX INC",
    qty: 80,
    filledQty: 0,
    price: 385.50,
    status: "Waiting",
    date: "2023/01/06 09:30:25",
    expiration: "2023/01/06 09:30:25",
    noRef: "33445566",
    extRef: "2-XXXXXXX4-2",
    netAmount: "30,840.00 USD",
    referenceNumber: "1234567912",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "390.0",
    userId: "12344343",
    warnings: [
      "Your transaction will be processed the following business day.",
      "A similar order has already been submitted."
    ]
  },
  {
    id: "00000023",
    account: "00000023",
    operation: "Buy",
    symbol: "NVDA",
    description: "NVIDIA CORPORATION",
    qty: 120,
    filledQty: 0,
    price: 485.25,
    status: "Waiting",
    date: "2023/01/06 10:45:38",
    expiration: "2023/01/06 10:45:38",
    noRef: "22334455",
    extRef: "2-XXXXXXX4-3",
    netAmount: "58,230.00 USD",
    referenceNumber: "1234567913",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "490.0",
    userId: "12344344",
    warnings: [
      "To trade this security in this account, a currency conversion will be made at the current rate.",
      "It is not possible to calculate the buying power of this order."
    ]
  },
  {
    id: "00000024",
    account: "00000024",
    operation: "Buy",
    symbol: "AMD",
    description: "ADVANCED MICRO DEVICES",
    qty: 300,
    filledQty: 0,
    price: 85.75,
    status: "Waiting",
    date: "2023/01/06 12:00:51",
    expiration: "2023/01/06 12:00:51",
    noRef: "11223355",
    extRef: "2-XXXXXXX4-4",
    netAmount: "25,725.00 USD",
    referenceNumber: "1234567914",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "90.0",
    userId: "12344345",
    warnings: [
      "A cancellation will not be possible during business hours on market orders. You can call a representative for more information.",
      "For the above-mentioned reason(s), your order will be processed by one of our representatives."
    ]
  },
  {
    id: "00000025",
    account: "00000025",
    operation: "Sell",
    symbol: "INTC",
    description: "INTEL CORPORATION",
    qty: 500,
    filledQty: 0,
    price: 28.50,
    status: "Waiting",
    date: "2023/01/06 13:15:04",
    expiration: "2023/01/06 13:15:04",
    noRef: "66778899",
    extRef: "2-XXXXXXX4-5",
    netAmount: "14,250.00 USD",
    referenceNumber: "1234567915",
    exchangeRate: "1.0000",
    telephone: "000-000-0000",
    qisLimit: "30.0",
    userId: "12344346",
    warnings: [
      "Your transaction will be processed the following business day.",
      "A similar order has already been submitted."
    ]
  }
];

// Mock API functions
export const mockOrderApi = {
  searchOrders: async (request: OrderSearchRequest): Promise<OrderSearchResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    await ensureOrdersInitialized();

    // Filter orders based on date range
    // Normalize request dates from 'YYYY/MM/DD' to 'YYYY-MM-DD' to ensure consistent parsing
    const startDate = new Date(request.startDate.replace(/\//g, '-'));
    const endDate = new Date(request.endDate.replace(/\//g, '-'));
    
    let filteredOrders = mockOrders.filter(order => {
      const orderDate = new Date(order.date.replace(/\//g, '-'));
      return orderDate >= startDate && orderDate <= endDate;
    });

    // Optional status filter
    if (request.status) {
      filteredOrders = filteredOrders.filter(order => order.status === request.status);
    }

    // Apply sorting across full dataset before pagination
    if (request.sortBy) {
      const sortKey = request.sortBy;
      const sortOrderMultiplier = request.sortOrder === 'desc' ? -1 : 1;
      const getComparable = (order: Order) => {
        const v = order[sortKey];
        // Handle date/time fields
        if (sortKey === 'date' || sortKey === 'expiration') {
          return new Date(String(v).replace(/\//g, '-')).getTime();
        }
        // Numbers sort naturally
        if (typeof v === 'number') return v;
        // Strings: numeric-like vs lexicographic (case-insensitive)
        if (typeof v === 'string') {
          if (/^\d+$/.test(v)) return Number(v);
          return v.toLowerCase();
        }
        return v as any;
      };
      filteredOrders = filteredOrders.slice().sort((a, b) => {
        const va = getComparable(a);
        const vb = getComparable(b);
        if (va < vb) return -1 * sortOrderMultiplier;
        if (va > vb) return 1 * sortOrderMultiplier;
        return 0;
      });
    }

    // Apply pagination
    const page = request.page || 1;
    const limit = request.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return {
      orders: paginatedOrders,
      total: filteredOrders.length,
      page: page
    };
  },

  getOrderById: async (id: string): Promise<Order | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    await ensureOrdersInitialized();
    return mockOrders.find(order => order.id === id) || null;
  },

  acceptOrder: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    await ensureOrdersInitialized();
    // In a real app, this would update the order status
    console.log(`Order ${id} accepted`);
    return true;
  },

  rejectOrder: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    await ensureOrdersInitialized();
    // In a real app, this would update the order status
    console.log(`Order ${id} rejected`);
    return true;
  }
};

// Legacy user API (keeping for backward compatibility)
export const mockUserApi = {
  // ... existing user API functions
};

let ordersInitialized = false;
const saveOrdersToStorage = (orders: Order[]) => {
  try {
    localStorage.setItem('mockOrders', JSON.stringify(orders));
  } catch (error) {
    console.warn('Failed to save orders to localStorage:', error);
  }
};

// Helper: format Date to 'YYYY/MM/DD HH:mm:ss'
const formatDateWithSlashes = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
};

// Helper: parse 'YYYY/MM/DD HH:mm:ss' (with ISO fallback)
const parseSlashedDate = (value: string): Date => {
  if (!value) return new Date(NaN);
  // Handle ISO or hyphenated formats from legacy data
  if (value.includes('-') || value.includes('T')) {
    const iso = new Date(value);
    return Number.isNaN(iso.getTime()) ? new Date(NaN) : iso;
  }
  const [datePart, timePart] = value.split(' ');
  const [yyyyStr, mmStr, ddStr] = (datePart || '').split('/');
  const yyyy = Number(yyyyStr);
  const mm = Number(mmStr);
  const dd = Number(ddStr);
  if (!yyyy || !mm || !dd) return new Date(NaN);
  if (!timePart) return new Date(yyyy, mm - 1, dd);
  const [hhStr, miStr, ssStr] = timePart.split(':');
  const hh = Number(hhStr) || 0;
  const mi = Number(miStr) || 0;
  const ss = Number(ssStr) || 0;
  return new Date(yyyy, mm - 1, dd, hh, mi, ss);
};

// Helper: rebuild dataset to target size and update dates from Oct 2024 until Oct 2025
const buildOrdersWithUpdatedDatesAndSize = (source: Order[], targetCount: number): Order[] => {
  const end = new Date(2025, 9, 31, 23, 59, 0);
  // October is month index 9
  const start = new Date(2024, 9, 1, 9, 0, 0);
  const count = Math.max(targetCount, 1);
  const span = Math.max(end.getTime() - start.getTime(), 1000 * 60 * 60); // at least 1 hour span
  const step = Math.floor(span / Math.max(count - 1, 1));
  const result: Order[] = [];
  for (let i = 0; i < count; i++) {
    const base = source.length ? source[i % source.length] : {
      id: '00000000',
      account: '00000000',
      operation: 'Buy',
      symbol: 'NA',
      description: 'NATIONAL BANK OF CDA',
      qty: 1,
      filledQty: 0,
      price: 100,
      status: 'Waiting',
      date: formatDateWithSlashes(start),
      expiration: formatDateWithSlashes(start),
      noRef: '00000000',
      extRef: '2-XXXXXXX0-0',
      netAmount: '100.00 USD',
      referenceNumber: '1234567800',
      exchangeRate: '1.0000',
      telephone: '000-000-0000',
      qisLimit: '100.0',
      userId: '12344000',
      warnings: []
    } as Order;
    const d = new Date(start.getTime() + step * i);
    const boundedDate = d.getTime() > end.getTime() ? end : d;
    result.push({
      ...base,
      id: String(i + 1).padStart(8, '0'),
      account: String(i + 1).padStart(8, '0'),
      date: formatDateWithSlashes(boundedDate),
      expiration: formatDateWithSlashes(boundedDate),
      noRef: String(10000000 + i),
      extRef: `2-XXXXXXX${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
      referenceNumber: String(1234567800 + i),
      userId: base.userId || String(12344000 + i)
    });
  }
  // Ensure at least one entry for every day in October 2025
  const existingDates = new Set<string>(result.map((o) => o.date));
  for (let day = 1; day <= 31; day++) {
    const octDate = new Date(2025, 9, day, 10, 0, 0);
    const octDateStr = formatDateWithSlashes(octDate);
    if (!existingDates.has(octDateStr)) {
      const idx = result.length;
      const base = source.length ? source[idx % source.length] : {
        id: '00000000',
        account: '00000000',
        operation: 'Buy',
        symbol: 'NA',
        description: 'NATIONAL BANK OF CDA',
        qty: 1,
        filledQty: 0,
        price: 100,
        status: 'Waiting',
        date: octDateStr,
        expiration: octDateStr,
        noRef: '00000000',
        extRef: '2-XXXXXXX0-0',
        netAmount: '100.00 USD',
        referenceNumber: '1234567800',
        exchangeRate: '1.0000',
        telephone: '000-000-0000',
        qisLimit: '100.0',
        userId: '12344000',
        warnings: []
      } as Order;
      result.push({
        ...base,
        id: String(idx + 1).padStart(8, '0'),
        account: String(idx + 1).padStart(8, '0'),
        date: octDateStr,
        expiration: octDateStr,
        noRef: String(10000000 + idx),
        extRef: `2-XXXXXXX${Math.floor(idx / 10) + 1}-${(idx % 10) + 1}`,
        referenceNumber: String(1234567800 + idx),
        userId: base.userId || String(12344000 + idx)
      });
    }
  }
  return result;
};

const ensureOrdersInitialized = async () => {
  // If already initialized, verify whether data needs rebuild (size or freshness)
  if (ordersInitialized) {
    try {
      const stored = localStorage.getItem('mockOrders');
      const current: Order[] = stored ? JSON.parse(stored) : [];
      const currentCount = Array.isArray(current) ? current.length : 0;
      const timestamps = Array.isArray(current)
        ? current
            .map((o) => parseSlashedDate(o.date).getTime())
            .filter((t) => Number.isFinite(t))
        : [];
      const latestTs = timestamps.length > 0 ? Math.max(...timestamps) : NaN;
      const latestDate = Number.isFinite(latestTs) ? new Date(latestTs) : null;
      const needsRebuild =
        !Array.isArray(current) ||
        currentCount < 150 ||
        !latestDate ||
        (latestDate && (latestDate.getFullYear() !== 2025 || latestDate.getMonth() !== 9));
      if (!needsRebuild) return;
    } catch {
      // fall through to rebuild
    }
  }
  try {
    const stored = localStorage.getItem('mockOrders');
    if (stored) {
      mockOrders = JSON.parse(stored);
    } else {
      const resp = await fetch('/orders.json');
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data)) {
          mockOrders = data as Order[];
        }
      }
    }
    // Rebuild to 150 orders and update dates from Oct 2024 until Oct 2025
    mockOrders = buildOrdersWithUpdatedDatesAndSize(mockOrders, 150);
    saveOrdersToStorage(mockOrders);
  } catch (e) {
    console.warn('Failed to initialize orders from orders.json:', e);
  } finally {
    ordersInitialized = true;
  }
};
