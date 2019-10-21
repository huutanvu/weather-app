import styled from "styled-components";


const DashboardWrapper = styled.div`
    .mainLayout {
        height: 100vh;
        margin: 0 auto;
        font-family: 'Nunito', sans-serif;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .mainHeader {
        z-index: 1;
        width: 100%;
        position: fixed;
        background: #141a46;
    }

    .logo img{
        width: 95px;
        margin: 16px 24px 16px 0;
        float: left;
    }

    .mainMenu {
        line-height: 64px;
        background: #141a46;
    }

    .ant-menu-item {
        color: rgba(255, 255, 255, 1);
        font-weight: 700;

    }

    .mainContent {
        margin: 0 auto;
        margin-top: 64px;
        background: #f0f2f5;
        max-width: 1200px;
        min-width: 950px;
    }

    .contentWrapper {
        margin-top: 30px;
    }

    .content {        
        background: #fff;
        padding: 24px;
        margin: 0;
        min-height: 280px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
`;

export default DashboardWrapper;