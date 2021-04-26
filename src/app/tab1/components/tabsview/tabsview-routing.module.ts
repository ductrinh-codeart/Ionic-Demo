import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsviewPage } from './tabsview.page';

const routes: Routes = [
  {
    path: '',
    component: TabsviewPage,
    children: [
      {
        path: 'games',
        loadChildren: () => import('./games/games.module').then(m => m.GamesPageModule)
      },
      {
        path: 'music',
        loadChildren: () => import('./music/music.module').then(m => m.MusicPageModule)
      },
      {
        path: 'videos',
        loadChildren: () => import('./videos/videos.module').then(m => m.VideosPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabsview/music',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsviewPageRoutingModule {}
