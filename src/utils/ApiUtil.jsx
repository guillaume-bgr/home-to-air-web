import { env } from "../env/env.dev";
export async function fetchApi( method, params, route, token = null, customRoute = false ) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (params) {
        options.body = JSON.stringify(params);
    }
    if (token) {
        options.headers['Authorization'] = 'Bearer '+token;
    }
    try {
        const response = await fetch(customRoute ? route : env.API_URL+':'+env.API_PORT+route, options);
        let json = await response.json();
        json.statusCode = response.status;
        return json;
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
    }
}
