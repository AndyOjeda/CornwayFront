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
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [ ButtonModule, RouterOutlet, CardModule, DialogModule, InputTextModule, NgbDatepickerModule, DropdownModule, CommonModule, FormsModule, TableModule],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.css'
})
export class InsumosComponent {

  insumos: any[] = [];
  IdInsumoGestionCultivo: number = 0;
  IdInsumoCultivo: number = 0;

  Nombre: string = '';
  Dosis: number = 0;
  Unidad: string = '';

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.getInsumosCultivos();
  }

  getInsumosCultivos(){
    const idUsuario = localStorage.getItem('IdUsuario');
    if(idUsuario){
    this.ApiService.getInsumosGestionCultivos().subscribe((data: any) => {
      console.log(data);
      this.insumos = data;
      console.log(this.insumos);
    });
  }
  }

  CreateInsumosGestionCultivo(): void {
      this.ApiService.CreateInsumoGestionCultivo(this.IdInsumoCultivo, this.Nombre, this.Dosis, this.Unidad).subscribe(
        response => {
          console.log('Cosecha added successfully', response);
          window.location.reload();
          // Maneja la respuesta exitosa aquí
        },
        error => {
          console.error('Error adding Insumo', error);
          // Maneja el error aquí
        }
      );
    }

  UpdateInsumosGestionCultivo(): void {
  }

  DeleteInsumosGestionCultivo(): void {
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
