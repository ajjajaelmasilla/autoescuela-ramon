import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      nif: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup): null | { mismatch: boolean } {
    return formGroup.get('contrasena')?.value === formGroup.get('confirmarContrasena')?.value ? null : { mismatch: true };
  }

  registro(): void {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.value;
      delete usuario.confirmarContrasena;
      if (this.usuarioService.registro(usuario)) {
        alert('Usuario registrado con éxito');
        this.router.navigate(['login']);
      } else {
        alert('El usuario introducido ya existe.');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
