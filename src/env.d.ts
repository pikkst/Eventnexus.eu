export {};

declare module 'astro' {
  interface Locals {
    admin?: {
      user: {
        id: string;
        email?: string;
      };
      role: 'admin';
    };
  }
}
