// customerService.js
class CustomerService {
    constructor() {
        this.customers = [];
    }

    registerCustomer(name, email) {
        if (this.isEmailValid(email) && !this.isEmailRegistered(email)) {
            const customer = { id: this.customers.length + 1, name: name, email: email };
            this.customers.push(customer);
            return true;
        }
        return false;
    }

    isEmailValid(email) {
        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isEmailRegistered(email) {
        return this.customers.some(customer => customer.email === email);
    }
}

module.exports = CustomerService;
