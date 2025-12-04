import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserAccount} from '../donnes';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() loginSuccess = new EventEmitter<UserAccount>();

  isRegistering = false;
  authError = '';
  authForm = { username: '', password: '', name: '' };

  toggleAuthMode() {
    this.isRegistering = !this.isRegistering;
    this.authError = '';
    this.authForm = { username: '', password: '', name: '' };
  }

  handleAuth() {
    this.authError = '';
    if (this.isRegistering) this.register();
    else this.login();
  }

  register() {
    const users = this.getUsers();
    if (users.find(u => u.username === this.authForm.username)) {
      this.authError = "Cet identifiant est déjà pris.";
      return;
    }
    const newUser: UserAccount = { ...this.authForm };
    users.push(newUser);
    this.saveUsers(users);
    this.loginSuccess.emit(newUser);
  }

  login() {
    const users = this.getUsers();
    const user = users.find(u => u.username === this.authForm.username && u.password === this.authForm.password);
    if (user) this.loginSuccess.emit(user);
    else this.authError = "Identifiant ou mot de passe incorrect.";
  }

  private getUsers(): UserAccount[] {
    const usersJson = localStorage.getItem('calorieGuard_users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: UserAccount[]) {
    localStorage.setItem('calorieGuard_users', JSON.stringify(users));
  }
}
