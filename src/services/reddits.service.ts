import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/Rx";

@Injectable()
export class RedditsService {

    baseUrl = "https://www.reddit.com/r";

    constructor(private http: Http) {}

    getPosts(category, limit) {
        return this.http.get(this.baseUrl + '/' + category + '/top.json?limit=' + limit)
            .map(res => res.json());
    }
}