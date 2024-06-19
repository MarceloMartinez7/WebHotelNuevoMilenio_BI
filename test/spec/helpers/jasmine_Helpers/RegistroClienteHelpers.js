// clientRegistrationHelper.js


let registeredClients = [];


function registerClient(name, email, phoneNumber) {
    
    const existingClient = registeredClients.find(client => client.email === email);
    if (existingClient) {
        return { success: false, message: "El cliente ya está registrado." };
    }

    
    registeredClients.push({ name, email, phoneNumber });
    return { success: true, message: "Cliente registrado exitosamente." };
}


function getAllClients() {
    return registeredClients;
}


function getClientByEmail(email) {
    return registeredClients.find(client => client.email === email);
}


module.exports = {
    registerClient,
    getAllClients,
    getClientByEmail
};
