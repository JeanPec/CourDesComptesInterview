import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/core/types/User';
import { AuthService } from '@app/services/auth.service';

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
