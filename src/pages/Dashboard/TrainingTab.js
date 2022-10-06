import {Button, Card, Col, Row, Statistic} from "antd";
import {useContext} from "react";
import DashboardCalendar from "./DashboardCalendar";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import {TrainingContext, TrainingContextProvider} from "../../contexts/training/TrainingContext";
import {DateTime} from "luxon";

const DoneButton = () => {
    const context = useContext(TrainingContext);

    const {dates, addDate, removeDate} = context;

    const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
    const done = dates.includes(currentDate);

    const onDoneClick = () => {
        done ? removeDate(currentDate) : addDate(currentDate)
    }

    return <Button block
                   type={done ? 'primary' : 'dashed'}
                   onClick={() => onDoneClick()}
                   size={"large"}
                   style={{height: '80px'}}
    >Feito!</Button>
}

const TrainingTab = () => {

    const gridStyle = {
        width: '50%',
        textAlign: 'center',
    };

    return <TrainingContextProvider>
        <Row>
            <Col span={8}>
                <Row justify={"center"} style={{padding: '0px 20px 0px 0px'}}>
                    <DoneButton />
                </Row>
                <Row justify={"center"} style={{padding: '0px 20px 0px 0px'}}>
                    <Col span={24} style={{padding: '10px 0px', boxShadow: '2px'}}>
                        <Card className="activity-card">
                            <Card.Grid style={gridStyle}>
                                <Statistic
                                    title={<p>Comparado à <b>semana</b> passada</p>}
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{color: '#3f8600'}}
                                    prefix={<ArrowUpOutlined/>}
                                    suffix="%"
                                />
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Statistic
                                    title={<p>Comparado ao <b>mês</b> passado</p>}
                                    value={-2.1}
                                    precision={2}
                                    valueStyle={{color: '#ff0000'}}
                                    prefix={<ArrowDownOutlined/>}
                                    suffix="%"
                                />
                            </Card.Grid>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={16}>
                <DashboardCalendar />
            </Col>
        </Row>
    </TrainingContextProvider>
}

export default TrainingTab;