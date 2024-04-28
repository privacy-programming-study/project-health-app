import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  private backupUrl = 'http://localhost:3000/backup';

  constructor(private _http: HttpClient) { }

  // admin creates backups
  createBackup(data: {}):Observable<any> {
    return this._http.post(`${this.backupUrl}/create-backup`, data);
  }
}
