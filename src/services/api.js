const USERS_ENDPOINT = 'https://randomuser.me/api/?results=20'

export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{ status?: number, cause?: unknown }} [options]
   */
  constructor(message, options = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = options.status
    this.cause = options.cause
  }
}

/**
 * Fetches a list of random users from randomuser.me.
 * @returns {Promise<object[]>}
 */
export async function fetchUsers() {
  let response
  try {
    response = await fetch(USERS_ENDPOINT)
  } catch (err) {
    throw new ApiError('Network error while loading users.', { cause: err })
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}.`, {
      status: response.status
    })
  }

  let data
  try {
    data = await response.json()
  } catch (err) {
    throw new ApiError('Could not parse response from server.', { cause: err })
  }

  if (!data?.results || !Array.isArray(data.results)) {
    throw new ApiError('Unexpected response format from server.')
  }

  return data.results
}
