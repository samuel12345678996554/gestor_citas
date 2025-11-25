import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './aside.html',
  styleUrl: './aside.css'
})
export class Aside {
items: MenuItem[] | undefined;
ngOnInit() {
        this.items = [
            
  {
    label: 'Citas',
    icon: 'pi pi-calendar',
    routerLink: '/citas',
  },
  {
    label: 'Especialidades',
    icon: 'pi pi-star',
    routerLink: '/especialidades',
  },
  {
    label: 'Historial Médico',
    icon: 'pi pi-book',
    routerLink: '/historial_medico'


  },
  {
    label: 'Medicos',
    icon: 'pi pi-user',
    routerLink: '/medicos',
  },
  {
    label: 'Pacientes',
    icon: 'pi pi-users',
    routerLink: '/pacientes',
  },


        ];
    }
}