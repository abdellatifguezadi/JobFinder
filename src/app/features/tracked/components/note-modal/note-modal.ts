import { Component, inject, OnInit, output, input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface NoteModalData {
  jobTitle: string;
  company: string;
}

@Component({
  selector: 'app-note-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './note-modal.html',
  styleUrl: './note-modal.css'
})
export class NoteModal implements OnInit {
  fb = inject(FormBuilder);
  
  jobTitle = input.required<string>();
  company = input.required<string>();
  noteForm!: FormGroup;
  
  onClose = output<string | null>();

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      note: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  cancel(): void {
    this.onClose.emit(null);
  }

  track(): void {
    if (this.noteForm.valid) {
      this.onClose.emit(this.noteForm.get('note')?.value);
    }
  }




  getError(formControlName: string): string {
    const control = this.noteForm.get(formControlName);

    if(!control || !control.touched || control.valid){
        return ''
    }

    if(control.errors?.['required']){
        return 'Note is required to track this application'
    }

    if(control.errors?.['minlength']){
        return 'Note must be at least 3 characters'
    }

    return 'invalide note'
  }
}
