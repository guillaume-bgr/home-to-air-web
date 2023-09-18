import { Doughnut } from "react-chartjs-2";

function Aqi(props) {

    const getAqiColor = (AQI) => {
        let colorClass = '';
        if (AQI <= 50) {
            colorClass = '#2ecc3b'
        } else if (AQI <= 100) {
            colorClass = '#ebdb4b'
        } else if (AQI <= 150) {
            colorClass = '#ff7e00'
        } else if (AQI <= 200) {
            colorClass = '#c22020'
        } else if (AQI <= 300) {
            colorClass = '#8f3f97'
        } else {
            colorClass = '#7e0023'
        }
        return colorClass;
    }

    const Data = [
        {
        name: "AQI",
        aqi: props.AQI
        },
        {
        name: "Non AQI",
        aqi: props.AQI < 300 ? 300 - props.AQI : 0,
        },
    ];

    const chartData = {
        labels: Data.map((data) => data.name), 
        datasets: [
            {
                label: "",
                data: Data.map((data) => data.aqi),
                backgroundColor: [getAqiColor(props.AQI), "transparent"],
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
        <div className="percentage  ">
            <span className="mb-0 text-center d-flex flex-column"><span className="text-sm text-muted lh-sm">AQI</span><span className="lh-sm" style={{ color: getAqiColor(props.AQI) }}>{props.AQI}</span></span>
        </div>
    </div>
    );
}

export default Aqi;