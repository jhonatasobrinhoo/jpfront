import {Tabs} from "antd";
import React from "react";
import TrainingTab from "./TrainingTab";
import {TrainingContextProvider} from "../../contexts/training/TrainingContext";

const DashboardContent = () => <Tabs
    defaultActiveKey="1"
    centered
    items={
        [
            {
                label: `Treino`,
                key: 'training',
                children: <TrainingContextProvider><TrainingTab /></TrainingContextProvider>,
            },
            {
                label: `Alimentação`,
                key: 'alimentacao',
                children: `Content of Tab Pane 'alimentacao'`,
            },
        ]
    }
/>

export default DashboardContent;