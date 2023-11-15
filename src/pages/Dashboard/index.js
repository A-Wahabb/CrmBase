import React from 'react';
import { Card, CardBody, Container, Row } from 'reactstrap';

import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";
import { t } from 'i18next';

const Dashboard = () => {
    document.title = "Dashboard | softbrix - Admin & Dashboard";


    // register lottie and define custom element
    defineElement(loadAnimation);
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Card className=''>
                        <CardBody>
                            <div className="gap-2 m-0 d-flex flex-wrap justify-content-between">
                                <div className='d-flex gap-2 justify-content-start flex-wrap align-content-center'>

                                    <h4 className="mb-0 fs-15 text-uppercase fw-bold lh-unset mt-1">{t('dashboard')}</h4>

                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Row className='gx-3'>
                        <div className=''>
                            This is Dashboard
                        </div>
                    </Row>
                </Container>
            </div>

        </React.Fragment>
    );
};

export default Dashboard