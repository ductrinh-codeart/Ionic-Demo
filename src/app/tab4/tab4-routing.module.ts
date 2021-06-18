import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path: 'modal-view',
    loadChildren: () => import('./modal-view/modal-view.module').then( m => m.ModalViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
