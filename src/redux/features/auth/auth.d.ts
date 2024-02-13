interface LoginPayload {
  status: number;
  Success: string;
  data: {
    refresh: string;
    access: string;
  };
  user: User;
}

interface User {
  id: string;
  username: string;
  email: string;
  mobile_number: string;
  first_name: string;
  middle_name?: any;
  last_name: string;
}


interface LoginPayloadError {
  errors: {
    message: string;
    field: string;
  }[];
}
