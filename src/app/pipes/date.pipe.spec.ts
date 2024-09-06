import { DateFormatService } from '@app/services/date-format.service';
import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  let dateFormatService: DateFormatService;
  let pipe: DatePipe;
  beforeEach(() => {
    dateFormatService = new DateFormatService();
    pipe = new DatePipe(dateFormatService);
  });
  it('create an instance', () => {
    const pipe = new DatePipe(dateFormatService);
    expect(pipe).toBeTruthy();
  });
  it('should return  the corect Date for a specific one', () => {
    const date = 'October 3, 2016';
    const result = pipe.transform(date);
    expect(result).toBe('dimanche 2 octobre 2016 à 22:00');
  });
});
