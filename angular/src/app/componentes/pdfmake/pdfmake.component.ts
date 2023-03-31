import { Component, OnInit } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Prere } from 'src/app/models/prere';
import { PreInscripcionService } from 'src/app/services/pre_inscripcion/pre-inscripcion.service';
import { ActivatedRoute } from '@angular/router';
import { table } from 'console';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdfmake',
  templateUrl: './pdfmake.component.html',
  styleUrls: ['./pdfmake.component.css']
})

export class PdfmakeComponent implements OnInit {
  alumnos: Prere[] = [];
  alumnosCarrera1: Prere[] = [];
  alumnosCarrera2: Prere[] = [];
  carrera: any;

  content1: any[] = [];
  content2: any[] = [];
  
  constructor(private route: ActivatedRoute, private preService: PreInscripcionService) {
    this.route.queryParams.subscribe(_params => {
      this.carrera = _params['carrera'];
    });
  }

  ngOnInit(): void {
    this.preService.getAlumnos().subscribe((datos) => {
      this.alumnos = datos;
    })
  }

  createPdf() {

    if (this.carrera[0] == '1') {

      this.alumnosCarrera1 = this.alumnos.filter(carrera => {
        return carrera.carrera == "Tecnico Superior en Desarrollo de Software Full Stack";
      });

      this.alumnosCarrera1.forEach(element => {
        this.content1.push({ text: `${element.nombre} ${element.apellido} - ${element.email} - ${element.numDoc} - ${element.nivelUser}` });
      });

      const pdfDefinition: any = {
        content: [
          {
            stack: [
              'Lista de Alumnos',
            ],
            style: 'header'
          },

          {
            table: {
              widths: ['*'],
              body: [
                [{text: 'Nombre y Apellido        -        Email        -        N° Doc.        -        Nivel Educativo', margin: [15, 10, 0, 0]}],
                [
                  {
                    stack: [
                      {
                        ol: this.content1, margin: [5, 10, 5, 5]
                      }
                    ]
                  }
                ]
              ]
            }
          }
        ],

        styles: {
          header: {
            fontSize: 14,
            bold: true,
            alignment: 'left',
            margin: [0, 20, 0, 0]
          },
        },

        defaultStyle: {
          fontSize: 11.5,
          lineHeight: 2
        }
      }

      pdfMake.createPdf(pdfDefinition).open();

    }

    if (this.carrera[0] == '2') {
      this.alumnosCarrera2 = this.alumnos.filter(carrera => {
        return carrera.carrera == "Tecnico Superior en Infraestructura de Redes Full Stack";
      });

      this.alumnosCarrera2.forEach(element => {
        this.content2.push({ text: `${element.nombre} ${element.apellido}  -  ${element.email}  -  ${element.numDoc}  -  ${element.nivelUser}` });
      });

      const pdfDefinition2: any = {
        content: [
          {
            stack: [
              'Lista de Alumnos',
            ],
            style: 'header'
          },

          {
            table: {
              widths: ['*'],
              body: [
                [{text: 'Nombre y Apellido        -        Email        -        N° Doc.        -        Nivel Educativo', margin: [15, 10, 0, 0]}],
                [
                  {
                    stack: [
                      {
                        ol: this.content2, margin: [5, 10, 5, 5]
                      }
                    ]
                  }
                ]
              ]
            }
          }
        ],

        styles: {
          header: {
            fontSize: 14,
            bold: true,
            alignment: 'left',
            margin: [0, 20, 0, 0]
          },
        },

        defaultStyle: {
          fontSize: 11.5,
          lineHeight: 2
        }
      }

      pdfMake.createPdf(pdfDefinition2).open();
      
    }
  }
}
