import { CustomersDto } from './customers.dto';

describe('Customers', () => {
  it('should be defined', () => {
    expect(new CustomersDto()).toBeDefined();
  });
});
