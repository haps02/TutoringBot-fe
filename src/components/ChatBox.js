import { Paper, Typography } from "@mui/material";

export default function ChatBox({ messages }) {
  return (
    <Paper sx={{ height: 300, overflowY: "auto", p: 2, mb: 2 }}>
      {messages.map((msg, i) => (
        <Typography key={i} sx={{ mb: 1 }}>
          <strong>{msg.sender}:</strong> <span dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
        </Typography>
      ))}
    </Paper>
  );
}

function formatText(text) {
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/(\d+\.)/g, "<br>$1");
  return formatted.replace(/\n/g, "<br>");
}

