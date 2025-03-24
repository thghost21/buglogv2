import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";

export class BugsController extends BaseController {
  constructor(parameters) {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
  }
  /**
* Creates a new value from request body and returns the value
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
  async createBug(request, response, next) {
    try {
      const bugData = request.body
      const userInfo = request.userInfo
      bugData.creatorId = userInfo.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }
  /**
* Creates a new value from request body and returns the value
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
  async getAllBugs(request, response, next) {
    try {
      const bugs = await bugsService.getAllBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }

  }

}
/**
* Creates a new value from request body and returns the value
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/