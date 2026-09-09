import * as React from 'react';
import { useContext } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';

import { ChartDataContext } from '../../Pages/UserProfile';


// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

export default function SimpleLineChart() {

    const { QuizData } = useContext(ChartDataContext);
    console.log(QuizData);
    const xLabels = QuizData.map(data => data.quiz);
    const easyData = QuizData.map(data => {
        if (data.difficulty === 'Easy') {
            return data.score;
        } else {
            return null; // or any default value if no score is found
        }
    });
    const hardData = QuizData.map(data => {
        if (data.difficulty === 'Hard') {
            return data.score;
        } else {
            return null; // or any default value if no score is found
        }
    });
    const hardestData = QuizData.map(data => {
        if (data.difficulty === 'Hardest') {
            return data.score;
        } else {
            return null; // or any default value if no score is found
        }
    });

    return (
        <LineChart
            width={600}
            height={400}
            slotProps={{
                legend: { hidden: true }
            }}
            series={[
                // { data: pData, label: 'pv' },
                { data: easyData, label: 'Easy', connectNulls: 'true', },
                { data: hardData, label: 'Hard', connectNulls: 'true', },
                { data: hardestData, label: 'Hardest', connectNulls: 'true', },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
    );
}