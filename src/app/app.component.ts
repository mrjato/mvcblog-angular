import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public flash?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.flash = params.flash;
    });
  }

  public getFlash(): string | undefined {
    return this.flash;
  }

  public onCloseFlash() {
    this.flash = null;
    this.router.navigate(this.route.snapshot.url);
  }
}
