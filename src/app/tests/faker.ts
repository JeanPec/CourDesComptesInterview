import { FilterInput } from "@app/core/types/filter";
import { User } from "@app/core/types/User";
import { faker } from '@faker-js/faker';

function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export const connectedFakeUser: User = {    
    id: 1,
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    email: faker.internet.exampleEmail(),
    created: faker.date.recent(),
    initial_balance: generateRandomNumber(100,1000)
}


export const fakeUser: User = {    
    id: generateRandomNumber(10,1000),
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    email: faker.internet.exampleEmail(),
    created: faker.date.recent(),
    initial_balance: generateRandomNumber(100,1000)
}

export const fakeTypeFilterInput: FilterInput = {
  type: "type",
  value: {type: faker.helpers.arrayElement(['debit', 'credit'])}
}