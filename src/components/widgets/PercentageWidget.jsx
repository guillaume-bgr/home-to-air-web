import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto"

function PercentageWidget (props) {

    const Data = [
        {
        name: "Humidité",
        percentage: props.percentage
        },
        {
        name: "Non humidité",
        percentage: 100 - props.percentage,
        },
    ];

    const chartData = {
        labels: Data.map((data) => data.name), 
        datasets: [
            {
                label: "",
                data: Data.map((data) => data.percentage),
                backgroundColor: [props.color, "transparent"],
                borderColor: "black",
                borderWidth: 0,
                borderRadius: 15
            }
        ]
    } ;

    return (
        <div className="doughnut-container">
            <Doughnut data={chartData} options={{
                cutout: 70,
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        display: false
                    }
                }
            }} />
            <div className="fakeCircle"></div>
            <div className="percentage">
                <span className="mb-0" style={{color: props.color}}>{props.percentage} %</span>
            </div>
        </div>
    )
}

export default PercentageWidget;