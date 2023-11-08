import axios from "axios";

export const authUrl = 'http://195.49.215.125/api/v1'
export const apiUrl = 'http://195.49.215.125/api/v1'

function getCSRFToken() {
    const cookieValue = document.cookie.match('(^|[^;]+)\\s*csrftoken\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

export const api = axios.create({
    headers: {
        'X-CSRFToken': getCSRFToken()
    }
});