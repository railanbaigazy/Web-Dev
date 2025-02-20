import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProductListComponent } from "./product-list/product-list.component";


const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'categories/:category',
        component: ProductListComponent,
        title: 'Products by category',
    },
];

export default routeConfig;