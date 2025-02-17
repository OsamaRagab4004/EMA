import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginFirebaseService} from "./services/login-firebase.service";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login-page',
    loadChildren: () => import('./pages/login-page/login-page.module').then( m => m.LoginPagePageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'packages-list',
    loadChildren: () => import('./pages/packages-list/packages-list.module').then( m => m.PackagesListPageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'package-details/:id',
    loadChildren: () => import('./pages/package-details/package-details.module').then( m => m.PackageDetailsPageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'register-page',
    loadChildren: () => import('./pages/register-page/register-page.module').then( m => m.RegisterPagePageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'create-package',
    loadChildren: () => import('./pages/create-package/create-package.module').then( m => m.CreatePackagePageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'create-question/:id',
    loadChildren: () => import('./pages/create-question/create-question.module').then( m => m.CreateQuestionPageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'editmode/:id',
    loadChildren: () => import('./pages/editmode/editmode.module').then( m => m.EditmodePageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'learnmode/:id/:qid',
    loadChildren: () => import('./pages/learnmode/learnmode.module').then( m => m.LearnmodePageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'exammode/:id/:qid',
    loadChildren: () => import('./pages/exammode/exammode.module').then( m => m.ExammodePageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'editpackage/:id',
    loadChildren: () => import('./pages/editpackage/editpackage.module').then( m => m.EditpackagePageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'editquestion/:id/:qid',
    loadChildren: () => import('./pages/editquestion/editquestion.module').then( m => m.EditquestionPageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'detailed-edit-question/:id/:qid',
    loadChildren: () => import('./pages/detailed-edit-question/detailed-edit-question.module').then( m => m.DetailedEditQuestionPageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'editanswer/:id/:qid/:aid',
    loadChildren: () => import('./pages/editanswer/editanswer.module').then( m => m.EditanswerPageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'add-new-answer/:id/:qid',
    loadChildren: () => import('./pages/add-new-answer/add-new-answer.module').then( m => m.AddNewAnswerPageModule),
    canActivate: [LoginFirebaseService]
  },
  {
    path: 'chart/:mode/:id',
    loadChildren: () => import('./pages/chart/chart.module').then( m => m.ChartPageModule),
    canActivate: [LoginFirebaseService]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
