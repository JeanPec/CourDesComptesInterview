import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserDisplayPipe } from './user-display.pipe';
import { AuthService } from '@app/services/auth.service';
import { MockAuthService } from '@app/tests/MockAuthService';
import { connectedFakeUser, fakeUser } from '@app/tests/faker';

describe('UserDisplayPipe', () => {
  let pipe: UserDisplayPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserDisplayPipe,
        { provide: AuthService, useClass: MockAuthService } // Use the mock service
      ]
    });

    pipe = TestBed.inject(UserDisplayPipe);
  });

  it('should return "Vous" for the current user', () => {
    const user = connectedFakeUser;
    const result = pipe.transform(user);
    expect(result).toBe('Vous');
  });

  it('should return the full name for other users', () => {
    const user = fakeUser;
    const result = pipe.transform(user);
    expect(result).toBe(`${user.first} ${user.last}`);
  });
});