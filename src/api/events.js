import { API, TEAM_ID } from '../config/constants.js'

export const getLastNextGame = async (body) => {
  return fetch(`${API}/event/public/special`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, team: TEAM_ID }),
  })
}