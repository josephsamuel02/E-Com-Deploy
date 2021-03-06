import "./Analytics.css";

import { useMemo, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const IncomChart = () => {
    // const [userMonth, setUserMonth] = useState();
    // const [newUserCount, setNewUserCount] = useState();

    const [data, setData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
            {
                label: " Income ",
                data: [57, 76, 95, 34, 67, 63, 98, 46],
                backgroundColor: [
                    "yellow",
                    "rgb(72, 69, 236)",
                    "orange",
                    "rgb(42, 235, 83)",
                    "rgb(226, 48, 226)",
                    "dodgerblue",
                    "tomato",

                    "rgb(221, 234, 241)",
                ],
                // borderColor: ["rgb(0, 0, 0)"],
                borderWidth: 1,
                borderRadius: 2,
                hoverBorderColor: "Black",
            },
        ],
    });

    return (
        <div className="incomechart">
            <h1>income</h1>
            <Line
                data={data}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                }}
                title="Average Income Chart For The Year"
            />
        </div>
    );
};

export default IncomChart;
