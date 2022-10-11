import {Tabs} from "antd";
import React from "react";
import HabitsTab from "./HabitsTab";
import {WorkoutContext, WorkoutContextProvider} from "../../contexts/workout/WorkoutContext";
import {FoodContext, FoodContextProvider} from "../../contexts/food/FoodContext";
import {addWorkout, removeWorkout} from "../../apis/workoutService";
import {addFood, removeFood} from "../../apis/foodService";

const DashboardContent = () => <Tabs
    defaultActiveKey="1"
    centered
    items={
        [
            {
                label: `Treino`,
                key: 'workout',
                children: <WorkoutContextProvider>
                    <HabitsTab context={WorkoutContext} addData={addWorkout} removeData={removeWorkout}/>
                </WorkoutContextProvider>,
            },
            {
                label: `Alimentação`,
                key: 'food',
                children: <FoodContextProvider>
                        <HabitsTab context={FoodContext} addData={addFood} removeData={removeFood}/>
                </FoodContextProvider>,
            },
        ]
    }
/>

export default DashboardContent;