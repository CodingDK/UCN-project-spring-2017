import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { RootObject } from '../models/github.models';
import { AppConstants } from "../../app.constants";

@Injectable()
export class GithubService {  
  private commitsUrl = AppConstants.Server.url + AppConstants.Server.endpoint.github.commits;
  private data: any;

  constructor(private http: Http, private router: Router) {
    
  }
  
  getAllCommits() : Promise<RootObject[]> {
    return this.http.get(this.commitsUrl, { withCredentials: true })
      .toPromise()
      .then(response => {
        this.data = response.json();
        return response.json();
      })
      .catch(this.handleError.bind(this));
  }
  
  // Implement a method to handle errors if any
  private handleError(error: any): void {
    console.error('GithubService - An error occurred', error);
    if (error.status === 401) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    }
  }
}