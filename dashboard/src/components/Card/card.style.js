import styled from "styled-components";


const CardWrapper = styled.div`

    .dashboardCard {
        border-radius: 8px;
        border: none;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        height: 200px;
    }

    .weatherIcon {
        max-width: 100%;
    }

    .weatherInfo {
        padding-top: 10px;
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
`;

export default CardWrapper;