import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secret-key',
  templateUrl: './secret-key.component.html',
  styleUrls: ['./secret-key.component.css']
})
export class SecretKeyComponent {
  private readonly HARD_CODED_KEY = 'infraon@hanTZ123';

  constructor(private router: Router) {
    this.promptForKey();
  }

  private async promptForKey(): Promise<void> {
    const { value: inputKey } = await Swal.fire({
      title: 'Enter Secret Key',
      input: 'text',
      inputLabel: 'Secret Key',
      inputPlaceholder: 'Enter your secret key here',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter a secret key!';
        }
        return '';
      }
    });

    if (inputKey) {
      this.handleKey(inputKey);
    }
  }

  private async handleKey(inputKey: string): Promise<void> {
    if (inputKey === this.HARD_CODED_KEY) {
      localStorage.setItem('secretKey', inputKey);
      await Swal.fire({
        title: 'Success!',
        text: 'Secret key has been stored.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['/']); // Redirect to the root
    } else {
      await Swal.fire({
        title: 'Error!',
        text: 'Invalid secret key.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  }
}
