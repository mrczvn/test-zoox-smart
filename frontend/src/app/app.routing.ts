import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HandleComponent } from './handle/handle.component';

const APP_ROUTES: Routes = [
  { path: "", component: HandleComponent }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES)