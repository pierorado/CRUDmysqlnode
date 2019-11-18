import { Component } from '@angular/core';
import { ProductosService } from './productos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'node.js y MYSQL Lab 11';
  lista=null;
  prod = {
    codigo:null,
    descripcion:null,
    precio:null
  }
  constructor(private productosServicio: ProductosService) {}

  ngOnInit() {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.productosServicio.listar().subscribe(result => {
      this.lista = result;
    });
  }

  nuevo() {
    this.productosServicio.nuevo(this.prod).subscribe(result => {
      if (result=='ok') {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }


  actualizar() {
    this.productosServicio.actualizar(this.prod).subscribe(result => {
      if (result.nModified=='1') {
        this.limpiar();
        this.recuperarTodos();
      }
    });    
  }
  
  mostrar(id) {
    this.productosServicio.mostrar(id).subscribe(result => {
      this.prod = result
       console.log("This is a custom directive!");
    });

  }


 






  eliminar(codigo) {
    if(!confirm("Esta seguro que desea eliminar este registro?"))
      return;
    this.productosServicio.eliminar(codigo).subscribe(result => {
      if (result=='ok') {
        this.recuperarTodos();
      }
    });
  }


  hayRegistros() {
    return true;
  }
  limpiar(){
    this.prod = { 
      codigo:null, 
      descripcion:null, 
      precio:null
    };
  }
}