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
  selector: 'app-cosecha',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, CardModule, DialogModule, InputTextModule,
     NgbDatepickerModule, DropdownModule, CommonModule, FormsModule],
  templateUrl: './cosecha.component.html',
  styleUrl: './cosecha.component.css'
})

export class CosechaComponent {

  cosechas: any[] = [];
  cosecha: any[] = [];
  TiposCultivos: any[] = [];
  IdUsuario: number = 0;
  IdTipoCultivo: number = 0;
  Area: string = '';
  Nombre: string = '';
  IdGestionCultivo: number = 0;
  IdCosecha: number = 0;
  IdCultivo: number = 0;
  IdTipoGestionCultivo: number = 0;
  IdInsumoGestionCultivo: number = 0;
  FechaGestion: string = '';
  Comentario: string = '';
  Cantidad: number = 0;
  Fecha: string = '';

  idUsuario = localStorage.getItem('IdUsuario');

  constructor(private ApiService: ApiService) {}

  //Traer los cultivos
  ngOnInit(): void {
    this.getCosechas();
  }

  getCosechas(){
    const idUsuario = localStorage.getItem('IdUsuario');
    if (idUsuario !== null && idUsuario !== undefined) {
        this.ApiService.getCosechas().subscribe(
            (data: any) => {
                console.log(data);
                this.cosechas = data.filter((cosecha: any) => cosecha?.cultivo?.idUsuario == idUsuario);
                console.log(this.cosechas);
            },
            (error: any) => {
                console.error('Error al obtener las cosechas:', error);
            }
        );
      }
    }
  CreateCosecha(): void {
    const idUsuario = localStorage.getItem('IdUsuario');
    if (idUsuario) {
      this.ApiService.CreateCosecha(this.IdCultivo, this.Cantidad, this.Fecha).subscribe(
        response => {
          console.log('Cosecha added successfully', response);
          window.location.reload();
          // Maneja la respuesta exitosa aquí
        },
        error => {
          console.error('Error adding Cosecha', error);
          // Maneja el error aquí
        }
      );
    } else {
      console.error('IdUsuario not found in localStorage');
    }
  }

  UpdateCosecha(): void {
    this.ApiService.updateCosecha(this.IdCosecha, this.IdCultivo, this.Cantidad, this.Fecha).subscribe(
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


  actualizar(){
    window.location.reload();
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
