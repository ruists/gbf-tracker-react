import { authenticationService } from 'app/services/authentication.service'

export async function authorizedFetch(method, url, reqBody) {
  if (method != 'POST' && method != 'GET') {
    return -1
  }
  if (!url || url.length === 0) {
    return -1
  }

  const userInfo = authenticationService.currentUserValue
  const body =
    method == 'GET'
      ? undefined
      : JSON.stringify({
          token: userInfo.token,
          ...reqBody,
        })
  const reqOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: userInfo.token,
    },
    body: body,
  }

  const res = await fetch(url, reqOptions)
  if (res.status === 401) {
    authenticationService.logout()
    //redirect to login
    return 0
  }
  const result = await res.json()
  return { result: result, code: res.status }
}
