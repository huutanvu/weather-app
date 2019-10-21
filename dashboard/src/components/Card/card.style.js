import styled from "styled-components";


const CardWrapper = styled.div`

    .dashboardCard {
        border-radius: 8px;
        border: none;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        height: 300px;
    }

    .dashboardCard .ant-card-body {
        margin: 0;
        position: relative;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        height: 100%;
    }

    .ant-card-meta-title {
        font-size: 18px;
        font-weight: 700;
    }

    .weatherIcon {
        max-width: 100%;
    }

    .weatherInfo {
        padding-top: 10px;
        margin: 0;
        position: relative;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .temperature {
        color: #141a46;
        font-size: 38px;
        font-weight: 700;
        line-height: 42px;
    }

    .condition {
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
    }

    .miniCardContainer {
    }

    .miniCard {
        border-radius: 8px;
        border: none;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        text-align: center;
    }    

    .miniWeatherIcon {
        max-width: 100%;
    }

    .miniTemperature {
        color: #141a46;
        font-size: 30px;
        font-weight: 700;
        line-height: 34px;
    }

    .miniCondition {
        font-size: 14px;
        font-weight: 700;
        line-height: 18px;
    }
`;

export default CardWrapper;