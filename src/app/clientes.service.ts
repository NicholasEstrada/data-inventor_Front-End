import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { dominioClass } from './servico-prestado/dominioClass';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase;

  constructor(private http: HttpClient) { }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiURL}`, cliente);
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  getDominios(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/inventor/dominios`);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/inventor/deletesensetivedatas/${cliente.id}`);
  }

  getDadosSensiveisPorDominio(id: number, page: number, size: number): Observable<any> {
    let params = new HttpParams().set('dominioId', id.toString()).set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.apiURL}/inventor/dadosSensiveisDomain`, { params });
  }

  consultarDadosSensiveisPorPathLocation(pathLocationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/inventor/dadosSensiveisPorPathLocation?pathLocationId=${pathLocationId}`);
  }
}
