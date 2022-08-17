import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { Allergens, Category, Ingredient, PackingUnit } from 'src/app/shared/services/recipe/ingredient';
import {MatTable} from '@angular/material';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'allergens', 'symbol'];
  dataSource: MatTableDataSource<Ingredient> = new MatTableDataSource<Ingredient>();
  ingredientRef: AngularFirestoreCollection<Ingredient>;
  selection = new SelectionModel<Observable<Ingredient[]>>(true, []);
  preEditElement?: Ingredient;
  editedElement?: Ingredient;

  packingUnitValues = Object.values(PackingUnit).map(item => String(item)).filter(item => !isNaN(Number(item)) === false);
  allergenesValues = Object.values(Allergens).map(item => String(item)).filter(item => !isNaN(Number(item)) === false);

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
    const newIngredient = {
      id: '',
      owner: this.authService.getUser.uid,
      name: '',
      packingUnit: PackingUnit.KILOGRAMM,
      category: Category.STAPLE_FOOD,
      price: 0,
      quantity: 0,
      allergens: []
    };
    this.dataSource.data.push(newIngredient);
    this.dataSource.data = [...this.dataSource.data]
    this.editedElement = newIngredient;
    /*const id = this.afs.createId();
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
      });*/
  }

  setEditedElement(element: Ingredient): void {
    console.log(this.dataSource.data)
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
      if(typeof this.editedElement?.id === "string" && this.editedElement.id.trim().length == 0) {
        this.editedElement = {
          ...this.editedElement,
          id: this.afs.createId()
        }
      }
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
    if(typeof this.editedElement?.id === "string" && this.editedElement.id.trim().length == 0) {
      /*const indexOfNewElement =  this.dataSource.data.findIndex((element) => {
        return element.id.trim().length == 0;
      });
      console.log(indexOfNewElement, this.dataSource.data);
      this.dataSource.data.splice(indexOfNewElement, 1);*/
      const removed = this.dataSource.data.pop();
      this.table.renderRows();
      console.log('removed object from datasource', removed)
    }
    this.editedElement = undefined;
  }
}
