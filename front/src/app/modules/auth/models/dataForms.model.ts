export interface volunterData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface coordinatorData {
  name: string;
  description: string;
  email: string;
  password: string;
  phone: string;
  ong: string;
  cuit: string;
  location: string;
  opportunityType: string;
  category: string;
}

export interface volunterDataLogin {
  email: string;
  password: string;
}

export interface CoordinatorDataLogin {
  email: string;
  password: string;
  cuit: number;
}
