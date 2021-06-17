
const validateEndpointUrl = (env, endpoint) => {
    let isValid = true;

    if (!env.API_ROOT_URL) {
        isValid = false;
    }

    return isValid ? endpoint : false;
}

module.exports = validateEndpointUrl;
