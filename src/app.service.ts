import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Foglalas } from './Foglalas.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservations13e',
});

@Injectable()
export class AppService {
  

  async getNumberOfGuests() {
    const [results] = await mysqlConnection.execute("SELECT id, name, email, startDate, guests FROM reservations")
    return results as Foglalas[];
  }

  async insertFoglalas(name: string, email: string, startDate: Date, guests: number) {
    await mysqlConnection.execute("INSERT INTO reservations (name, email, startDate, guests) VALUES (?,?,?,?)", [name, email, startDate, guests]);
  }
}
