const apiBase = process.env.REACT_APP_BASE_URL;

export async function connectToSession(userId, sessionId) {
  const res = await fetch(`${apiBase}/apps/multi_agent_tool/users/${userId}/sessions/${sessionId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}

export async function sendMessageToAgent(userId, sessionId, text) {
  const res = await fetch(`${apiBase}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      appName: "multi_agent_tool",
      userId,
      sessionId,
      newMessage: {
        role: "user",
        parts: [{ text }]
      }
    })
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  
  return data[data.length-1].content.parts[0].text;

  return "⚠️ No final response returned.";
}


