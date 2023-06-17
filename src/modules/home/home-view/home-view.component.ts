import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit {
  constructor(private pageTitle: Title) {}

  ngOnInit(): void {
    this.pageTitle.setTitle('Home');
  }
}
