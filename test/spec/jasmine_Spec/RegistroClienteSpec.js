const CustomerService = require('../../lib/jasmine_examples/RegistroCliente');

describe('CustomerService', function() {
    let customerService;

    beforeEach(function() {
        customerService = new CustomerService();
    });

    it('should register a customer with valid name and email', function() {
        const result = customerService.registerCustomer('John Doe', 'john.doe@example.com');
        expect(result).toBe(true);
        expect(customerService.customers.length).toBe(1);
        expect(customerService.customers[0].name).toBe('John Doe');
        expect(customerService.customers[0].email).toBe('john.doe@example.com');
    });

    it('should not register a customer with invalid email', function() {
        const result = customerService.registerCustomer('Jane Doe', 'invalid-email');
        expect(result).toBe(false);
        expect(customerService.customers.length).toBe(0);
    });

    it('should not register a customer with an email that is already registered', function() {
        customerService.registerCustomer('John Doe', 'john.doe@example.com');
        const result = customerService.registerCustomer('Jane Doe', 'john.doe@example.com');
        expect(result).toBe(false);
        expect(customerService.customers.length).toBe(1);
    });

    it('should validate email correctly', function() {
        expect(customerService.isEmailValid('valid.email@example.com')).toBe(true);
        expect(customerService.isEmailValid('invalid-email')).toBe(false);
    });

    it('should check if email is already registered', function() {
        customerService.registerCustomer('John Doe', 'john.doe@example.com');
        expect(customerService.isEmailRegistered('john.doe@example.com')).toBe(true);
        expect(customerService.isEmailRegistered('jane.doe@example.com')).toBe(false);
    });
});

