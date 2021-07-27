import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  readonly APIUrl = "http://localhost:55793/api";
  readonly RecipesUrl = "http://localhost:55793/Photos/Recipes/";
  
  constructor(private http: HttpClient) { }


  //Image Section
  //Image for recipe
  UploadRecipeImage(val:any){
    return this.http.post(this.APIUrl+'/Recipes/SaveRecipesFile',val);
  }

  //Image for recipe steps

  //Image for ingredient

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



  //Imported Levels list
  GetAllLevelName():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Cuisines/GetAllLevelNames');
  }
  


  //Imported Ingredients list
  GetAllIngredientName():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Ingredients/GetAllIngredientNames');
  }
  
  //get all relative Ingredients for 1 recipe with recipe id
  GetRecipeIngredients(val:any){
    return this.http.get<any>(this.APIUrl+'/RecipeIngredients/'+val);
  }

  //get 1 Ingredient with ingredient id
  GetIngredient(val:any){
    return this.http.get<any>(this.APIUrl+'/Ingredients/'+val);
  }
}
