import { CategoiresService } from './service/categoires.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  lstCategories = [];
  displayCategories = [];
  filterControl = new FormControl('');
  constructor(private serivice: CategoiresService) {}
  ngOnInit(): void {
    this.serivice.getCategoriesData().subscribe((rep: any) => {
      this.lstCategories = rep.categories;
      this.displayCategories = this.lstCategories;
    });
    this.filterControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term: string) => {
        this.displayCategories = this.lstCategories.filter(
          (categorie: string) =>
            categorie.toUpperCase().indexOf(term.toUpperCase()) !== -1
        );
      });
  }
  trackByFunc(index: number, e: string) {
    return e;
  }
}
