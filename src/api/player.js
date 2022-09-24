import { API, TEAM_ID } from '../config/constants.js'

export const getPlayersList = async (body) => {
  return fetch(`${API}/player/public/list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, team: TEAM_ID }),
  })
}

export const averageStat = async () => {
  return fetch(`${API}/player/public/stat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ team: TEAM_ID }),
  })
}


export const getSinglePlayer = async (id) => {
  return fetch(`${API}/player/public/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
}

