import express, { Express } from 'express'
class App {
  private app: Express;
  public constructor() {
    this.app = express();
  }

  public getApp(): Express {
    return this.app
  }

}


export default new App().getApp()


