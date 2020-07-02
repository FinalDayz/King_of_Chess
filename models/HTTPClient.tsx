import ENV from '../.env'

export class HTTPClient {

    private static SERVER_URL = "http://" + ENV.SERVER_URL;//'http://192.168.2.146:8080';
    private static DEFAULT_OPTIONS = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        timeout: 5000,
    };

    static getRequest(
        path: string,
        pathParams?: Array<string|number>
    ): Promise<any> {
        const url = this.buildURL(path, pathParams);

        return fetch(url, {
                ...HTTPClient.DEFAULT_OPTIONS,
                method: 'GET'
            }
        ).then((response) => response.json());
    }

    static postRequest(
        path: string,
        data: any,
        pathParams?: Array<string|number>
    ): Promise<any> {
        const url = this.buildURL(path, pathParams);

        return fetch(url, {
                ...this.DEFAULT_OPTIONS,
                body: JSON.stringify(data),
                method: 'POST'
            }
        ).then((response) => response.json());
    }

    private static buildURL(path: string, pathParams?: Array<string|number>): string {
        if(path[0] !== '/') {
            path = '/' + path;
        }
        let url = this.SERVER_URL + path;
        if (pathParams)
            for (const param of pathParams) {
                url += "/" + encodeURIComponent(param);
            }
        // console.log("Sending request to URL: " + url);
        return url;
    }
}
