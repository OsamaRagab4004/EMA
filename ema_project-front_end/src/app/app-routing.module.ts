import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login-page',
    loadChildren: () => import('./pages/login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'packages-list',
    loadChildren: () => import('./pages/packages-list/packages-list.module').then( m => m.PackagesListPageModule)
  },
  {
    path: 'package-details',
    loadChildren: () => import('./pages/package-details/package-details.module').then( m => m.PackageDetailsPageModule)
  },
  {
    path: 'register-page',
    loadChildren: () => import('./pages/register-page/register-page.module').then( m => m.RegisterPagePageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'create-package',
    loadChildren: () => import('./pages/create-package/create-package.module').then( m => m.CreatePackagePageModule)
  },
  {
    path: 'create-question',
    loadChildren: () => import('./pages/create-question/create-question.module').then( m => m.CreateQuestionPageModule)
  },
  {
    path: 'editmode',
    loadChildren: () => import('./pages/editmode/editmode.module').then( m => m.EditmodePageModule)
  },
  {
    path: 'learnmode',
    loadChildren: () => import('./pages/learnmode/learnmode.module').then( m => m.LearnmodePageModule)
  },
  {
    path: 'exammode',
    loadChildren: () => import('./pages/exammode/exammode.module').then( m => m.ExammodePageModule)
  },
  {
    path: 'editpackage',
    loadChildren: () => import('./pages/editpackage/editpackage.module').then( m => m.EditpackagePageModule)
  },
  {
    path: 'editquestion',
    loadChildren: () => import('./pages/editquestion/editquestion.module').then( m => m.EditquestionPageModule)
  },
  {
    path: 'detailed-edit-question',
    loadChildren: () => import('./pages/detailed-edit-question/detailed-edit-question.module').then( m => m.DetailedEditQuestionPageModule)
  },
  {
    path: 'editanswer',
    loadChildren: () => import('./pages/editanswer/editanswer.module').then( m => m.EditanswerPageModule)
  },
  {
    path: 'add-new-answer',
    loadChildren: () => import('./pages/add-new-answer/add-new-answer.module').then( m => m.AddNewAnswerPageModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('./pages/chart/chart.module').then( m => m.ChartPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
