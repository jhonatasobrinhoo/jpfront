import {Tabs} from "antd";
import React from "react";
import WorkoutTab from "./WorkoutTab";
import {WorkoutContextProvider} from "../../contexts/workout/WorkoutContext";

const DashboardContent = () => <Tabs
    defaultActiveKey="1"
    centered
    items={
        [
            {
                label: `Treino`,
                key: 'workout',
                children: <WorkoutContextProvider>
                    <WorkoutTab/>
                </WorkoutContextProvider>,
            },
            {
                label: `Alimentação`,
                key: 'food',
                children: `Content of Tab Pane 'alimentacao'`,
            },
        ]
    }
/>

export default DashboardContent;