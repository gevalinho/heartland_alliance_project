// import React from "react";
// import { Grid, Paper, Typography } from "@mui/material";
// import AdherenceChart from "./AdherenceChart";
// import ClientList from "./ClientList";
// import GeographicalDistribution from "./GeographicalDistribution";

// const Dashboard: React.FC = () => {
//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Typography variant="h4">
//           Heartland Alliance Retention Office Dashboard
//         </Typography>
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <Paper>
//           <AdherenceChart />
//         </Paper>
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <Paper>
//           <GeographicalDistribution />
//         </Paper>
//       </Grid>
//       <Grid item xs={12}>
//         <Paper>
//           <ClientList />
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

"use client";

// export default Dashboard;
import React from "react";
import AdherenceChart from "./AdherenceChart";
import ClientList from "./ClientList";
import GeographicalDistribution from "./GeographicalDistribution";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Heartland Alliance Retention Office Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded p-4">
          <AdherenceChart />
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <GeographicalDistribution />
        </div>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        <ClientList />
      </div>
    </div>
  );
};

export default Dashboard;
