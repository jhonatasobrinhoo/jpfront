import {Button, Card, Col, Row, Statistic} from "antd";
import {useContext} from "react";
import DashboardCalendar from "./DashboardCalendar";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import {TrainingContext} from "../../contexts/training/TrainingContext";
import {DateTime} from "luxon";

const DoneButton = () => {
    const context = useContext(TrainingContext);

    const {dates, addDate, removeDate} = context;

    const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
    const done = dates.map(d => d.date).includes(currentDate);

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

    const { statistics: statisticsState } = useContext(TrainingContext);

    const gridStyle = {
        width: '50%',
        textAlign: 'center',
    };

    const getDirection = value => {
        if (value > 0) return 'up';
        if (value < 0) return 'down';
        return 'same';
    }

    const getColor = value => {
        switch (getDirection(value)) {
            case 'up': return '#3f8600'
            case 'down': return '#da0000'
            default: return '#a8a8a8'
        }
    }

    const getComponent = value => {
        switch (getDirection(value)) {
            case 'up': return <ArrowUpOutlined />;
            case 'down': return <ArrowDownOutlined />;
            default: return <ArrowUpOutlined />;
        }
    }

    const statistics = {
        lastWeek: {
            value: statisticsState.lastWeek,
            color: getColor(statisticsState.lastWeek),
            component: getComponent(statisticsState.lastWeek)
        },
        lastMonth: {
            value: statisticsState.lastMonth,
            color: getColor(statisticsState.lastMonth),
            component: getComponent(statisticsState.lastMonth)

        }
    }

    return <Row>
        <Col span={8}>
            <Row justify={"center"} style={{padding: '0px 20px 0px 0px'}}>
                <DoneButton/>
            </Row>
            <Row justify={"center"} style={{padding: '0px 20px 0px 0px'}}>
                <Col span={24} style={{padding: '10px 0px', boxShadow: '2px'}}>
                    <Card className="activity-card">
                        <Card.Grid style={gridStyle}>
                            <Statistic
                                title={<p>Comparado à <b>semana</b> passada</p>}
                                value={statistics.lastWeek.value}
                                precision={2}
                                valueStyle={{color: statistics.lastWeek.color}}
                                prefix={statistics.lastWeek.component}
                                suffix="%"
                            />
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Statistic
                                title={<p>Comparado ao <b>mês</b> passado</p>}
                                value={statistics.lastMonth.value}
                                precision={2}
                                valueStyle={{color: statistics.lastMonth.color}}
                                prefix={statistics.lastMonth.component}
                                suffix="%"
                            />
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </Col>
        <Col span={16}>
            <DashboardCalendar/>
        </Col>
    </Row>
}

export default TrainingTab;