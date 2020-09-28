import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
 
@Injectable({
 providedIn: 'root'
})
export class LoaderService {
 
 private readonly isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
 public readonly isLoading$: Observable<boolean> = this.isLoading.asObservable();
 
 public setLoading(isLoading: boolean): void {
  this.isLoading.next(isLoading);
 }
}
