import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { User } from '@app/services/users.service';

@Pipe({
  name: 'userDisplay',
})
export class UserDisplayPipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform({ id, first, last }: User): string {
    const userId = this.authService.WhoAmI().id;
    if (userId === id) return 'Vous';
    return first + ' ' + last;
  }
}
