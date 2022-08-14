import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Category, FoodType, Recipe } from 'src/app/shared/services/recipe/recipe';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'foodType', 'category', 'preparationText', 'symbol'];
  dataSource: any;
  recipeRef: AngularFirestoreCollection<Recipe>;
  selection = new SelectionModel<Observable<Recipe[]>>(true, []);

  constructor(private afs: AngularFirestore,
              private authService: AuthService) {
    this.recipeRef = afs.collection('recipes', ref => ref.where('owner', '==', authService.getUser.uid))
    this.recipeRef.valueChanges().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngOnInit(): void {

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  getCategoryText(index: number): string {
    return Category[index]
  }

  getFoodTypeText(index: number): string {
    return FoodType[index];
  }

  storeRecipe(recipe: Recipe) {
    localStorage.setItem('recipe', JSON.stringify(recipe));
  }

  addRecipe() {
    const id = this.afs.createId();
    this.recipeRef.doc(id).set({
      id: id,
      owner: this.authService.getUser.uid,
      name: "Bolognese",
      preparationText: "Zubereitung ist toll",
      ingredients: ['asd', 'test'],
      category: Category.POTATO,
      foodType: FoodType.MAIN_COURSE
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

}
