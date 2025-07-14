import Dashboard from "../Dashboard";
import { withAuth } from "../../hoc/withAuth";



const ProtectedDashboard = withAuth(Dashboard);

export default ProtectedDashboard