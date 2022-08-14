import { Component, OnInit } from '@angular/core';
import { Category, FoodType, Recipe } from 'src/app/shared/services/recipe/recipe';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipeForm: FormGroup;

  categoryValues = Object.values(Category).map(item => String(item)).filter(item => !isNaN(Number(item)) === false);
  foodTypeValues = Object.values(FoodType).map(item => String(item)).filter(item => !isNaN(Number(item)) === false);;

  public recipe?: Recipe;

  constructor(
    authService: AuthService,
    private translate: TranslateService,
    private formBuilder: FormBuilder) {
    this.recipeForm = this.formBuilder.group({
      name: new FormControl(''),
      preparationText: new FormControl(''),
      category: new FormControl<Category | null>(null, Validators.required),
      foodType: new FormControl<FoodType | null>(null, Validators.required),
    });
    const lsRecipe = localStorage.getItem('recipe');
    if (lsRecipe) {
      this.recipe = JSON.parse(lsRecipe);
    }
  }

  ngOnInit(): void {
  }

}
