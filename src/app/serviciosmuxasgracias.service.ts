






import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from
'@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class ServiciosmuxasgraciasService {
httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json',
'Access-Control-Allow-Origin' :'*'
})
}
// Se establece la base url del API a consumir
apiURL = 'https://jsonplaceholder.typicode.com';
// Se declara la variable http de tipo HttpClient
constructor(private http:HttpClient) {}}