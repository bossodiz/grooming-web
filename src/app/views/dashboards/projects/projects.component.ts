import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { ProjectStatsComponent } from "./components/project-stats/project-stats.component";
import { ProjectStatisticsComponent } from "./components/project-statistics/project-statistics.component";
import { ProjectTodolistComponent } from "./components/project-todolist/project-todolist.component";
import { ProjectCategoryComponent } from "./components/project-category/project-category.component";
import { ProjectBudgetComponent } from "./components/project-budget/project-budget.component";
import { ProjectTaskOverviewComponent } from "./components/project-task-overview/project-task-overview.component";
import { ProjectSummaryComponent } from "./components/project-summary/project-summary.component";

@Component({
  selector: 'app-projects',
  imports: [BreadcrumbComponent, ProjectStatsComponent, ProjectStatisticsComponent, ProjectTodolistComponent, ProjectCategoryComponent, ProjectBudgetComponent, ProjectTaskOverviewComponent, ProjectSummaryComponent],
  templateUrl: './projects.component.html',
  styles: ``
})
export class ProjectsComponent {

}
