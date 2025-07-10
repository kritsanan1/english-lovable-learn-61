import { users, subscribers, contactInquiries, type User, type InsertUser, type Subscriber, type InsertSubscriber, type ContactInquiry, type InsertContactInquiry } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subscriber methods
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createOrUpdateSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  
  // Contact inquiry methods
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscribers: Map<string, Subscriber>;
  private contactInquiries: Map<string, ContactInquiry>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.subscribers = new Map();
    this.contactInquiries = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }

  async createOrUpdateSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const existing = await this.getSubscriberByEmail(insertSubscriber.email);
    const subscriber: Subscriber = {
      id: existing?.id || crypto.randomUUID(),
      email: insertSubscriber.email,
      user_id: insertSubscriber.user_id || null,
      stripe_customer_id: insertSubscriber.stripe_customer_id || null,
      subscribed: insertSubscriber.subscribed || false,
      subscription_tier: insertSubscriber.subscription_tier || null,
      subscription_end: insertSubscriber.subscription_end || null,
      created_at: existing?.created_at || new Date(),
      updated_at: new Date(),
    };
    this.subscribers.set(subscriber.email, subscriber);
    return subscriber;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const inquiry: ContactInquiry = {
      id: crypto.randomUUID(),
      name: insertInquiry.name,
      email: insertInquiry.email,
      phone: insertInquiry.phone || null,
      message: insertInquiry.message,
      inquiry_type: insertInquiry.inquiry_type || "general",
      preferred_contact: insertInquiry.preferred_contact || "email",
      appointment_date: insertInquiry.appointment_date || null,
      status: insertInquiry.status || "new",
      created_at: new Date(),
    };
    this.contactInquiries.set(inquiry.id, inquiry);
    return inquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values()).sort(
      (a, b) => (b.created_at?.getTime() || 0) - (a.created_at?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
