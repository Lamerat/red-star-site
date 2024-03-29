import { API, TEAM_ID } from '../config/constants.js'

export const listNewsRequest = async (body) => {
  return fetch(`${API}/news/public/list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, team: TEAM_ID }),
  })
}


export const singleNewsRequest = async (id) => {
  return fetch(`${API}/news/public/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
}