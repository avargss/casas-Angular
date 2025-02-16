import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor() { }

    guardarEnLocalStorage(cliente: Cliente): void {
        let clientes: Cliente[] = JSON.parse(localStorage.getItem('clientes') || '[]');
        clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    getClientesFromLocalStorage(): Cliente[] {
        return JSON.parse(localStorage.getItem('clientes') || '[]');
    }

}