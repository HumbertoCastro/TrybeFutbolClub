export const user = {
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

export const userTipos = {
  rightUser: {
    email: 'user@user.com',
    password: 'secret_user',
  },
  wrongPassword: {
    email: 'user@user.com',
    password: 'secret',
  },
  wrongEmail: {
    email: 'user@user',
    password: 'secret_user',
  },
  without: {
    email: '',
    password: '',
  },
};

export const teams = [
  {
    id: 1,
    teamName:"Avaí/Kindermann"
  },
  {
    id: 2,
    teamName:"Bahia"
  }
]

export const matches = [
  {
    id: 41,
    home_team: 'São Paulo',
    home_team_goals: '2',
    away_team: 'Internacional',
    away_team_goals: '0',
    in_progress: 1,
  },
  {
    id: 42,
    home_team: 'Ferroviária',
    home_team_goals: '1',
    away_team: 'Avaí/Kindermann',
    away_team_goals: '0',
    in_progress: 1,
  },
  {
    id: 43,
    home_team: 'Napoli-SC',
    home_team_goals: '0',
    away_team: 'Minas Brasília',
    away_team_goals: '0',
    in_progress: 1,
  },
  {
    id: 44,
    home_team: 'Flamengo',
    home_team_goals: '2',
    away_team: 'São José-SP',
    away_team_goals: '2',
    in_progress: 1,
  },
  {
    id: 45,
    home_team: 'Cruzeiro',
    home_team_goals: '1',
    away_team: 'Botafogo',
    away_team_goals: '1',
    in_progress: 1,
  },
  {
    id: 46,
    home_team: 'Corinthians',
    home_team_goals: '1',
    away_team: 'Palmeiras',
    away_team_goals: '1',
    in_progress: 1,
  },
  {
    id: 47,
    home_team: 'Grêmio',
    home_team_goals: '1',
    away_team: 'Santos',
    away_team_goals: '2',
    in_progress: 1,
  },
  {
    id: 48,
    home_team: 'Real Brasília',
    home_team_goals: '1',
    away_team: 'Bahia',
    away_team_goals: '1',
    in_progress: 1,
  },
  {
    id: 1,
    home_team: 'São Paulo',
    home_team_goals: '1',
    away_team: 'Grêmio',
    away_team_goals: '1',
    in_progress: 0,
  },
  {
    id: 2,
    home_team: 'Internacional',
    home_team_goals: '1',
    away_team: 'Santos',
    away_team_goals: '1',
    in_progress: 0,
  },
  {
    id: 3,
    home_team: 'Corinthians',
    home_team_goals: '3',
    away_team: 'Napoli-SC',
    away_team_goals: '0',
    in_progress: 0,
  }
]