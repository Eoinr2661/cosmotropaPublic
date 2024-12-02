import React, { useState, useEffect, FC } from "react";
import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { RocketData } from "../../interfaces/RocketDataInterface";
import { sovietColours, sovietFragmentStyles, sovietTextStyles } from "../../assets/sovietStyles";

interface AltitudeGraphProps {
  rocketData: RocketData;
}
// This graph is how I manage the flight data, I am in two minds about making it so that the y-Axis always stays at 0, instead of updating to the lowest value in the last 15 data points... 
// I like it how it is, but a future update with user feedback might have me change my mind..
const AltitudeGraph: FC<AltitudeGraphProps> = ({ rocketData }) => {
  const [dataPoints, setDataPoints] = useState({
    timeXAxis: Array(15).fill(0),
    heightYAxis: Array(15).fill(0),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prevData => {
        let newHeight: number;
        if (!rocketData.altitude) {
          newHeight = 0; // set to 0 if no data
        } else {
          newHeight = rocketData.altitude;
        }
        const newTime = prevData.timeXAxis[prevData.timeXAxis.length - 1] + 1;

        // Appending new data points and remove the oldest one to keep length at 15
        const newTimeXAxis = [...prevData.timeXAxis.slice(1), newTime];
        const newHeightYAxis = [...prevData.heightYAxis.slice(1), newHeight];

        return {
          timeXAxis: newTimeXAxis,
          heightYAxis: newHeightYAxis,
        };
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // clear on unmount, keep this here to avoid memory leaks!!
  }, []);

  return (
    <View style={{
      backgroundColor: sovietColours.sovietLightGreyTranslucent, borderRadius: 10
    }}>
      <View>
        <View style={sovietFragmentStyles.blackMarginBottom}>
          <Text style={{
            fontFamily: 'kremlin',
            fontSize: 25,
            color: sovietColours.sovietBlack,
            textAlign: 'center' as 'center',
            marginVertical: 2,
          }}>
            ALTITUDE:</Text>
        </View>
      </View>
      <LineChart
        data={{
          labels: dataPoints.timeXAxis.map(time => time.toString().slice(-2)),
          datasets: [
            {
              data: dataPoints.heightYAxis,
            },
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={185}
        yAxisLabel=""
        yAxisSuffix="m"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: sovietColours.sovietLightGreyTranslucent,
          backgroundGradientFromOpacity: 0.0,
          backgroundGradientTo: sovietColours.sovietLightGreyTranslucent,
          backgroundGradientToOpacity: 0.0,
          decimalPlaces: 2,
          color: (opacity = 1) => sovietColours.sovietBlack, // line colour
          labelColor: (opacity = 1) => sovietColours.sovietBlack, // label colour
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: sovietColours.sovietMustard,
          },
        }}
        bezier
      ></LineChart>
    </View>
  );
};

export default AltitudeGraph;
