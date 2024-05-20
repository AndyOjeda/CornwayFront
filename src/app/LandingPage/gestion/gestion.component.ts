import { Component, inject, TemplateRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [ ButtonModule, RouterOutlet, CardModule, DialogModule, InputTextModule, NgbDatepickerModule, DropdownModule, CommonModule, FormsModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {

  cultivos: any[] = [];
  gestion: any[] = [];
  TiposCultivos: any[] = [];
  IdUsuario: number = 0;
  IdTipoCultivo: number = 0;
  Area: string = '';
  Nombre: string = '';
  IdGestionCultivo: number = 0;
  IdCultivo: number = 0;
  IdTipoGestionCultivo: number = 0;
  IdInsumoGestionCultivo: number = 0;
  FechaGestion: string = '';
  Comentario: string = '';

  idUsuario = localStorage.getItem('IdUsuario');

  constructor(private ApiService: ApiService) {}

  //Traer los cultivos
  ngOnInit(): void {
    this.getCultivos();
  }

  //METODOS CULTIVOS
  getCultivos(){
    const idUsuario = localStorage.getItem('IdUsuario');
    if(idUsuario){
    this.ApiService.getCultivos().subscribe((data: any) => {
      console.log(data);
      this.cultivos = data.filter((cultivo: any) => cultivo.idUsuario == idUsuario);
      console.log(this.cultivos);
    });
  }
}

  CreateCultivo(): void {
    const idUsuario = localStorage.getItem('IdUsuario');
    if (idUsuario) {
      this.ApiService.CreateCultivo(+idUsuario, this.Nombre, this.IdTipoCultivo, this.Area).subscribe(
        response => {
          console.log('Cultivo added successfully', response);
          window.location.reload();
          // Maneja la respuesta exitosa aquí
        },
        error => {
          console.error('Error adding cultivo', error);
          // Maneja el error aquí
        }
      );
    } else {
      console.error('IdUsuario not found in localStorage');
    }
  }

  UpdateCultivo(): void {
    const idUsuario = localStorage.getItem('IdUsuario');
    if (idUsuario) {
    this.ApiService.updateCultivo(this.IdCultivo, +idUsuario, this.Nombre, this.IdTipoCultivo, this.Area).subscribe(
      response => {
        console.log('Cultivo updated successfully', response);
        window.location.reload();
        // Maneja la respuesta exitosa aquí
      },
      error => {
        console.error('Error updating cultivo', error);
        // Maneja el error aquí
      }
    );
  }
  }


  //METODOS GESTION

  getGestion(){
    const idUsuario = localStorage.getItem('IdUsuario');
    if(idUsuario){
    this.ApiService.getGestionesCultivos().subscribe((data: any) => {
      console.log(data);
      this.gestion = data.filter((gestion: any) => gestion.idUsuario == idUsuario);
      console.log(this.gestion);
    });
  }
}



  private modalService = inject(NgbModal);
	closeResult = '';

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}

