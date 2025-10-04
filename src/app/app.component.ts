import { Component } from '@angular/core';
import { map } from 'rxjs';
import {
  PortfolioDataService,
  ProjectShowcase,
  SkillBadge,
  TimelineItem
} from './portfolio-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly hero$ = this.data.hero$();
  readonly rotatingRole$ = this.data.rotatingRole$();
  readonly heroIntro$ = this.hero$.pipe(
    map((hero) => ({
      salutation: `Olá, eu sou ${hero.shortName}!`,
      description: hero.description
    }))
  );

  readonly skills$ = this.data.skills$();
  readonly timeline$ = this.data.timeline$();
  readonly projects$ = this.data.projects$();

  constructor(private readonly data: PortfolioDataService) {}

  trackByLabel(_: number, item: SkillBadge): string {
    return item.label;
  }

  trackByTimeline(_: number, item: TimelineItem): string {
    return `${item.period}-${item.title}`;
  }

  trackByProject(_: number, item: ProjectShowcase): string {
    return item.name;
  }
}
