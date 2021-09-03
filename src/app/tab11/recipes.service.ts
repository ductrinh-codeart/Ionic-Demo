import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  readonly APIUrl = "http://localhost:55793/api";
  readonly RecipesUrl = "http://localhost:55793/Photos/Recipes/";
  readonly IngredientsUrl = "http://localhost:55793/Photos/Ingredients/";
  readonly CuisineUrl = "http://localhost:55793/Photos/Cuisines/";
  
  constructor(private http: HttpClient) { }


  //Image Section
  //Image for recipe
  UploadRecipeImage(val:any){
    return this.http.post(this.APIUrl+'/Recipes/SaveRecipesFile',val);
  }

  //Image for recipe steps

  //Image for ingredient
  UploadIngredientImage(val:any){
    return this.http.post(this.APIUrl+'/Ingredients/SaveIngredientsFile',val);
  }

  //Image for cuisines

  


  //Imported Recipes list
  getRecipeList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Recipes');
  }

  addRecipe(val:any){
    return this.http.post(this.APIUrl+'/Recipes',val);
  }

  updateRecipe(val:any){
    return this.http.put(this.APIUrl+'/Recipes',val);
  }

  deleteRecipe(val:any){
    return this.http.delete(this.APIUrl+'/Recipes/'+val);
  }



  //Imported Cuisines list
  GetAllCuisineName():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Cuisines/GetAllCuisineNames');
  }

  addCuisine(val:any){
    return this.http.post(this.APIUrl+'/Cuisines',val);
  }

  updateCuisine(val:any){
    return this.http.put(this.APIUrl+'/Cuisines',val);
  }

  deleteCuisine(val:any){
    return this.http.delete(this.APIUrl+'/Cuisines/'+val);
  }



  //Imported Levels list
  GetAllLevelName():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Cuisines/GetAllLevelNames');
  }
  


  //Imported Ingredients list
  GetAllIngredientName():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Ingredients/GetAllIngredientNames');
  }

  addIngredient(val:any){
    return this.http.post(this.APIUrl+'/Ingredients',val);
  }

  updateIngredient(val:any){
    return this.http.put(this.APIUrl+'/Ingredients',val);
  }

  deleteIngredient(val:any){
    return this.http.delete(this.APIUrl+'/Ingredients/'+val);
  }

  
  //get all relative Ingredients for 1 recipe with recipe id
  GetRecipeIngredients(val:any){
    return this.http.get<any>(this.APIUrl+'/RecipeIngredients/'+val);
  }

  addRecipeIngredient(val:any){
    return this.http.post(this.APIUrl+'/RecipeIngredients',val);
  }

  updateRecipeIngredient(val:any){
    return this.http.put(this.APIUrl+'/RecipeIngredients',val);
  }

  deleteRecipeIngredient(val:any){
    return this.http.delete(this.APIUrl+'/RecipeIngredient/'+val);
  }

  //get 1 Ingredient with ingredient id
  GetIngredient(val:any){
    return this.http.get<any>(this.APIUrl+'/Ingredients/'+val);
  }
}
