# Sensor Dashboard 📈

This dashboard provides real-time data for a list of sensors.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/omerom88/sensor-dashboard.git
   cd sensor-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Development

Start the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard. Make sure to run the server on a different port (3001).

![Sensor Dashboard](./images/sensor-dashboard-mockup.png)

## How to use
- Press the `Start` button to begin the stream
- Press the `Stop` button to end the stream
- Press the `Reset` button to reset the stream

Select one or more sensors from the list to view their real-time data on the graph.

You can control the graph resolution by adjusting the lookup period.

View the aggregated data in the table on the right side of the graph.

## Description

The dashboard is split into three parts:
- The left part displays the list of sensors for selection.
- The center part contains the control panel with buttons, real-time data points in the graph, the lookup period input and some general stats.
- The right part features a table containing aggregated data for all sensors.

This layout allows users to easily interact with sensors, view aggregated statistics, and see real-time data on the screen. The graph is updated every 0.1 seconds with new data points.

## Technologies
- React & Next 14
- TypeScript
- Tailwind CSS
- Shadecn UI
- Socket.IO
- Chart.js
- Jest
- Zustand state management

## Findings
- While aggregating the data, it was observed that the average data points for each sensor tend towards zero, as well as the total average of all values.
- Analysis showed whether sensors have more positive or negative values by examining the sum of any data point.
- Modifying the lookup period revealed changes in the graph and provided insights into the sensor's data through spikes in the graph.

## Limitations
- To prevent memory overflow, the data points in the graph are limited to MAX_DATA_POINTS=200. To increase this number, consideration should be given to storing old data elsewhere.
- This implementation supports up to 20 sensors. Expanding it to more sensors would require a different approach to rendering the sensor list and data points in the graph by selecting a subset of sensors at a time.
- Currently, a single message queue is used to store messages from the server. This could create a bottleneck with a large volume of messages. Alternatives such as implementing a circular buffer or using a different data structure should be explored. Storing data on the server and fetching only the data needed for real-time viewing could be a better solution.

## Improvements
- Due to time constraints, mobile support and responsiveness have not been implemented yet.
- The graph can be enhanced with features like zoom in, zoom out, and more.
- The statistics table can be improved with additional aggregated data points such as the median, variance, standard deviation, etc.
- For scalability, aggregations and other calculations can be moved to the server, and the data can be fetched using an API call.
- After pausing and restarting the live stream, the data accumulation rate may appear very high. This is due to the comparison of the incoming data with the last data point on the graph, resulting in a large difference after a long pause. This issue is resolved after the second message is received.
- Consider implementing server-side rendering (SSR) for the initial page load to improve performance.