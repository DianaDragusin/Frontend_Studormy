import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {StudentService} from "../../student/services/student.service";
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate  {
  constructor(
    private router: Router,
    private authService: AuthService,
    private studentService: StudentService,
  ) {}
  private hasRoom = false;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.authService.getUserRole())
    console.log(this.authService.getUserId())
    if (this.authService.isAuthenticated() && (state.url.includes('login') || state.url.includes('signup'))) {
      return this.router.createUrlTree(['home']);
    }

    if (!this.authService.isAuthenticated()  && (state.url.includes('login') || state.url.includes('signup'))){
      return true;
    }

    if (!this.authService.isAuthenticated()){
      return this.router.createUrlTree(['home']);
    }

    if(this.authService.isAuthenticated() && (state.url.includes('addlist'))){
      if(this.authService.getUserRole()=='admin'){
        const requestedId =  route.queryParams['id'];
        if(requestedId == this.authService.getUserId()){
          return true;
        }
      }
      return this.router.createUrlTree(['home']);
    }

    if(this.authService.isAuthenticated()  && ( state.url.includes('room-allocation-settings')  || state.url.includes('add-rooms') || state.url.includes('room-allocation')  )){
      if (this.authService.getUserRole()=='admin')
      {
        const requestedId =  route.queryParams['idAdmin'];
        if(requestedId == this.authService.getUserId()){
          return true;
        }
      }
      return this.router.createUrlTree(['home']);
    }


    if(this.authService.isAuthenticated() && ( state.url.includes('apply-for-rooms') || state.url.includes('student-groups')  || state.url.includes('see-rooms-available')  || state.url.includes('charts'))){
      if(this.authService.getUserRole()=='student'){
        const requestedId =  route.queryParams['idStudent'];
        if(requestedId == this.authService.getUserId()){
          return true;
        }
      }
      return this.router.createUrlTree(['home']);
    }

    if(this.authService.isAuthenticated() && (state.url.includes('profile'))){
      if(this.authService.getUserRole()=='student'){
        const requestedId =  route.queryParams['id'];
        if(requestedId == this.authService.getUserId()){
          return true;
        }
      }
      return this.router.createUrlTree(['home']);
    }

    if(this.authService.isAuthenticated() && (state.url.includes('student-groups'))){
      if(this.authService.getUserRole()=='student'){
        const requestedId =  route.queryParams['idStudent'];
        if(requestedId == this.authService.getUserId()){
          return true;
        }
      }
      return this.router.createUrlTree(['home']);
    }
    return true;
  }

  private hasRoomAssigned(studentId: number): void {
    this.studentService.getStudentHasRoom(studentId).subscribe({
      next: (hasRoomAssigned) => {
        this.hasRoom = hasRoomAssigned.valueOf();
      },
      error: (err) => console.log(err)
    });
  }
}
