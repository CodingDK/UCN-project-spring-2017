import { Component } from '@angular/core';
import { GithubService } from '../services/github.service';
import { RootObject } from '../models/github.models';

@Component({
  selector: 'github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent {
  commits: RootObject[];
  constructor(private githubService: GithubService) {
    this.updateCommits();
  }

  updateCommits(): void {
    //if (this.commits != null) return this.commits;
    this.githubService.getAllCommits().then(response => {
      this.commits = response;
      //return this.commits;
    });
    //return this.commits;
  }
}
