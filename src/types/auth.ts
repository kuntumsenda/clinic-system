export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  roleName: string;
};

export type Role = "ADMIN" | "SUPER_ADMIN" | "STAFF" | "DOCTOR";

export type LoginRes = {
  token: string;
  user: User;
};

export type LoginReq = {
  email: string;
  password: string;
};
