import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";
import { connectToSession, sendMessageToAgent } from "./api";

export default function App() {
  const [userId, setUserId] = useState("user1");
  const [sessionId, setSessionId] = useState("sess1");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const connect = async () => {
    try {
      await connectToSession(userId, sessionId);
      setConnected(true);
    } catch (err) {
      alert("Failed to connect. See console.");
      console.error(err);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: "You", text }]);

    try {
      const finalText = await sendMessageToAgent(userId, sessionId, text);
      setMessages((prev) => [...prev, { sender: "Tutor Bot", text: finalText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "Tutor Bot", text: "⚠️ Failed to get a response." }]);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>AI Tutor</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={connect} fullWidth>
          Connect
        </Button>
        <Typography variant="body2" sx={{ mt: 1, color: connected ? "green" : "red" }}>
          {connected ? "✅ Connected!" : "Not connected"}
        </Typography>
      </Paper>

      {connected && (
        <>
          <ChatBox messages={messages} />
          <MessageInput onSend={handleSend} />
        </>
      )}
    </Container>
  );
}

