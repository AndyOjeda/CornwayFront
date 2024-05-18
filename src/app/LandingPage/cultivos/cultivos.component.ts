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
export class CultivosComponent {

  cultivos: any[] = [];
  TiposCultivos: any[] = [];
  Nombre: string = '';
  IdTipoCultivo: number = 0;
  Area: string = '';

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

  CreateCultivo(): void {
    this.ApiService.CreateCultivo(this.Nombre, this.IdTipoCultivo, this.Area).subscribe(
      response => {
        console.log('Cultivo added successfully', response);
        // Maneja la respuesta exitosa aquí
      },
      error => {
        console.error('Error adding cultivo', error);
        // Maneja el error aquí
      }
    );
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
