import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { Allergens, Category, Ingredient, PackingUnit } from 'src/app/shared/services/recipe/ingredient';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'symbol'];
  dataSource: any;
  ingredientRef: AngularFirestoreCollection<Ingredient>;
  selection = new SelectionModel<Observable<Ingredient[]>>(true, []);
  preEditElement?: Ingredient;
  editedElement?: Ingredient;

  constructor(private afs: AngularFirestore,
    private authService: AuthService) {
    this.ingredientRef = afs.collection('ingredients', ref => ref.where('owner', '==', authService.getUser.uid))
    this.ingredientRef.valueChanges().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngOnInit(): void {

  }

  getPackingUnit(index: number): string {
    return PackingUnit[index]
  }

  storeIngredient(ingredient: Ingredient) {
    localStorage.setItem('ingredient', JSON.stringify(ingredient));
  }

  addIngredient() {
    const id = this.afs.createId();
    this.ingredientRef.doc(id).set({
      id: id,
      owner: this.authService.getUser.uid,
      name: "Eier",
      packingUnit: PackingUnit.KILOGRAMM,
      category: Category.STAPLE_FOOD,
      price: 0.99,
      quantity: 0,
      allergens: [Allergens.EGGS]
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  setEditedElement(element: Ingredient): void {
    this.preEditElement = {
      ...element
    }
    this.editedElement = { ...element };
  }

  isEdit(element: Ingredient): boolean {
    return this.editedElement ?
      element.id === this.editedElement?.id
      : false;
  }

  acceptChanges() {
    if (this.editedElement) {
      this.ingredientRef.doc(this.editedElement?.id).set(
        this.editedElement
      )
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      this.editedElement = undefined;

    }
  }

  declineChanges() {
    this.editedElement = undefined;
  }
}
