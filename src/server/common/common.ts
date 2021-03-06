/* File for holding common used methods */
//import { NextFunction, Request, Response } from "express";
import { IUser } from "../../shared/interfaces/iModels";

export function hasRequiredRole(user: IUser, roles: string[]) {
  if (user !== undefined) {
    const hasRequiredRole = user.roles.some(x => { return roles.indexOf(x) !== -1; });
    return hasRequiredRole;
  }
  return false;
}

/**
 * Function for check if a user is logged in or not
 * It will send a 401 to res parameter, if the user is not logged in.
 * @param req the request
 * @param res the response
 * @param next callback / that to do next
 */
/*export function isLoggedIn(req: Request, res: Response, next: NextFunction): void {
    // if user is authenticate in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    }
    //res.redirect('/');
    res.send(401, { login: false, text: 'You are not logged in!' });
}*/
