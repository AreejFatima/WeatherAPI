import { Line } from "react-chartjs-2";

function WeatherChart(props) {
  return (
    <div
      className="hourly_graph"
      style={{ position: "relative", width: 600, height: 300 }}
    >
      <Line
        options={{
          responsive: true,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
        data={props.current_data}
      />
    </div>
  );
}

export default WeatherChart;
