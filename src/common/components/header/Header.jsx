import { useNavigate } from "react-router-dom";
import Button from "../button/button.tsx";

function Header() {
    const navigate = useNavigate();

    return (
        <div className="py-6 flex items-center bg-green-700 w-full justify-around">
            <div className="flex flex-row font-bold text-green-200 text-2xl">
                <h1>ASYNC RACE</h1>
            </div>
            <div className="flex gap-4">
                <Button onClick={() => navigate("/")} icon="garage">
                    Garage
                </Button>
                <Button onClick={() => navigate("/winners")} icon="winner">
                    Winner
                </Button>
            </div>
        </div>
    );
}

export default Header;
