import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleClick = () => {
    onSend(input);
    setInput("");
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        label="Ask a question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleClick}>
        Send
      </Button>
    </Box>
  );
}

