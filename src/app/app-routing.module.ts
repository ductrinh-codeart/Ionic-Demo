import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'actionsheet',
    loadChildren: () => import('./tab1/components/actionsheet/actionsheet.module').then( m => m.ActionsheetPageModule)
  },
  {
    path: 'alert',
    loadChildren: () => import('./tab1/components/alert/alert.module').then( m => m.AlertPageModule)
  },
  {
    path: 'avatar',
    loadChildren: () => import('./tab1/components/avatar/avatar.module').then( m => m.AvatarPageModule)
  },
  {
    path: 'badge',
    loadChildren: () => import('./tab1/components/badge/badge.module').then( m => m.BadgePageModule)
  },
  {
    path: 'button',
    loadChildren: () => import('./tab1/components/button/button.module').then( m => m.ButtonPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./tab1/components/card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./tab1/components/checkbox/checkbox.module').then( m => m.CheckboxPageModule)
  },
  {
    path: 'chip',
    loadChildren: () => import('./tab1/components/chip/chip.module').then( m => m.ChipPageModule)
  },
  {
    path: 'content',
    loadChildren: () => import('./tab1/components/content/content.module').then( m => m.ContentPageModule)
  },
  {
    path: 'datetimepicker',
    loadChildren: () => import('./tab1/components/datetimepicker/datetimepicker.module').then( m => m.DatetimepickerPageModule)
  },
  {
    path: 'floating-action-button',
    loadChildren: () => import('./tab1/components/floating-action-button/floating-action-button.module').then( m => m.FloatingActionButtonPageModule)
  },
  {
    path: 'grid',
    loadChildren: () => import('./tab1/components/grid/grid.module').then( m => m.GridPageModule)
  },
  {
    path: 'icon',
    loadChildren: () => import('./tab1/components/icon/icon.module').then( m => m.IconPageModule)
  },
  {
    path: 'infinitescroll',
    loadChildren: () => import('./tab1/components/infinitescroll/infinitescroll.module').then( m => m.InfinitescrollPageModule)
  },
  {
    path: 'input',
    loadChildren: () => import('./tab1/components/input/input.module').then( m => m.InputPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./tab1/components/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'itemgroup',
    loadChildren: () => import('./tab1/components/itemgroup/itemgroup.module').then( m => m.ItemgroupPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./tab1/components/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./tab1/components/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./tab1/components/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./tab1/components/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'navigation',
    loadChildren: () => import('./tab1/components/navigation/navigation.module').then( m => m.NavigationPageModule)
  },
  {
    path: 'note',
    loadChildren: () => import('./tab1/components/note/note.module').then( m => m.NotePageModule)
  },
  {
    path: 'picker',
    loadChildren: () => import('./tab1/components/picker/picker.module').then( m => m.PickerPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./tab1/components/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./tab1/components/progress/progress.module').then( m => m.ProgressPageModule)
  },
  {
    path: 'radio',
    loadChildren: () => import('./tab1/components/radio/radio.module').then( m => m.RadioPageModule)
  },
  {
    path: 'range',
    loadChildren: () => import('./tab1/components/range/range.module').then( m => m.RangePageModule)
  },
  {
    path: 'refresher',
    loadChildren: () => import('./tab1/components/refresher/refresher.module').then( m => m.RefresherPageModule)
  },
  {
    path: 'reorder',
    loadChildren: () => import('./tab1/components/reorder/reorder.module').then( m => m.ReorderPageModule)
  },
  {
    path: 'searchbar',
    loadChildren: () => import('./tab1/components/searchbar/searchbar.module').then( m => m.SearchbarPageModule)
  },
  {
    path: 'segment',
    loadChildren: () => import('./tab1/components/segment/segment.module').then( m => m.SegmentPageModule)
  },
  {
    path: 'select',
    loadChildren: () => import('./tab1/components/select/select.module').then( m => m.SelectPageModule)
  },
  {
    path: 'spinner',
    loadChildren: () => import('./tab1/components/spinner/spinner.module').then( m => m.SpinnerPageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./tab1/components/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'text',
    loadChildren: () => import('./tab1/components/text/text.module').then( m => m.TextPageModule)
  },
  {
    path: 'thumbnail',
    loadChildren: () => import('./tab1/components/thumbnail/thumbnail.module').then( m => m.ThumbnailPageModule)
  },
  {
    path: 'toast',
    loadChildren: () => import('./tab1/components/toast/toast.module').then( m => m.ToastPageModule)
  },
  {
    path: 'toggle',
    loadChildren: () => import('./tab1/components/toggle/toggle.module').then( m => m.TogglePageModule)
  },
  {
    path: 'toolbar',
    loadChildren: () => import('./tab1/components/toolbar/toolbar.module').then( m => m.ToolbarPageModule)
  },
  {
    path: 'skeleton-text',
    loadChildren: () => import('./tab1/components/skeleton-text/skeleton-text.module').then( m => m.SkeletonTextPageModule)
  },
  {
    path: 'tabsview',
    loadChildren: () => import('./tab1/components/tabsview/tabsview.module').then( m => m.TabsviewPageModule)
  },
  {
    path: 'inside',
    loadChildren: () => import('./tab3/inside/inside.module').then( m => m.InsidePageModule)
  },
  {
    path: 'locked',
    loadChildren: () => import('./tab3/locked/locked.module').then( m => m.LockedPageModule)
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
