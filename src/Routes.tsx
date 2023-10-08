import { Route, Routes as ReactRoutes } from "react-router-dom"
import { WildCard } from "./pages/WildCard"
import { Pay } from "./pages/Pay"
import { Home } from "./pages/Home"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({ }) => {
    return (

        <ReactRoutes>
            <Route index element={<Home />} />
            <Route path="/pay/:orderId" element={<Pay />} />
            <Route path="*" element={<WildCard />} />
            {/* <Route path="signup" element={<Signup />} /> */}
        </ReactRoutes>
    )
}
