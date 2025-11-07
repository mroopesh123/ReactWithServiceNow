import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import CreateInc from "./CreateInc";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        try {
          const incidentList = await axios.get(
            "http://localhost:3001/api/incidents",
            { withCredentials: true }
          );
          setIncidents(incidentList.data.result);
        } catch (error) {
          console.error("Error fetching incidents:", error);
        }
      }
    }

    fetchData();
  }, [isLogged]);

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  const handleIncidentCreated = async () => {
    const incidentList = await axios.get(
      "http://localhost:3001/api/incidents",
      { withCredentials: true }
    );
    setIncidents(incidentList.data.result);
    setShowCreateForm(false);
  };

  return (
    <>
      {isLogged ? (
        <>
          {!showCreateForm ? (
            <>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 5, mt: 3, mb: 2 }}
              >
                <Typography variant="h5">Incident Records</Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateClick}
                >
                  ➕ Create New Incident
                </Button>
              </Stack>
              <Grid container spacing={4} justifyContent="center">
                {incidents.map((inc) => (
                  <Grid item key={inc.sys_id}>
                    <Card sx={{ width: 300, height: 200 }}>
                      <CardContent>
                        <Typography variant="h6">
                          Incident #: {inc.number}
                        </Typography>
                        <Typography variant="body2">
                          Description: {inc.short_description}
                        </Typography>
                        <Typography variant="body2">
                          State: {inc.state}
                        </Typography>
                        <Typography variant="body2">
                          Priority: {inc.priority}
                        </Typography>
                        <Button
                          sx={{ mt: 1 }}
                          variant="contained"
                          color="success"
                        >
                          Edit
                        </Button>
                        <Button
                          sx={{ mt: 1, mx: 1 }}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <CreateInc
              onClose={handleCloseForm}
              onCreated={handleIncidentCreated}
            />
          )}
        </>
      ) : (
        <Typography>Please log in</Typography>
      )}
    </>
  );
}





























// import {
//   Stack,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Grid,
// } from "@mui/material";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthProvider";
// import axios from "axios";
// import CreateInc from "./CreateInc";

// export default function Home() {
//   const { isLogged } = useContext(AuthContext);
//   const [incidents, setIncidents] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       if (isLogged) {
//         const incidentList = await axios.get(
//           "http://localhost:3001/api/incidents",
//           { withCredentials: true }
//         );
//         setIncidents(incidentList.data.result);
//       }
//     }

//     fetchData();
//   }, [isLogged]);

//   return (
//     <>
//       {isLogged && incidents ? (
//         <>
//           <div onClick={incident()}>Create New Incident?</div>
//           <Stack spacing={3}>
//             <Typography variant="h5">Incident Records:</Typography>

//             <Grid container spacing={5} justifyContent={"space-around"}>
//               {incidents.map((inc, index) => {
//                 return (
//                   <Grid key={inc.sys_id}>
//                     <Card sx={{ width: 300, height: 200 }}>
//                       <CardContent>
//                         <Typography variant="h6">
//                           Incident #: {inc.number}
//                         </Typography>
//                         <Typography variant="body2">
//                           Description: {inc.short_description}
//                         </Typography>
//                         <Typography variant="body2">
//                           State: {inc.state}
//                         </Typography>
//                         <Typography variant="body2">
//                           Priority: {inc.priority}
//                         </Typography>
//                         <Button
//                           sx={{ mt: 1 }}
//                           variant="contained"
//                           color="success"
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           sx={{ mt: 1, mx: 1 }}
//                           variant="contained"
//                           color="error"
//                         >
//                           Delete
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 );
//               })}
//             </Grid>
//           </Stack>
//         </>
//       ) : (
//         <Typography>Please log in</Typography>
//       )}
//     </>
//   );
// }
