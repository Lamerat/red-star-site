import { API, TEAM_ID } from '../config/constants.js'

export const getArticles = async (body) => {
  return fetch(`${API}/info/public/list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, team: TEAM_ID }),
  })
}


export const getSingleArticle = async (id) => {
  return fetch(`${API}/info/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
}
