import { API, TEAM_ID } from '../config/constants.js'

export const getLastNextGame = async (body) => {
  return fetch(`${API}/event/public/special`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, team: TEAM_ID }),
  })
}


export const getMontEvents = async (body) => {
  return fetch(`${API}/event/public/month`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, team: TEAM_ID }),
  })
}


export const getSingleEvent = async (id) => {
  return fetch(`${API}/event/public/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
}