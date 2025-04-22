import express, { Express, NextFunction, Request, Response } from 'express'
class App {
  private app: Express;
  public constructor() {
    this.app = express();
  }
  public getApp(): Express {
    return this.app
  }

  private handleErrors() {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.log("XXXError:", err);
      res.status(err.status || 500).json({
        error: err.message || "Internal Server Error"
      })
    })
  }
}

export default new App().getApp()
