import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useSearchParams } from "react-router-dom";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "20px auto",
  width: "100%",
  maxWidth: "500px",
  backgroundColor: theme.palette.background.paper,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const TrophyIcon = styled(EmojiEvents)(({ theme }) => ({
  color: "gold",
  marginLeft: theme.spacing(1),
}));

const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("id");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(`https://dummy-q-server.onrender.com/api/quizzes/${quizId}/submissions`);
        const data = await response.json();
        // Sort the data by score in descending order
        data.sort((a, b) => b.score - a.score);
        setLeaderboardData(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, [quizId]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const chartData = {
    labels: leaderboardData.map((user) => user.userName),
    datasets: [
      {
        label: "Score",
        data: leaderboardData.map((user) => user.score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Leaderboard Scores" },
    },
  };

  return (
    <Box p={3} display="flex" justifyContent="center" alignItems="center" className="min-h-[50vh]">
      <StyledCard>
        <CardContent>
          <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom>
            Leaderboard
          </Typography>

          {/* Tab Navigation */}
          <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Leaderboard" />
            <Tab label="Chart" />
          </Tabs>

          {/* Conditionally render content based on selected tab */}
          {selectedTab === 0 && (
            <List>
              {leaderboardData.map((user, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      <StyledAvatar>{index + 1}</StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          {user.userName}
                          {index === 0 && <TrophyIcon />}
                        </>
                      }
                      secondary={`Score: ${user.score}`}
                    />
                  </ListItem>
                  {index < leaderboardData.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}

          {selectedTab === 1 && <Bar data={chartData} options={chartOptions} />}
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default Leaderboard;
