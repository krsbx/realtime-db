import _ from 'lodash';
import { hashText } from '../utils/encryption';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

class User extends BaseRepository(MODELS_NAME.USER) {
  public static async resourceToModel(resource: AnyRecord) {
    const model = _.pick(resource, ['username', 'email', 'password', 'role']);

    if (model.password) {
      model.password = await hashText(model.password);
    }

    return model;
  }

  public static async modelToResource(model: ModelStructure['user']) {
    const resource = _.omit(model, ['updatedAt', 'password']);

    return resource;
  }
}

export default User;
