class Response {

    message = null;
    obj = null;
    status = true;

    constructor(message, status, obj) {
        this.message = message;
        this.obj = obj;
        this.status = status;
    }
}

module.exports.getSuccess = (obj) => {
    return new Response('Success', true, obj);
};

module.exports.getException = (obj) => {
    return new Response('Exception', false, obj);
};

module.exports.getUnknownException = () => {
    return new Response('Exception', false, 'Un erro inesperado ha ocurrido!');
};

module.exports.getError = (obj) => {
    return new Response('Error', false, obj);
};

module.exports.getError = () => {
    return new Response('Error', false, 'Se produjo un error!');
};