interface ProviderData {
  user_name: string
  user_email: string
  message: string
}
async function fetchAPI(url: string, ...params: RequestInit[]) {
  const requestUrl = url

  const response = await fetch(requestUrl, ...params)
  const content = response

  return content
}

export async function sendContactMail(provider: string) {
  const providerData = JSON.parse(provider)
  const response = await fetchAPI(import.meta.env.VITE_APP_BACKEND_MAIL, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider: {
        name: providerData.user_name,
        email: providerData.user_email,
        message: providerData.message,
        phone: providerData.phone,
      },
    }),
    method: 'POST',
  })
  if (response) {
    console.log(response)
  }

  /* return response?.data */
}
