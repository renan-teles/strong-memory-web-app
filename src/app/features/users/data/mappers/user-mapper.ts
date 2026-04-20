import { UserRequest } from '../dto/request/user-request';

export function parseUserRequestToRegisterUserRequest(data: UserRequest) {
  return {
    ...data,
    username: data.username!,
  };
}
