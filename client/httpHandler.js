/**
 * Created by franciszhao on 25/5/17.
 */
class HttpHandler {

    constructor() {

    }

    makeRequest(opts) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(opts.method, opts.url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            let params = opts.params;
            //stringfy the params
            if (params && typeof params === 'object') {
                params = Object.keys(params).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }
            if ("POST" === opts.method) {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
            }
            xhr.send(params);
        });
    }

    get(url) {
        return this.makeRequest({
            method: 'GET',
            url: url
        })
    }

    post(url, params) {
        return this.makeRequest({
            method: 'POST',
            url: url,
            params: params
        });
    }

}
