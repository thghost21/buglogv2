import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { BugsSchema } from '../models/Bugs.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugsSchema)
}

export const dbContext = new DbContext()