export class LoginResponse {
  token?: string;
  refreshToken?: string;
  profile?: UserProfile;
}

export class UserProfile {
  username?: string;
  firstname?: string;
  lastname?: string;
  nickname?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  role?: Role;
}

export class Role {
  id?: number;
  name?: string;
  description?: string;
}
