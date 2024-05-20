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
  selector: 'app-cultivos',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, CardModule, DialogModule, InputTextModule, NgbDatepickerModule, DropdownModule, CommonModule, FormsModule],
  templateUrl: './cultivos.component.html',
  styleUrl: './cultivos.component.css'
})
export class CultivosComponent{

  cultivos: any[] = [];
  Gestion: any[] = [];
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


  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.getCultivos();
  }

  getCultivos(): void {
    this.ApiService.getCultivos().subscribe(
      data => {
        this.cultivos = data;
      },
      error => {
        console.error('Error fetching data', error);
        // Manejar el error adecuadamente
      }
    );
  }

  getTiposCultivos(): void {
    this.ApiService.getTiposCultivos().subscribe(
      data => {
        this.TiposCultivos = data;
      },
      error => {
        console.error('Error fetching data', error);
        // Manejar el error adecuadamente
      }
    );
  }

  getGestion(): void {
    this.ApiService.getGestion().subscribe(
      data => {
        this.Gestion = data;
      },
      error => {
        console.error('Error fetching data', error);
        // Manejar el error adecuadamente
      }
    );
  }

  CreateCultivo(): void {
    this.ApiService.CreateCultivo(this.IdUsuario, this.Nombre, this.IdTipoCultivo, this.Area).subscribe(
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
  }

  deleteCultivo(id: number): void {
    this.ApiService.deleteCultivo(id).subscribe(
      response => {
        console.log('Cultivo deleted successfully', response);
        // Actualizar la lista de cultivos después de la eliminación
        this.cultivos = this.cultivos.filter(cultivo => cultivo.id !== id);
      },
      error => {
        console.error('Error deleting cultivo', error);
        // Manejar el error adecuadamente
      }
    );
  }

  updateGestion() {
    this.ApiService.updateGestion(this.IdGestionCultivo, this.IdCultivo, this.IdTipoGestionCultivo, this.IdInsumoGestionCultivo, this.FechaGestion, this.Comentario)
      .subscribe((response: any) => {
        console.log('Gestión actualizada:', response);
        // Aquí podrías redirigir o mostrar un mensaje de éxito
      }, error => {
        console.error('Error al actualizar gestión:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      });
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
