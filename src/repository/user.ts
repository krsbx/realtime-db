import { MODELS_NAME } from './models';
import BaseRepository from './baseRepository';

class User extends BaseRepository(MODELS_NAME.USER) {}

export default User;
