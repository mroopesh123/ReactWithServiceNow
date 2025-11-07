import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

export default function CreateInc() {
  const [form, setForm] = useState({
    caller: "",
    urgency: "",
    impact: "",
    priority: "",
    short_description: "",
  });

  const calculatePriority = (urgency, impact) => {
    const matrix = {
      "1-High": { "1-High": "1-Critical", "2-Medium": "2-High", "3-Low": "3-Moderate" },
      "2-Medium": { "1-High": "2-High", "2-Medium": "3-Moderate", "3-Low": "4-Low" },
      "3-Low": { "1-High": "3-Moderate", "2-Medium": "4-Low", "3-Low": "5-Planning" },
    };
    return matrix[urgency]?.[impact] || "";
  };

  useEffect(() => {
    if (form.urgency && form.impact) {
      const priority = calculatePriority(form.urgency, form.impact);
      const short_description = `Incident reported by ${form.caller || "Unknown"} - Priority: ${priority}`;
      setForm((prev) => ({ ...prev, priority, short_description }));
    }
  }, [form.urgency, form.impact, form.caller]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Card sx={{ p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Incident Form
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Caller"
              name="caller"
              value={form.caller}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              select
              fullWidth
              label="Urgency"
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="1-High">1 - High</MenuItem>
              <MenuItem value="2-Medium">2 - Medium</MenuItem>
              <MenuItem value="3-Low">3 - Low</MenuItem>
            </TextField>

            <TextField
              select
              fullWidth
              label="Impact"
              name="impact"
              value={form.impact}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="1-High">1 - High</MenuItem>
              <MenuItem value="2-Medium">2 - Medium</MenuItem>
              <MenuItem value="3-Low">3 - Low</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Priority"
              name="priority"
              value={form.priority}
              margin="normal"
              InputProps={{ readOnly: true }}
            />

            <TextField
              fullWidth
              label="Short Description"
              name="short_description"
              value={form.short_description}
              margin="normal"
              InputProps={{ readOnly: true }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
