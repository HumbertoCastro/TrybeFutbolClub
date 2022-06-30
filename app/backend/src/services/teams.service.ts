import Team from '../database/models/Team';
// import ThrowError from '../helpers/throwError';

export default class TeamsService {
  public getAll = async () => Team.findAll();
  public getBy = async (id: string) => Team.findByPk(id);
}
