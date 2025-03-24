import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class BugsService {
  async getAllBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator', 'name picture')
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId)
    await bug.populate('creator', 'name picture')
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

  async editBug(bugId, bugData, userInfo) {
    const bugToUpdate = await this.getBugById(bugId)
    if (bugToUpdate.creatorId != userInfo.id) {
      throw new Forbidden('you cant edit a bug you are not the creator of')
    }
    bugToUpdate.updateOne(bugData)
    bugToUpdate.title = bugData.title ?? bugToUpdate.title
    bugToUpdate.description = bugData.description ?? bugToUpdate.description
    await bugToUpdate.save()
    return bugToUpdate
  }


  // TODO need to figure out correct way to check id



  async deleteBug(userInfo, bugId) {
    const bugToDelete = await this.getBugById(bugId)
    if (bugToDelete.creatorId != userInfo.id) {
      throw new Forbidden('you cant delete a bug you did not create')
    }
    await bugToDelete.deleteOne()
    await bugToDelete.save()
    return `${bugToDelete.title} was deleted`
  }

}
export const bugsService = new BugsService()