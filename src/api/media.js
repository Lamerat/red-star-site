import { API, TEAM_ID } from '../config/constants.js'

export const listPhotosRequest = async (body) => {
  return fetch(`${API}/photo/public/list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, team: TEAM_ID }),
  })
}