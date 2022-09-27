import { API, TEAM_ID } from '../config/constants.js'

export const getBanners = async (body) => {
  return fetch(`${API}/banner/public/list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, team: TEAM_ID }),
  })
}