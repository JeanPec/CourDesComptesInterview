import { connectedFakeUser } from "./faker";

export class MockAuthService {
  WhoAmI(): { id: number; first: string; last: string } {
    return connectedFakeUser;
  }
}