import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddstudentlistComponent} from "./components/addstudentlist/addstudentlist.component";

const routes: Routes = [
  {
    path: 'addlist',
    component: AddstudentlistComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
