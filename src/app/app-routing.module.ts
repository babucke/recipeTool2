import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';
import { RecipeListComponent } from './recipe/list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe/details/recipe-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'recipe', component: RecipeListComponent , canActivate: [AuthGuard]},
  { path: 'recipe/:id', component: RecipeDetailsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
