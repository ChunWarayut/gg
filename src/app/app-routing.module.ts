import { ContactComponent } from './components/contact/contact.component';
import { SinglejobComponent } from './components/singlejob/singlejob.component';
import { BuildingComponent } from "./components/building/building.component";
import { AboutComponent } from "./components/about/about.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "building", component: BuildingComponent },
  { path: "singlejob", component: SinglejobComponent },
  { path: "contact", component: ContactComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
