export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  password?: string;
  repeatedPassword?: string;
};
