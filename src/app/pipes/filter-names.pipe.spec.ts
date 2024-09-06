import { DateFormatService } from '@app/services/date-format.service';
import { FilterNamesPipe } from './filter-names.pipe';
import { fakeTypeFilterInput } from '@app/tests/faker';

describe('FilterNamesPipe', () => {
  let dateFormatService: DateFormatService;
  let pipe: FilterNamesPipe;
  beforeEach(() => {
    dateFormatService = new DateFormatService();
    pipe = new FilterNamesPipe(dateFormatService);
  });
  it('should return the correct name for tpe Amount', () => {
    const typeFilterInput = fakeTypeFilterInput;
    let attendedResult = 'Débit';
    if (typeFilterInput.value.type === 'debit') attendedResult = 'Débit';
    else attendedResult = 'Crédit';
    const result = pipe.transform(typeFilterInput);
    expect(result).toBe(attendedResult);
  });
});

