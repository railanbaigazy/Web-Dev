import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'Home Page',
        component: HomeComponent
    },
    {
        path: 'about',
        title: 'About Page',
        component: AboutComponent
    },
    {
        path: 'albums',
        title: 'Albums Page',
        component: AlbumsComponent
    },
    {
        path: 'albums/:id',
        component: AlbumDetailComponent
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
