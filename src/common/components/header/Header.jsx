import React from "react";

import { useNavigate } from "react-router-dom";
import Button from "../button/Button.tsx";
import Icon from "../icon/icon.tsx";

function Header() {
    const navigate = useNavigate();
    return (
        <div className="py-6 flex items-center bg-green-700 w-full justify-around">
            <div className="flex flex-row  font-bold text-green-200 text-2xl">
                <h1>ASYNC RACE</h1>
            </div>
            <div className="flex gap-4">
                <Button onClick={() => navigate("/")}>
                    <div className="flex flex-row space-x-4 items-center">
                        <div>
                            <Icon name="garage" />
                        </div>
                        <div>
                            <span>Garage</span>
                        </div>
                    </div>
                </Button>
                <Button onClick={() => navigate("/winners")}>
                    <div className="flex flex-row space-x-4 items-center">
                        <div>
                            <Icon name="winner" />
                        </div>
                        <div>
                            <span>Winner</span>
                        </div>
                    </div>
                </Button>
            </div>
        </div>
    );
}

export default Header;