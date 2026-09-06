const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent'

export function isMoodMatcherAvailable() {
  return Boolean(GEMINI_API_KEY)
}

export async function getMovieTitleForMood(moodDescription) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Mood Matcher is not configured. Add GEMINI_API_KEY to your .env.local file.'
    )
  }

  const prompt = `Suggest exactly one real movie that fits this mood: "${moodDescription}".
Reply with ONLY the movie title, no year, no punctuation, no explanation.`

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!response.ok) {
    throw new Error('Mood Matcher could not reach Gemini right now.')
  }

  const data = await response.json()
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!rawText) {
    throw new Error("Mood Matcher couldn't come up with a suggestion.")
  }

  return rawText.trim().replace(/^["'“”]+|["'“”.]+$/g, '')
}
